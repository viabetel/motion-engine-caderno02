// Relógio: ms ↔ quadro, convertido uma única vez (nunca somar quadros em cadeia).
export const msToFrame = (ms: number, fps: number) => Math.round((ms * fps) / 1000);
export const frameToMs = (f: number, fps: number) => (f * 1000) / fps;
/** quadro a 30 q/s (a régua da referência) → ms. Usado só para escrever cue sheets na régua medida. */
export const q30 = (q: number) => (q * 1000) / 30;

/** Grade musical medida: batida n = entrada + n · período (s). Devolve o tempo do filme (ms) da subdivisão mais próxima. */
export const naGrade = (tMs: number, grade: { entradaMs: number; periodoMs: number; subdivisao: number }) => {
  const p = grade.periodoMs / grade.subdivisao;
  const n = Math.round((tMs - grade.entradaMs) / p);
  return grade.entradaMs + n * p;
};
