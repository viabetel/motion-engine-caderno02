// Prova 1 do motor · Trio Showcase · Cadernos do Caminho, Caderno 02: "Três ofertas. A mesma resposta." (Mateus 4, ARC)
// Só dados. Cue sheet: docs/06-FIGMA-STORYBOARD.md §5. Cortes nos quadros medidos na referência (00 §3), grade da faixa medida (05).
import camadas from "./cadernos-c02-trio.camadas.json";
import type { ArquivoCamadas, MotionEvent, Poster, SlotTrack, VideoProject } from "../schemas/project.schema";
import { q30 } from "../motion/schedule";

type P = Record<string, number | string | number[]>;
/** evento do pôster em quadros da régua da referência (30 q/s), relativo à entrada do pôster */
const e = (target: string, action: MotionEvent["action"], preset: string, atQ: number, durQ: number, params?: P, priority?: 1 | 2 | 3): MotionEvent =>
  ({ id: `${target.slice(0, 18)}@${atQ}`, atMs: q30(atQ), durationMs: q30(durQ), target, action, preset, params, priority });
const troca = (atQ: number, preset: string, params: P): MotionEvent =>
  ({ id: `troca@${atQ}`, atMs: q30(atQ), durationMs: 0, target: "cartao", action: "poster-swap", preset, params });
const pq = (q: number) => q30(q); // ms de um intervalo em quadros

const INIMIGO = { pasta: "cadernos-c02/inimigo", quadros: 79, fps: 24 };

