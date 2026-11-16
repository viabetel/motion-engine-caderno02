// Presets de movimento das camadas (03-MOTION-GRAMMAR). Funções puras do tempo local do pôster (ms).
// Nenhum preset conhece tema: recebem parâmetros do projeto.
import type { Camada, MotionEvent } from "../schemas/project.schema";
import { chegada, clamp, doisTempos, molaVolta, suave } from "./math";

export type EstadoCamada = {
  dx: number; dy: number; rot: number; escala: number; escalaX: number;
  opac: number; blur: number; clip?: string; origem?: string;
  seq?: number; oculto: boolean; desenho: number;
  /** rastro de movimento direcional (desvio do desfoque em x e y), só acima de 25 px/q */
  rastro: [number, number];
};
/** o evento mira a camada pelo nome exato ou pelo começo do nome (nomes do Figma são longos) */
export const mira = (alvo: string, nome: string) => nome === alvo || nome.startsWith(alvo);
export const neutro = (): EstadoCamada => ({ dx: 0, dy: 0, rot: 0, escala: 1, escalaX: 1, opac: 1, blur: 0, oculto: false, desenho: 1, rastro: [0, 0] });

const num = (e: MotionEvent, k: string, padrao: number) => {
  const v = e.params?.[k];
  return typeof v === "number" ? v : padrao;
};
/** desfoque de movimento só acima de 25 px/q, localizado (regra geral §0b-11), proporcional ao deslocamento do quadro */
export const desfoquePorVelocidade = (pxPorQuadro: number) => (pxPorQuadro > 25 ? Math.min(10, pxPorQuadro / 3) : 0);

/** rastro na direção do deslocamento (dx0, dy0): desvio proporcional ao passo do quadro */
const rastroNaDirecao = (s: EstadoCamada, dx0: number, dy0: number, passo: number) => {
  const b = desfoquePorVelocidade(passo);
  if (b <= 0) return;
  const L = Math.hypot(dx0, dy0) || 1;
  s.rastro = [Math.max(s.rastro[0], (Math.abs(dx0) / L) * b), Math.max(s.rastro[1], (Math.abs(dy0) / L) * b)];
};

