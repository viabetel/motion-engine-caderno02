// Camada de imagem exportada do Figma (PNG 2x na caixa exata), com o estado do preset aplicado.
import React from "react";
import { Img, staticFile } from "remotion";
import type { CamadaImagem } from "../../schemas/project.schema";
import type { EstadoCamada } from "../../motion/presets";
import { Rastro, temRastro } from "./Rastro";

const mistura = (m: string): React.CSSProperties["mixBlendMode"] =>
  (m === "pass-through" || m === "normal" ? "normal" : (m as React.CSSProperties["mixBlendMode"]));

export const ImageLayer: React.FC<{ c: CamadaImagem; estado: EstadoCamada; seqSrc?: string }> = ({ c, estado, seqSrc }) => {
  if (estado.oculto || estado.opac <= 0.001) return null;
  const idR = `r-${c.id.replace(/[^a-zA-Z0-9]/g, "")}`;
  const filtros = [estado.blur > 0.05 ? `blur(${estado.blur.toFixed(2)}px)` : "", temRastro(estado.rastro) ? `url(#${idR})` : ""].filter(Boolean).join(" ");
  return (
    <div style={{
      position: "absolute", left: c.x, top: c.y, width: c.w, height: c.h,
      transform: `translate(${estado.dx}px, ${estado.dy}px) rotate(${estado.rot}deg) scale(${estado.escala * estado.escalaX}, ${estado.escala})`,
      transformOrigin: estado.origem ?? "50% 50%",
      opacity: c.opacidade * estado.opac,
      filter: filtros || undefined,
      clipPath: estado.clip,
      mixBlendMode: mistura(c.mistura),
    }}>
      {temRastro(estado.rastro) ? <Rastro id={idR} bx={estado.rastro[0]} by={estado.rastro[1]} /> : null}
      <Img src={staticFile(seqSrc ?? c.src)} style={{ width: "100%", height: "100%", objectFit: seqSrc ? "contain" : "fill", display: "block" }} />
    </div>
  );
};
