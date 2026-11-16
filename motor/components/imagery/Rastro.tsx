// Rastro de movimento direcional (SVG feGaussianBlur com desvio só no eixo do movimento).
import React from "react";

export const Rastro: React.FC<{ id: string; bx: number; by: number }> = ({ id, bx, by }) => (
  <svg style={{ position: "absolute", width: 0, height: 0 }} aria-hidden>
    <defs>
      <filter id={id} x="-25%" y="-25%" width="150%" height="150%">
        <feGaussianBlur stdDeviation={`${bx.toFixed(2)} ${by.toFixed(2)}`} />
      </filter>
    </defs>
  </svg>
);
export const temRastro = (r: [number, number]) => r[0] > 0.3 || r[1] > 0.3;