const posters: Poster[] = [
  {
    id: "A0", concept: "deserto", title: "DESERTO", kicker: "Conduzido pelo Espírito ao deserto,", motifs: ["céu", "deserto", "Jesus sentado", "inimigo rondando"],
    assets: [], paletteKey: "crepusculo", layoutPreset: "cena-com-titulo-no-ceu", readingPriority: "essential", camadas: "A0", deriva: -6.15,
    events: [
      e("Céu do Kuindzhi", "object-drift", "deriva-x", 0, 0, { vx: -10 }),
      e("Terra de En-Gedi", "object-drift", "deriva-x", 0, 0, { vx: -4 }),
      e("Cristas do deserto", "object-drift", "deriva-x", 0, 0, { vx: -7 }),
      e("Pedras da frente", "object-drift", "deriva-x", 0, 0, { vx: -12 }),
      e("O inimigo", "illustration-build", "sequencia", 0, 0, INIMIGO),
      e("O inimigo", "object-drift", "orbita", 0, 0, { periodoMs: 8000, rx: 70, alt: 22 }),
      e("Jesus · Kramskoi", "object-enter", "chegada", 0, 18, { dy: 140, ocultoAntes: 0 }),
      e("Jesus · Kramskoi", "object-drift", "respira", 0, 0, { graus: 0.6, periodoMs: 2400, duasPoses: 1 }),
      e("Título", "type-reveal", "contorno", 0, 12, { duracaoMs: pq(12) }, 1),
      e("Chapéu", "object-enter", "aparece", 2, 4),
      e("Kicker", "type-reveal", "palavras", 8, 0),
      e("Fita · PARA SER TENTADO", "accent-trace", "etiqueta", 18, 14, {}, 1),
    ],
  },
  {
    id: "B0", concept: "quarenta dias", title: "40", kicker: "dias e quarenta noites.", motifs: ["faixa escura", "mãos"],
    assets: [], paletteKey: "papel", layoutPreset: "faixa-do-topo", readingPriority: "essential", camadas: "B0", deriva: 3.0,
    events: [
      e("Faixa de carvão", "object-enter", "desce", 0, 12, { dy: -480, ocultoAntes: 0 }),
      e("Kramskoi · as mãos", "object-enter", "desce", 0, 15, { dy: -480, ocultoAntes: 0 }),
      e("Kramskoi · as mãos", "object-drift", "respira", 0, 0, { graus: 1.2, periodoMs: 2000, duasPoses: 1 }),
      e("Chapéu", "object-enter", "aparece", 6, 4),
      e("Contador · 40", "type-reveal", "contador", 36, 12, { de: 1, ate: 40, poses: 12 }, 1),
      e("Kicker", "type-reveal", "palavras", 54, 0),
    ],
  },
  {
    id: "C0", concept: "fome", title: "FOME.", kicker: "Depois, teve", motifs: ["feixe", "círculo", "figura pequena"],
    assets: [], paletteKey: "papel", layoutPreset: "feixe-do-circulo", readingPriority: "essential", camadas: "C0", deriva: -0.4,
    events: [
      e("Feixe vermelho", "object-enter", "gira", 0, 12, { rot: 34, px: 105, py: 655 }),
      e("Silhueta", "object-enter", "aparece", 6, 6),
      e("Silhueta", "object-drift", "respira", 0, 0, { graus: 0.8, periodoMs: 2200, duasPoses: 1 }),
      e("Chapéu", "object-enter", "aparece", 3, 4),
      e("Kicker", "type-reveal", "palavras", 3, 0),
      e("Título", "type-reveal", "letras", 57, 0, {}, 1),
    ],
  },
  {
    id: "A1", concept: "a primeira oferta", title: "PEDRAS SE TORNEM EM PÃES.", kicker: "Manda que estas", motifs: ["tentador", "pedras", "círculo à mão"],
    assets: [], paletteKey: "carvao", layoutPreset: "objeto-pesado-no-pe", readingPriority: "essential", camadas: "A1", deriva: 0,
    events: [
      e("Tissot · o tentador", "object-enter", "queda", 0, 0, { dy: 171, w0: 0.695, zeta: 0.81, ocultoAntes: 0 }),
      e("Círculo à mão", "accent-trace", "revela", 58, 11, { dir: "esq" }),
      e("Chapéu", "object-enter", "aparece", 3, 4),
      e("Kicker", "type-reveal", "palavras", 6, 0),
      e("Título", "type-reveal", "linhas", 30, 0, { atrasosMs: [0, pq(44)] }, 1),
    ],
  },
  {
    id: "B1", concept: "a segunda oferta", title: "DAQUI ABAIXO.", kicker: "lança-te", motifs: ["pináculo", "faixa vertical"],
    assets: [], paletteKey: "papel", layoutPreset: "faixa-alta", readingPriority: "essential", camadas: "B1", deriva: 0.1,
    events: [
      e("Faixa · o pináculo", "object-enter", "desce", 0, 12, { dy: -520, ocultoAntes: 0 }),
      e("Chapéu", "object-enter", "aparece", 5, 4),
      e("Kicker", "type-reveal", "palavras", 23, 0),
      e("Título", "type-reveal", "letras", 41, 0, {}, 1),
    ],
  },
  {
    id: "C1", concept: "a terceira oferta", title: "TUDO ISTO", kicker: "te darei.", motifs: ["reinos", "cidades que se separam"],
    assets: [], paletteKey: "papel", layoutPreset: "objeto-que-se-parte", readingPriority: "essential", camadas: "C1", deriva: 0.3,
    events: [
      e("Reino · cidade à esquerda", "object-enter", "separa", 0, 24, { dx: 70, dy: 10, ocultoAntes: 0 }),
      e("Reino · cidade à direita", "object-enter", "separa", 0, 24, { dx: -70, dy: 6, ocultoAntes: 0 }),
      e("Reino · torres ao fundo", "object-enter", "separa", 0, 24, { dy: 50, ocultoAntes: 0 }),
      e("Chapéu", "object-enter", "aparece", 6, 4),
      e("Título", "type-reveal", "letras", 30, 0, {}, 1),
      e("Kicker", "type-reveal", "palavras", 66, 0),
    ],
  },
  {
    id: "A2", concept: "a resposta: pão", title: "ESTÁ ESCRITO", quote: "Nem só de pão viverá o homem.", motifs: ["rosto partido", "fita"],
    assets: [], paletteKey: "papel", layoutPreset: "busto-partido", readingPriority: "essential", camadas: "A2", deriva: -2.8,
    events: [
      e("Jesus · Kramskoi", "object-enter", "chegada", 0, 16, { dy: 30, ocultoAntes: 0 }),
      e("Fatia vermelha", "object-enter", "chegada", 0, 14, { dy: 56, ocultoAntes: 0 }),
      e("Fio de papel", "object-enter", "aparece", 3, 4, { dy: 0 }),
      e("Fita · ESTÁ ESCRITO", "accent-trace", "etiqueta", 0, 14, { ocultoAntes: 0 }, 1),
      e("Citação", "type-reveal", "palavras", 6, 0, {}, 2),
      e("Chapéu", "object-enter", "aparece", 20, 4),
    ],
  },
  {
    id: "B2", concept: "a resposta: não tentarás", title: "O SENHOR, TEU DEUS.", kicker: "Não tentarás", motifs: ["pedras deslizando", "fita"],
    assets: [], paletteKey: "papel", layoutPreset: "duas-formas-deslizam", readingPriority: "essential", camadas: "B2", deriva: 1.5,
    events: [
      e("Pedra rasgada · 1", "object-enter", "desliza", 0, 10, { dx: -170, m: 2.5, ocultoAntes: 0 }),
      e("Pedra rasgada · 2", "object-enter", "desliza", 1, 12, { dx: -210, m: 2.5, ocultoAntes: 0 }),
      e("Fita · ESTÁ ESCRITO", "accent-trace", "etiqueta", 5, 14, {}, 1),
      e("Kicker", "type-reveal", "palavras", 9, 0),
      e("Título", "type-reveal", "linhas", 12, 0, { atrasosMs: [0, pq(4)] }, 1),
      e("Chapéu", "object-enter", "aparece", 24, 4),
    ],
  },
  {
    id: "C2", concept: "a resposta: vai-te", title: "VAI-TE, SATANÁS.", quote: "porque está escrito.", motifs: ["inimigo indo embora", "fio", "pedra"],
    assets: [], paletteKey: "papel", layoutPreset: "figura-leve-presa-por-fio", readingPriority: "essential", camadas: "C2", deriva: -8.0,
    extras: [{ tipo: "linha", id: "fio-vivo", nome: "Fio vivo (da pedra ao inimigo)", de: { x: 70, y: 590 }, ate: { camada: "Inimigo", ax: 122, ay: 80 }, cor: "#C0301A", espessura: 3, substitui: "Fio vermelho" }],
    events: [
      e("Fio vivo", "accent-trace", "revela", 2, 8, {}),
      e("Inimigo", "illustration-build", "sequencia", 0, 0, { ...INIMIGO, inicio: 30 }),
      e("Inimigo", "object-enter", "afasta", 0, 24, { dx: -90, dy: 70, vx: 30, vy: -20, esc0: 1.25, encolhePorS: 0.05, ocultoAntes: 0 }),
      e("Pedra rasgada", "object-enter", "chegada", 0, 12, { dy: 40, ocultoAntes: 0 }),
      e("Barra vermelha", "accent-trace", "revela", 5, 9, { dir: "esq" }, 1),
      e("Chapéu", "object-enter", "aparece", 3, 4),
      e("Título na barra", "type-reveal", "palavras", 7, 0),
      e("Refrão", "type-reveal", "palavras", 17, 0, {}, 2),
    ],
  },
];

