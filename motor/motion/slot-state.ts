// Estado de cada cartão em função pura do tempo absoluto (03 §2). Só um pôster por cartão em qualquer quadro.
import type { SlotTrack } from "../schemas/project.schema";
import { pulsoAtePico } from "./math";
import { msToFrame } from "./schedule";

export type EstadoSlot = {
  posterId: string;
  inicioMs: number; // quando o pôster entrou (corte)
  corteSeguinteMs: number | null;
  saida: { escala: number; ty: number; rastro: number };
};

const Q30 = 1000 / 30; // as curvas de saída foram medidas em quadros a 30 q/s

/** escala e subida da saída no tempo t (ms), para a troca que acontece em corteMs. */
export function saidaEm(t: number, corteMs: number, preset: string, p: Record<string, unknown>) {
  const n = (k: string, d: number) => (typeof p[k] === "number" ? (p[k] as number) : d);
  const uT = t / Q30, uC = corteMs / Q30;
  switch (preset) {
    case "curta":
    case "longa":
    case "recuo": {
      const pr = uT >= uC ? 1 : pulsoAtePico(uT, uC - 1, n("n", preset === "longa" ? 1.6 : 3), n("rampa", preset === "curta" ? 5 : 7));
      return { escala: Math.pow(n("total", 1.1), pr), ty: n("dy", -30) * pr };
    }
    case "chicote": {
      const pr = uT >= uC ? 1 : pulsoAtePico(uT, uC - 1, n("n", 2.4), n("rampa", 4));
      return { escala: 1, ty: n("dy", -54) * pr };
    }
    case "panoramica": {
      const ini = n("inicioMs", corteMs - 4 * Q30);
      return { escala: 1, ty: t > ini ? -n("vPxS", 570) * ((Math.min(t, corteMs) - ini) / 1000) : 0 };
    }
    default: // "deriva": nenhuma saída própria, o corte acontece sobre a deriva
      return { escala: 1, ty: 0 };
  }
}

export function resolveSlot(track: SlotTrack, tMs: number, fps: number, alturaCartao: number): EstadoSlot {
  const f = msToFrame(tMs, fps);
  const trocas = [...track.events].filter((e) => e.action === "poster-swap").sort((a, b) => a.atMs - b.atMs);
  let posterId = track.initialPosterId;
  let inicioMs = 0;
  let proxima = null as (typeof trocas)[number] | null;
  for (const e of trocas) {
    if (msToFrame(e.atMs, fps) <= f) { posterId = String(e.params?.to); inicioMs = e.atMs; }
    else { proxima = e; break; }
  }
  let saida = { escala: 1, ty: 0, rastro: 0 };
  if (proxima) {
    const corteMs = (msToFrame(proxima.atMs, fps) * 1000) / fps;
    const msQ = 1000 / fps;
    const a = saidaEm(tMs, corteMs, proxima.preset, proxima.params ?? {});
    const b = saidaEm(tMs - msQ, corteMs, proxima.preset, proxima.params ?? {});
    // deslocamento na borda do cartão neste quadro → rastro só acima de 25 px/q
    const desl = Math.abs(a.escala - b.escala) * (alturaCartao / 2) + Math.abs(a.ty - b.ty);
    // rastro vertical (o avanço sobe junto): leve, como o borrão do último quadro da ref; nunca desfoque uniforme
    saida = { escala: a.escala, ty: a.ty, rastro: desl > 25 ? Math.min(6, (desl - 25) / 4) : 0 };
  }
  return { posterId, inicioMs, corteSeguinteMs: proxima ? proxima.atMs : null, saida };
}