/** Aplica UM evento sobre o estado, no tempo local t (ms). msQ = duração de um quadro do render (para a velocidade). */
function aplica(e: MotionEvent, c: Camada, t: number, msQ: number, s: EstadoCamada) {
  const t0 = e.atMs;
  const D = Math.max(1, e.durationMs);
  const local = t - t0;
  const antes = local < 0;
  const ocultoAntes = num(e, "ocultoAntes", t0 > 0 ? 1 : 0) === 1;
  const caixa = "x" in c ? c : { x: 0, y: 0, w: 0, h: 0 };
  switch (e.preset) {
    case "aparece": {
      if (antes) { if (ocultoAntes) s.opac = 0; return; }
      const p = chegada(local, D, 3);
      s.opac *= p; s.blur += 6 * (1 - p); s.dy += num(e, "dy", 8) * (1 - p);
      return;
    }
    case "chegada":
    case "desce":
    case "desliza":
    case "separa": {
      if (antes && ocultoAntes) { s.opac = 0; return; }
      const m = num(e, "m", 5.5);
      const p = chegada(Math.max(0, local), D, m);
      const p1 = chegada(Math.max(0, local - msQ), D, m);
      const dx0 = num(e, "dx", 0), dy0 = num(e, "dy", 0), r0 = num(e, "rot", 0);
      s.dx += dx0 * (1 - p); s.dy += dy0 * (1 - p); s.rot += r0 * (1 - p);
      if (!antes) rastroNaDirecao(s, dx0, dy0, Math.hypot(dx0, dy0) * (p - p1));
      return;
    }
    case "queda": {
      if (antes && ocultoAntes) { s.opac = 0; return; }
      const w0 = num(e, "w0", 0.695), z = num(e, "zeta", 0.81);
      const q = Math.max(0, local) / (1000 / 30); // a mola foi medida em quadros a 30 q/s
      const q1 = Math.max(0, local - msQ) / (1000 / 30);
      const a = molaVolta(q, w0, z), a1 = molaVolta(q1, w0, z);
      const dx0 = num(e, "dx", 0), dy0 = num(e, "dy", 0);
      s.dx += dx0 * a; s.dy += dy0 * a;
      if (!antes) rastroNaDirecao(s, dx0, dy0, Math.hypot(dx0, dy0) * Math.abs(a - a1));
      return;
    }
    case "gira": {
      const p = chegada(Math.max(0, local), D, num(e, "m", 5.5));
      s.rot += num(e, "rot", -30) * (1 - p);
      s.origem = `${num(e, "px", 0) - caixa.x}px ${num(e, "py", 0) - caixa.y}px`;
      return;
    }
    case "escala": {
      const p = chegada(Math.max(0, local), D, num(e, "m", 5.5));
      s.escala *= num(e, "de", 0.9) + (1 - num(e, "de", 0.9)) * p;
      return;
    }
    case "deriva-x": {
      const ts = Math.max(0, local) / 1000;
      s.dx += num(e, "vx", 0) * ts; s.dy += num(e, "vy", 0) * ts;
      return;
    }
    case "respira": {
      const tt = num(e, "duasPoses", 0) === 1 ? doisTempos(t) : t;
      const P = num(e, "periodoMs", 2400), A = num(e, "graus", 0.6);
      s.rot += A * Math.sin((2 * Math.PI * tt) / P + num(e, "fase", 0));
      s.dy += num(e, "sobe", 0) * Math.sin((2 * Math.PI * tt) / P + num(e, "fase", 0) + 1.3);
      s.origem = `${caixa.w / 2}px ${caixa.h}px`;
      return;
    }
    case "orbita": {
      // a ronda do inimigo do Caderno 02 (sinais.ts · posOrbita), na escala do cartão
      const P = num(e, "periodoMs", 8000), D0 = 5, RZ = 1.8, DREF = 2.2, kM = DREF / D0;
      const pos = (tm: number) => {
        const th = Math.PI * 0.5 + (2 * Math.PI * tm) / P;
        const raio = 1 + 0.07 * Math.sin((2 * Math.PI * tm) / (P * 0.68));
        const k = DREF / (D0 + RZ * raio * Math.sin(th));
        return { x: num(e, "rx", 60) * raio * Math.cos(th) * (k / kM), y: -num(e, "alt", 30) * (k - kM) / kM + 3 * Math.sin((2 * Math.PI * tm) / 2540), k };
      };
      const a = pos(t), b = pos(t - msQ), cpos = pos(t + msQ);
      s.dx += a.x; s.dy += a.y; s.escala *= a.k / kM;
      const vx = (cpos.x - b.x) / 2;
      const inc = Math.tanh(vx / 0.6);
      s.escalaX *= Math.sign(inc || 1) * Math.max(0.3, Math.abs(inc));
      s.opac *= 0.7 + 0.3 * clamp((a.k / kM - 0.7) / 0.6); // bruma pela distância
      return;
    }
    case "afasta": {
      const p = chegada(Math.max(0, local), D, num(e, "m", 5.5));
      const p1 = chegada(Math.max(0, local - msQ), D, num(e, "m", 5.5));
      const dx0 = num(e, "dx", 0), dy0 = num(e, "dy", 0);
      const ts = Math.max(0, local) / 1000;
      s.dx += dx0 * (1 - p) + num(e, "vx", 0) * ts; s.dy += dy0 * (1 - p) + num(e, "vy", 0) * ts;
      s.escala *= num(e, "esc0", 1.2) + (1 - num(e, "esc0", 1.2)) * p - num(e, "encolhePorS", 0) * ts;
      if (!antes) rastroNaDirecao(s, dx0, dy0, Math.hypot(dx0, dy0) * (p - p1));
      return;
    }
    case "sequencia": {
      const fps = num(e, "fps", 24), n = num(e, "quadros", 1);
      s.seq = Math.floor((Math.max(0, t) / 1000) * fps + num(e, "inicio", 0)) % n;
      return;
    }
    case "etiqueta": {
      if (antes) { if (ocultoAntes) s.opac = 0; return; }
      const p = chegada(local, D, num(e, "m", 5.5));
      const w = chegada(local, num(e, "varreMs", 200), 3);
      s.escala *= num(e, "de", 1.18) + (1 - num(e, "de", 1.18)) * p;
      s.origem = `0px ${caixa.h / 2}px`;
      s.clip = `inset(0 ${(100 * (1 - w)).toFixed(2)}% 0 0)`;
      return;
    }
    case "revela": {
      if (antes) { if (ocultoAntes) { s.opac = 0; s.desenho = 0; } return; }
      const p = chegada(local, D, num(e, "m", 3));
      const dir = e.params?.dir ?? "esq";
      const r = (100 * (1 - p)).toFixed(2);
      s.clip = dir === "esq" ? `inset(0 ${r}% 0 0)` : dir === "dir" ? `inset(0 0 0 ${r}%)` : dir === "cima" ? `inset(0 0 ${r}% 0)` : `inset(${r}% 0 0 0)`;
      s.desenho = p;
      return;
    }
    case "esconde":
      s.oculto = true;
      return;
    default:
      return;
  }
}