const tracks: SlotTrack[] = [
  { slot: "A", initialPosterId: "A0", events: [
    troca(72, "chicote", { to: "A1", dy: -54, rampa: 4, n: 2.4 }),
    troca(157, "curta", { to: "A2", n: 3.05, total: 1.093, rampa: 5, dy: -38 }),
  ] },
  { slot: "B", initialPosterId: "B0", events: [
    troca(87, "deriva", { to: "B1" }),
    troca(161, "panoramica", { to: "B2", inicioMs: q30(157), vPxS: 570 }),
  ] },
  { slot: "C", initialPosterId: "C0", events: [
    troca(86, "longa", { to: "C1", n: 1.59, total: 1.139, rampa: 7, dy: -29 }),
    troca(177, "recuo", { to: "C2", n: 1.6, total: 0.92, rampa: 6, dy: 38 }),
  ] },
];

export const cadernosC02Trio: VideoProject = {
  id: "CadernosC02Trio",
  theme: "Cadernos do Caminho · Caderno 02 · Três ofertas. A mesma resposta.",
  visualSkin: "cadernos",
  layoutMode: "trio-showcase",
  canvas: { width: 1080, height: 1920, fps: 30, durationFrames: 210 },
  camadas: camadas as unknown as ArquivoCamadas,
  posters,
  tracks,
  soundtrack: {
    // "Between Two Evils", Michael Ramir C. (Mixkit, licença livre de música). Grade medida: colcheia 334,17 ms (89,8 BPM).
    // Recorte a partir de 9,770 s: o grave entra em 3,73 s do filme e o bumbo cai no q157 (líder da rodada 2).
    music: { src: "cadernos-c02/audio/between_two_evils_1020.mp3", offsetMs: 9770, gainDb: 0, fadeOutMs: 250 },
    events: [
      { id: "s1", atMs: q30(72), durationMs: q30(10), target: "A", action: "poster-swap", preset: "papel-virada", sfxId: "papel-virada", params: { db: -24 } },
      { id: "s2", atMs: q30(130), durationMs: q30(11), target: "A1", action: "accent-trace", preset: "pena", sfxId: "pena", params: { db: -30 } },
      { id: "s3", atMs: q30(157), durationMs: q30(8), target: "A", action: "poster-swap", preset: "papel-baque", sfxId: "papel-baque", params: { db: -21 } },
      { id: "s4", atMs: q30(160), durationMs: q30(4), target: "A2", action: "accent-trace", preset: "fita-pousa", sfxId: "fita-pousa", params: { db: -27 } },
      { id: "s5", atMs: q30(182), durationMs: q30(9), target: "C2", action: "accent-trace", preset: "papel-rasgo", sfxId: "papel-rasgo", params: { db: -25 } },
    ],
  },
  safeZones: { top: 220, bottom: 420, left: 0, right: 140 },
  motionIntensity: "energetic",
};
