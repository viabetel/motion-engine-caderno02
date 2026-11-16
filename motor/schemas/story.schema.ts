// Contratos do modo editorial-story (docs/sequencia). Separado do trio: nada aqui passa por PosterSlot nem slot-state.
// Tudo em ms absolutos na régua do FILME; a régua do ROTEIRO existe só para escrever a coreografia antes da voz.
import type { Camada, MotionEvent } from "./project.schema";

/** planos do mundo, em ordem fixa de desenho */
export type WorldLayer = "background" | "midground" | "subject" | "foreground" | "paper" | "type" | "fx";
export const ORDEM_DOS_PLANOS: WorldLayer[] = ["background", "midground", "subject", "foreground", "paper", "type", "fx"];
/** fator de parallax por plano (escala relativa ao movimento da câmera) */
export const PARALLAX: Record<WorldLayer, number> = { background: 0.45, midground: 0.8, subject: 1, foreground: 2.2, paper: 1, type: 0, fx: 0 };

export type MaterialId = "pedra" | "papel" | "fita" | "tecido" | "poeira" | "tipografia-oferta" | "tipografia-resposta" | "luz";
export type MaterialProfile = {
  id: MaterialId;
  massa: "muito-baixa" | "baixa" | "media" | "media-alta" | "alta";
  curva: { tipo: "mola"; w0: number; zeta: number } | { tipo: "chegada"; m: number; D: number } | { tipo: "gravidade"; g: number; arrasto: number; flexaoMaxGraus: number };
  overshootMax: number; // fração
  sombra?: { tipo: "contato" | "difusa"; desfoqueMax: number };
};

/** uma camada do mundo: vem do Figma (camadas) e ganha plano, identidade compartilhada e material */
export type WorldItem = Camada & {
  plano: WorldLayer;
  compartilhado?: string; // id no SharedElementRegistry (mãos, pedra, torre, fita, paisagem, rasgo)
  material?: MaterialId;
  origem?: [number, number]; // ponto de transformação, px no quadro da cena
};

export type SceneId = "P1" | "P2" | "P3" | "P3b" | "P4" | "P4b" | "P5" | "P5b" | "P6" | string;
export type SceneNode = {
  id: SceneId;
  figmaNode: string; // pose de destino aprovada
  itens: WorldItem[];
  /** repouso da cena na régua do filme */
  inicioMs: number;
  fimMs: number;
  eventos: MotionEvent[]; // relativos ao início da cena
};

/** chave de câmera em coordenadas de mundo da cena de origem */
export type CameraKey = { tMs: number; escala: number; ancora: [number, number]; ancoraNaTela: [number, number]; inclinacao?: number; foco?: string };

export type BridgeEdge = {
  id: string; // B1..B8
  de: SceneId;
  para: SceneId;
  inicioMs: number;
  fimMs: number;
  tipo: "mesmo-asset" | "composicional" | "mesma-imagem" | "corte-escondido";
  ancora: { compartilhado?: string; noDe: [number, number]; noPara: [number, number] };
  camera: CameraKey[]; // no mínimo início, meio e fim
  curva: "S" | "pulso" | "chegada" | "gravidade";
  oclusores: string[]; // itens que escondem a troca
  corteMs?: number; // quando há troca escondida de imagem: documentado e inspecionado em q−12…q+12
  recursos: string[]; // MatchedDive, AnchorMatch, ... (AUDIOVISUAL_DIRECTION §2)
  figmaPoses: string[]; // ≥ 4 nós aprovados
};

export type SharedElement = { id: string; descricao: string; aparece: SceneId[]; material: MaterialId };

export type VoiceCue = { palavra: string; inicioMs: number; fimMs: number; estimado: boolean };
export type AudioCue = { camada: "voz" | "trilha" | "ambiente" | "materia" | "movimento" | "impacto"; id: string; atMs: number; durMs: number; db: number; jcutMs?: number };

export type SequenceStoryProject = {
  id: string;
  theme: string;
  visualSkin: string;
  layoutMode: "editorial-story";
  canvas: { width: number; height: number; fps: number; durationFrames: number };
  cenas: SceneNode[];
  arestas: BridgeEdge[];
  compartilhados: SharedElement[];
  materiais: MaterialProfile[];
  voz: { arquivo?: string; palavras: VoiceCue[] };
  audio: AudioCue[];
  safeZones: { top: number; bottom: number; left: number; right: number };
};
