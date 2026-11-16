// Composição mestre única (regra K7): palco fixo + cartões na ordem de camadas medida (C atrás de A e B).
// Cada quadro é função pura do tempo absoluto; nenhum Sequence monta ou desmonta imagem.
import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import type { CamadaImagem, CamadaTexto, SlotId, VideoProject } from "../../schemas/project.schema";
import { neutro } from "../../motion/presets";
import { resolveSlot } from "../../motion/slot-state";
import { frameToMs } from "../../motion/schedule";
import { ImageLayer } from "../imagery/ImageLayer";
import { PosterSlot } from "../slots/PosterSlot";
import { TextLayer } from "../typography/TextLayer";
import { PROJETOS } from "../../projects";
import { PELES } from "../../themes";

export const MotionMaster: React.FC<{ projetoId: string }> = ({ projetoId }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const projeto = PROJETOS[projetoId] as VideoProject;
  const pele = PELES[projeto.visualSkin];
  const tMs = frameToMs(frame, fps);
  const msQ = 1000 / fps;
  const palco = projeto.camadas.palco;
  return (
    <AbsoluteFill style={{ background: palco.fundo ?? pele.palco }}>
      {palco.camadas.map((c, i) =>
        c.tipo === "imagem" ? <ImageLayer key={i} c={c as CamadaImagem} estado={neutro()} />
        : c.tipo === "texto" ? <TextLayer key={i} c={c as CamadaTexto} eventos={[]} t={tMs} estado={neutro()} />
        : null,
      )}
      {palco.ordem.map((s) => {
        const track = projeto.tracks.find((tr) => tr.slot === (s as SlotId));
        if (!track) return null;
        const cartao = palco.cartoes[s];
        const estado = resolveSlot(track, tMs, fps, cartao.h);
        return <PosterSlot key={s} projeto={projeto} cartao={cartao} slot={estado} tMs={tMs} msQ={msQ} grao={pele.grao} />;
      })}
    </AbsoluteFill>
  );
};
