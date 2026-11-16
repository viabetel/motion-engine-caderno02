// Matemática pura do motor. Herdada do motor do Caderno 02 (engine.ts / sinais.ts), que veio do motor aprovado do Maidsys.
// Tudo é função do tempo absoluto: render fora de ordem e em pedaços é seguro.

export const clamp = (x: number, a = 0, b = 1) => Math.max(a, Math.min(b, x));
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** smootherstep (C2): começa e termina com velocidade zero. */
export const suave = (t: number) => {
  const x = clamp(t);
  return x * x * x * (x * (x * 6 - 15) + 10);
};

/**
 * Chegada medida na referência: nasce rápida (o objeto já vinha andando antes do corte) e assenta com velocidade zero.
 * f(x) = 1 − (1 − x)^m. Com m ≈ 5,5 e D de 14 a 24 q reproduz a fração do 1º quadro medida (22 a 57 %).
 */
export const chegada = (t: number, D: number, m = 5.5) => {
  if (t <= 0) return 0;
  if (t >= D) return 1;
  return 1 - Math.pow(1 - t / D, m);
};

/**
 * G6 do Caderno 02 / avanço de saída da referência: entrada singular v ∝ (tp − t + 1)^−n por Tin quadros até o pico
 * em tp, saída exponencial τ. Velocidade contínua no pico, sem overshoot. Retorna 0→1.
 */
export const pulso01 = (f: number, tp: number, n = 1.2, Tin = 10, tau = 3) => {
  const eps = 1;
  const area = (x: number) => (Math.abs(n - 1) < 1e-6 ? Math.log((x + eps) / eps) : (Math.pow(x + eps, 1 - n) - Math.pow(eps, 1 - n)) / (1 - n));
  const Sin = area(Tin);
  const vpk = Math.pow(eps, -n);
  const k = 1 / (Sin + vpk * tau);
  if (f <= tp - Tin) return 0;
  if (f < tp) return k * (Sin - area(tp - f));
  return Math.min(1, k * Sin + k * vpk * tau * (1 - Math.exp(-(f - tp) / tau)));
};
/** Mesmo pulso, normalizado para chegar a 1 exatamente no pico (o quadro antes do corte). */
export const pulsoAtePico = (f: number, tp: number, n: number, Tin: number) => {
  const pico = pulso01(tp, tp, n, Tin);
  return pico > 0 ? clamp(pulso01(f, tp, n, Tin) / pico) : 0;
};

/** Mola amortecida a partir do repouso, deslocamento 1 → 0 (ω0 em rad/q, ζ). Resposta analítica, sem estado. */
export const molaVolta = (t: number, w0: number, zeta: number) => {
  if (t <= 0) return 1;
  if (zeta < 1) {
    const wd = w0 * Math.sqrt(1 - zeta * zeta);
    return Math.exp(-zeta * w0 * t) * (Math.cos(wd * t) + ((zeta * w0) / wd) * Math.sin(wd * t));
  }
  return Math.exp(-w0 * t) * (1 + w0 * t);
};

/** Pose em dois tempos (G1) em tempo, não em quadro: 12 poses por segundo em qualquer fps. */
export const doisTempos = (tMs: number, posesPorSegundo = 12) => Math.floor((tMs / 1000) * posesPorSegundo) / posesPorSegundo * 1000;

// ---------------------------------------------------------------- ruído determinístico (o mesmo do rasgo.py do Caderno 01)
const hash2 = (x: number, y: number) => {
  let h = Math.imul(x | 0, 374761393) ^ Math.imul(y | 0, 668265263);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967295;
};
export const aleatorio = (i: number, semente: number) => hash2(i, semente * 7919 + 13);
export const ruido1 = (x: number, semente: number) => {
  const oit: [number, number][] = [[90, 1], [28, 0.45], [7, 0.22], [2.5, 0.1]];
  let s = 0;
  let pesos = 0;
  oit.forEach(([passo, peso], j) => {
    const u = x / passo;
    const i = Math.floor(u);
    let t = u - i;
    t = t * t * (3 - 2 * t);
    const a = hash2(i, semente + j * 101) * 2 - 1;
    const b = hash2(i + 1, semente + j * 101) * 2 - 1;
    s += peso * (a + (b - a) * t);
    pesos += peso;
  });
  return s / pesos;
};
