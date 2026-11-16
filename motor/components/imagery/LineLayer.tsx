// Linha viva: sai de um ponto fixo e termina numa âncora de outra camada, acompanhando o movimento dela.
import React from "react";
import type { CamadaLinha } from "../../schemas/project.schema";
import type { EstadoCamada } from "../../motion/presets";

export const LineLayer: React.FC<{ c: CamadaLinha; w: number; h: number; estado: EstadoCamada; alvo: { x: number; y: number } }> = ({ c, w, h, estado, alvo }) => {
  if (estado.oculto) return null;
  const x2 = alvo.x, y2 = alvo.y;
  const len = Math.hypot(x2 - c.de.x, y2 - c.de.y);
  return (
    <svg width={w} height={h} style={{ position: "absolute", left: 0, top: 0, overflow: "visible", opacity: estado.opac }}>
      <line x1={c.de.x} y1={c.de.y} x2={x2} y2={y2} stroke={c.cor} strokeWidth={c.espessura} strokeLinecap="round"
        strokeDasharray={`${len} ${len}`} strokeDashoffset={len * (1 - estado.desenho)} />
    </svg>
  );
};
