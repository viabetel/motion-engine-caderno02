// Texto vivo com revelação por linha, palavra ou letra (03 §4.6). A caixa, a fonte e as cores vêm do Figma.
import React from "react";
import type { CamadaTexto, MotionEvent } from "../../schemas/project.schema";
import { estadoDoTexto, type EstadoCamada } from "../../motion/presets";
import { familia } from "./fonts";

type Char = { ch: string; cor: string };

function corDe(c: CamadaTexto, i: number) {
  for (const f of c.faixas) if (i >= f.de && i < f.ate && f.cor) return f.cor;
  return c.cor ?? "#000";
}

export const TextLayer: React.FC<{ c: CamadaTexto; eventos: MotionEvent[]; t: number; estado: EstadoCamada }> = ({ c, eventos, t, estado }) => {
  // linhas → palavras → letras, guardando o índice global para as faixas de cor
  const linhas: Char[][][] = [];
  let i = 0;
  for (const linha of c.texto.split("\n")) {
    const palavras: Char[][] = [];
    let atual: Char[] = [];
    for (const ch of linha) {
      if (ch === " ") { if (atual.length) palavras.push(atual); palavras.push([{ ch: " ", cor: "" }]); atual = []; }
      else atual.push({ ch, cor: corDe(c, i) });
      i++;
    }
    if (atual.length) palavras.push(atual);
    linhas.push(palavras);
    i++; // o "\n"
  }
  const contagem = {
    linhas: linhas.length,
    palavras: linhas.reduce((s, l) => s + l.filter((p) => p[0].ch !== " ").length, 0),
    letras: linhas.reduce((s, l) => s + l.reduce((a, p) => a + (p[0].ch === " " ? 0 : p.length), 0), 0),
  };
  const rev = estadoDoTexto(c.nome, eventos, t, contagem);
  const traco = Math.max(1.5, c.tamanho * 0.012);

  let iPal = 0;
  let iLet = 0;
  const corpo = linhas.map((palavras, li) => {
    const uLinha = rev && rev.unidade === "linhas" ? rev.un[li] : null;
    const conteudo = uLinha?.texto !== undefined && li === 0
      ? <span style={{ color: palavras[0]?.[0]?.cor }}>{uLinha.texto}</span>
      : palavras.map((p, pi) => {
          if (p[0].ch === " ") return <span key={pi}> </span>;
          const uPal = rev && rev.unidade === "palavras" ? rev.un[iPal++] : null;
          const letras = p.map((ch, ci) => {
            const uL = rev && rev.unidade === "letras" ? rev.un[iLet++] : null;
            const contorno = uLinha?.contorno;
            return (
              <span key={ci} style={{
                display: uL ? "inline-block" : undefined,
                color: contorno ? "transparent" : ch.cor,
                WebkitTextStroke: contorno ? `${traco}px ${ch.cor}` : undefined,
                opacity: uL ? uL.visivel : undefined,
                transform: uL ? `translateY(${uL.dy}px)` : undefined,
                filter: uL && uL.blur > 0.05 ? `blur(${uL.blur}px)` : undefined,
              }}>{ch.ch}</span>
            );
          });
          return (
            <span key={pi} style={{
              display: "inline-block", whiteSpace: "pre",
              opacity: uPal ? uPal.visivel : undefined,
              transform: uPal ? `translateY(${uPal.dy}px)` : undefined,
              filter: uPal && uPal.blur > 0.05 ? `blur(${uPal.blur}px)` : undefined,
            }}>{letras}</span>
          );
        });
    const mascara = rev?.unidade === "linhas" && uLinha && uLinha.texto === undefined && !uLinha.contorno && rev.un.some((u) => u.dy > 0);
    return (
      <div key={li} style={{ overflow: mascara ? "hidden" : undefined, height: mascara ? c.altLinha : undefined, opacity: uLinha ? (uLinha.visivel > 0 ? 1 : 0) : undefined }}>
        <div style={{ transform: mascara && uLinha ? `translateY(${(uLinha.dy * 100).toFixed(2)}%)` : undefined }}>{conteudo}</div>
      </div>
    );
  });

  if (estado.oculto) return null;
  return (
    <div style={{
      position: "absolute", left: c.x, top: c.y, width: c.w + 6,
      fontFamily: familia(c.fonte), fontStyle: c.estilo, fontWeight: c.peso, fontSize: c.tamanho,
      lineHeight: `${c.altLinha}px`, letterSpacing: c.entreLetras, textAlign: c.alinha as React.CSSProperties["textAlign"],
      whiteSpace: c.quebra === "fixa" ? "pre" : "pre-wrap",
      opacity: c.opacidade * estado.opac,
      transform: `translate(${estado.dx}px, ${estado.dy}px) rotate(${estado.rot}deg) scale(${estado.escala})`,
      transformOrigin: estado.origem ?? "0 0",
      filter: estado.blur > 0.05 ? `blur(${estado.blur}px)` : undefined,
      fontKerning: "normal",
    }}>
      {corpo}
    </div>
  );
};
