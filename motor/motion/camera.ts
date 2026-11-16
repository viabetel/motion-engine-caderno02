// Câmera do pôster dentro do cartão: deriva contínua × saída. O palco nunca se move (medido: 0 px).
import type { EstadoSlot } from "./slot-state";

/** ponto fixo da escala a 30 % da altura do cartão (o avanço da referência puxa para cima) */
export const ORIGEM_CAMERA = "50% 30%";

export function cameraDoPoster(slot: EstadoSlot, derivaPctPorS: number, tMs: number) {
  const tLocal = Math.max(0, tMs - slot.inicioMs) / 1000;
  const deriva = Math.exp((derivaPctPorS / 100) * tLocal);
  return {
    escala: deriva * slot.saida.escala,
    ty: slot.saida.ty,
    rastro: slot.saida.rastro,
    origem: ORIGEM_CAMERA,
  };
}
