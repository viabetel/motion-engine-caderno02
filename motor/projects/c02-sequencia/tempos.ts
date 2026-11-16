// Caderno 02 em sequência · tempos (fonte única de imagem e som). Duas réguas, método do Kivow V9.2.
// ROTEIRO: a coreografia escrita antes da voz (docs/sequencia/TRANSITION_GRAPH.md e VOICE_SCENE_MAP.md).
// FILME: depois da voz medida pelo Scribe (voz_palavras.json). Até lá, todo gatilho é ESTIMADO e o medidor
// reprova o render final enquanto houver um só gatilho estimado. Nenhum timestamp de voz é inventado aqui.
import type { VoiceCue } from "../../schemas/story.schema";

export const FPS = 30;
export const W = 1080;
export const H = 1350;
export const q = (s: number) => Math.round(s * FPS);

/** cenas e arestas na régua do roteiro (s) */
export const ROTEIRO = {
  P1: [0, 6.9], B1: [6.9, 8.9], P2: [8.9, 12.6], B2: [12.6, 14.4], P3: [14.4, 17.8], B3: [17.8, 18.6],
  P3b: [18.6, 22.4], B4: [22.4, 24.2], P4: [24.2, 28.6], B5: [28.6, 30.2], P4b: [30.2, 34.0], B6: [34.0, 36.2],
  P5: [36.2, 41.0], B7: [41.0, 42.0], P5b: [42.0, 48.2], B8: [48.2, 50.2], P6: [50.2, 55.0],
} as const;
export const DURACAO_ROTEIRO_S = 55.0;

/** gatilhos por palavra (estimados a 2,4 palavras/s; serão trocados pelos medidos) */
const est = (palavra: string, s: number): VoiceCue => ({ palavra, inicioMs: s * 1000, fimMs: s * 1000 + 300, estimado: true });
export const P: Record<string, VoiceCue> = {
  deserto: est("deserto", 2.6), tres: est("três", 3.9), resposta: est("resposta", 6.1),
  quarenta: est("Quarenta", 9.3), fome: est("fome", 12.0),
  primeira: est("primeira", 15.0), pedras: est("pedras", 16.3), pao: est("pão", 17.1),
  esta1: est("Está", 18.8), homem: est("homem", 21.7),
  dali: est("dali", 28.0), esta2: est("está", 30.9), deus: est("Deus", 33.3),
  reinos: est("reinos", 38.0), adoracao: est("adoração", 40.3),
  vaite: est("Vai-te", 42.1), satanas: est("Satanás", 43.2), ao: est("Ao", 44.0), servira: est("servirás", 47.6),
  deixou: est("deixou", 52.4),
};
export const temGatilhoEstimado = () => Object.values(P).some((p) => p.estimado);

/** respiros em compasso inteiro (preenchidos depois da medição da trilha e da voz): [início na régua do roteiro, duração] */
export const RESPIROS: [number, number][] = [];
/** roteiro → filme (desloca o que vem depois de cada respiro) */
export const noFilme = (s: number) => RESPIROS.reduce((t, [ini, dur]) => (s >= ini ? t + dur : t), s);