/** Estado de uma camada no tempo local t (ms) a partir de todos os eventos que miram nela. */
export function estadoDaCamada(c: Camada, eventos: MotionEvent[], t: number, msQ: number): EstadoCamada {
  const s = neutro();
  for (const e of eventos) if (mira(e.target, c.nome) && e.action !== "type-reveal") aplica(e, c, t, msQ, s);
  return s;
}

// ---------------------------------------------------------------- texto
export type Unidade = { visivel: number; dy: number; blur: number; contorno: boolean; texto?: string };
/** Revelação de texto: devolve o estado de cada unidade (linha, palavra ou letra) e a unidade usada. */
export function estadoDoTexto(nome: string, eventos: MotionEvent[], t: number, contagem: { linhas: number; palavras: number; letras: number }) {
  const ev = eventos.find((e) => mira(e.target, nome) && e.action === "type-reveal");
  if (!ev) return null;
  const local = t - ev.atMs;
  const preset = ev.preset;
  const passo = num(ev, "passoMs", preset === "letras" ? 1000 / 30 : preset === "palavras" ? 2000 / 30 : 4000 / 30);
  const dur = num(ev, "unidadeMs", preset === "linhas" ? 9000 / 30 : 4000 / 30);
  const n = preset === "letras" ? contagem.letras : preset === "palavras" ? contagem.palavras : contagem.linhas;
  const atrasos = ev.params?.atrasosMs as number[] | undefined; // por unidade (linhas com tempos diferentes)
  const un: Unidade[] = [];
  for (let i = 0; i < n; i++) {
    const ti = local - (atrasos ? atrasos[i] ?? i * passo : i * passo);
    const p = ti < 0 ? 0 : chegada(ti, dur, preset === "linhas" ? 4 : 3);
    if (preset === "letras") un.push({ visivel: p, dy: -24 * (1 - p), blur: 8 * (1 - p), contorno: false });
    else if (preset === "linhas") un.push({ visivel: p > 0 ? 1 : 0, dy: (1 - p), blur: 0, contorno: false }); // dy em fração da linha (máscara)
    else un.push({ visivel: p, dy: 10 * (1 - p), blur: 6 * (1 - p), contorno: false });
  }
  if (preset === "contorno") {
    const q = Math.floor(Math.max(0, local) / (1000 / 30));
    const em = local < 0 ? false : local < num(ev, "duracaoMs", 400) ? Math.floor(q / 2) % 2 === 0 : false;
    return { unidade: "linhas" as const, un: un.map((u) => ({ ...u, visivel: local < 0 ? 0 : 1, dy: 0, contorno: em })) };
  }
  if (preset === "contador") {
    const de = num(ev, "de", 1), ate = num(ev, "ate", 10);
    if (local < 0) return { unidade: "linhas" as const, un: un.map((u) => ({ ...u, visivel: 0 })) };
    const tt = doisTempos(local, num(ev, "poses", 12));
    const v = Math.round(de + (ate - de) * suave(tt / Math.max(1, ev.durationMs)));
    return { unidade: "linhas" as const, un: un.map((u) => ({ ...u, visivel: 1, dy: 0, blur: 0, texto: String(v) })) };
  }
  return { unidade: preset === "letras" ? ("letras" as const) : preset === "palavras" ? ("palavras" as const) : ("linhas" as const), un };
}
