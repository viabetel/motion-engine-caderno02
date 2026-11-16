// Cartão fixo (máscara, raio, sombra e fundo nunca se movem) + câmera do pôster + camadas.
// O fundo do pôster fica fora da câmera: no recuo a cor continua cheia e só o conteúdo escala.
import React from "react";
import { Img, staticFile } from "remotion";
import type { Camada, CamadaImagem, MotionEvent, Poster, VideoProject } from "../../schemas/project.schema";
import { estadoDaCamada, mira } from "../../motion/presets";
import { cameraDoPoster } from "../../motion/camera";
import type { EstadoSlot } from "../../motion/slot-state";
import { ImageLayer } from "../imagery/ImageLayer";
import { LineLayer } from "../imagery/LineLayer";
import { TextLayer } from "../typography/TextLayer";
import { Rastro } from "../imagery/Rastro";

type Cartao = { x: number; y: number; w: number; h: number; raio: number; sombra: string | null };

const Grao: React.FC<{ src: string; opacidade: number; mistura: string }> = ({ src, opacidade, mistura }) => (
  <Img src={staticFile(src)} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover",
    opacity: opacidade, mixBlendMode: mistura as React.CSSProperties["mixBlendMode"] }} />
);

export const PosterSlot: React.FC<{
  projeto: VideoProject; cartao: Cartao; slot: EstadoSlot; tMs: number; msQ: number; grao: string;
}> = ({ projeto, cartao, slot, tMs, msQ, grao }) => {
  const poster = projeto.posters.find((p) => p.id === slot.posterId) as Poster;
  const arq = projeto.camadas.posteres[poster.camadas];
  // camadas extras entram no lugar da camada que substituem (mesma ordem de profundidade do Figma) ou por cima de tudo
  const camadas: Camada[] = [];
  const extras = poster.extras ?? [];
  for (const c of arq.camadas) {
    const ex = extras.find((x) => x.tipo === "linha" && x.substitui && mira(x.substitui, c.nome));
    camadas.push(ex ?? c);
  }
  for (const x of extras) if (!(x.tipo === "linha" && x.substitui)) camadas.push(x);
  const t = tMs - slot.inicioMs; // tempo local do pôster
  const cam = cameraDoPoster(slot, poster.deriva, tMs);
  const ev: MotionEvent[] = poster.events;

  const estados = new Map(camadas.map((c) => [c.nome, estadoDaCamada(c, ev, t, msQ)]));
  const iGrao = camadas.findIndex((c) => c.tipo === "grao");
  const primeiroConteudo = camadas.findIndex((c) => c.tipo !== "grao");
  const graoAntes = iGrao >= 0 && iGrao < primeiroConteudo;
  const graoCamada = iGrao >= 0 ? camadas[iGrao] : null;

  const desenha = (c: Camada, i: number) => {
    const e = estados.get(c.nome)!;
    if (c.tipo === "grao") return null;
    if (c.tipo === "texto") return <TextLayer key={i} c={c} eventos={ev} t={t} estado={e} />;
    if (c.tipo === "linha") {
      const alvo = camadas.find((k) => k.tipo === "imagem" && mira(c.ate.camada, k.nome)) as CamadaImagem;
      const ea = estados.get(alvo.nome)!;
      return <LineLayer key={i} c={c} w={arq.w} h={arq.h} estado={e} alvo={{ x: alvo.x + c.ate.ax + ea.dx, y: alvo.y + c.ate.ay + ea.dy }} />;
    }
    const seqEv = ev.find((x) => mira(x.target, c.nome) && x.preset === "sequencia");
    const seqSrc = seqEv && e.seq !== undefined ? `${seqEv.params?.pasta}/${String(e.seq).padStart(2, "0")}.png` : undefined;
    return <ImageLayer key={i} c={c} estado={e} seqSrc={seqSrc} />;
  };

  return (
    <div style={{
      position: "absolute", left: cartao.x, top: cartao.y, width: cartao.w, height: cartao.h,
      borderRadius: cartao.raio, overflow: "hidden", boxShadow: cartao.sombra ?? undefined,
      background: arq.fundo ?? "#000",
    }}>
      {graoAntes && graoCamada && graoCamada.tipo === "grao" ? <Grao src={grao} opacidade={graoCamada.opacidade} mistura={graoCamada.mistura} /> : null}
      <div style={{
        position: "absolute", left: 0, top: 0, width: arq.w, height: arq.h,
        transform: `translateY(${cam.ty}px) scale(${cam.escala})`, transformOrigin: cam.origem,
        filter: cam.rastro > 0.3 ? `url(#rastro-${poster.id})` : undefined,
      }}>
        {cam.rastro > 0.3 ? <Rastro id={`rastro-${poster.id}`} bx={0} by={cam.rastro} /> : null}
        {camadas.map(desenha)}
      </div>
      {!graoAntes && graoCamada && graoCamada.tipo === "grao" ? <Grao src={grao} opacidade={graoCamada.opacidade} mistura={graoCamada.mistura} /> : null}
    </div>
  );
};
