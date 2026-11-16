// Estrutura de dados do motor (PRD §6), estendida com as camadas que vêm do Figma.
// Tempos sempre em ms absolutos; o renderer converte para quadro uma única vez (motion/schedule.ts).

export type LayoutMode = "trio-showcase" | "editorial-story" | "hybrid-explainer";
export type SlotId = "A" | "B" | "C";
export type MotionToken = "quiet" | "editorial" | "energetic";

export type SceneAsset = {
  id: string;
  src: string;
  kind: "image" | "svg" | "video" | "sequence" | "audio";
  alt?: string;
  credit?: string; // vai para a legenda do post, nunca para a arte
  license?: string;
};

// ---------------------------------------------------------------- camadas (geradas por scripts/figma-para-projeto.mjs)
export type Faixa = { de: number; ate: number; cor: string | null };
export type CamadaTexto = {
  tipo: "texto"; id: string; nome: string; texto: string;
  x: number; y: number; w: number; h: number;
  fonte: string; estilo: "normal" | "italic"; peso: number; tamanho: number;
  entreLetras: number; altLinha: number; alinha: string; quebra: "ajusta" | "fixa";
  cor: string | null; faixas: Faixa[]; opacidade: number;
};
export type CamadaImagem = {
  tipo: "imagem"; id: string; nome: string; src: string;
  x: number; y: number; w: number; h: number; opacidade: number; mistura: string;
};
export type CamadaGrao = { tipo: "grao"; nome: string; opacidade: number; mistura: string };
/** Linha viva entre um ponto fixo e uma âncora de outra camada (acompanha a camada quando ela se move). */
export type CamadaLinha = {
  tipo: "linha"; id: string; nome: string;
  de: { x: number; y: number };
  ate: { camada: string; ax: number; ay: number };
  cor: string; espessura: number;
  /** entra no lugar (na ordem de camadas) da camada com este nome, que deixa de ser desenhada */
  substitui?: string;
};
export type Camada = CamadaTexto | CamadaImagem | CamadaGrao | CamadaLinha;

export type ArquivoCamadas = {
  origem: { fileKey: string; lidoEm: string };
  palco: {
    w: number; h: number; fundo: string | null; camadas: Camada[];
    cartoes: Record<string, { x: number; y: number; w: number; h: number; raio: number; sombra: string | null }>;
    ordem: string[];
  };
  posteres: Record<string, { componente: string; nome: string; w: number; h: number; fundo: string | null; camadas: Camada[] }>;
};

// ---------------------------------------------------------------- eventos
export type MotionAction =
  | "poster-swap" | "mask-reveal" | "type-reveal" | "object-enter" | "object-exit"
  | "illustration-build" | "scale-focus" | "color-field" | "accent-trace" | "object-drift" | "hide";

export type MotionEvent = {
  id: string;
  atMs: number; // no pôster: relativo à entrada do pôster; na trilha: absoluto
  durationMs: number;
  target: string; // nome da camada (ou o cartão, em poster-swap)
  action: MotionAction;
  preset: string; // ver motion/presets.ts
  easing?: string;
  sfxId?: string;
  priority?: 1 | 2 | 3; // 1 = golpe de texto essencial (um por vez no palco)
  params?: Record<string, number | string | number[]>;
};

export type Poster = {
  id: string;
  concept: string;
  title?: string;
  kicker?: string;
  body?: string;
  quote?: string;
  motifs: string[];
  assets: SceneAsset[];
  paletteKey: string;
  layoutPreset: string;
  textEmphasis?: string[];
  readingPriority: "essential" | "atmospheric";
  /** chave no arquivo de camadas */
  camadas: string;
  /** camadas extras criadas no projeto (ex.: linha viva) */
  extras?: Camada[];
  /** deriva da câmera do pôster em % de escala por segundo (negativo = recua) */
  deriva: number;
  events: MotionEvent[];
};

export type SlotTrack = {
  slot: SlotId;
  initialPosterId: string;
  events: MotionEvent[]; // só poster-swap, em ms absolutos; params.to = pôster que entra
};

export type VideoProject = {
  id: string;
  theme: string;
  visualSkin: string;
  layoutMode: LayoutMode;
  canvas: { width: number; height: number; fps: number; durationFrames: number };
  camadas: ArquivoCamadas;
  posters: Poster[];
  tracks: SlotTrack[];
  soundtrack: { music?: { src: string; offsetMs: number; gainDb: number; fadeOutMs: number }; voice?: string; events: MotionEvent[] };
  safeZones: { top: number; bottom: number; left: number; right: number };
  motionIntensity: MotionToken;
};
