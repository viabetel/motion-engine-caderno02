import React from "react";
import { Composition } from "remotion";
import { MotionMaster } from "../components/stage/MotionMaster";
import { PROJETOS } from "../projects";

// Uma composição por projeto, mais a mesma a 60 q/s (teste 12 do PRD: eventos em ms dão o mesmo tempo em qualquer fps).
export const RemotionRoot: React.FC = () => (
  <>
    {Object.values(PROJETOS).map((p) => (
      <React.Fragment key={p.id}>
        <Composition id={p.id} component={MotionMaster} defaultProps={{ projetoId: p.id }}
          durationInFrames={p.canvas.durationFrames} fps={p.canvas.fps} width={p.canvas.width} height={p.canvas.height} />
        <Composition id={`${p.id}60`} component={MotionMaster} defaultProps={{ projetoId: p.id }}
          durationInFrames={Math.round((p.canvas.durationFrames * 60) / p.canvas.fps)} fps={60} width={p.canvas.width} height={p.canvas.height} />
      </React.Fragment>
    ))}
  </>
);
