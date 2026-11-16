// Exporta do projeto o que o som e o QA precisam (trilha, efeitos, cortes), na régua de ms.
// uso: npx tsx scripts/eventos.ts <ProjetoId> <saida.json>
import fs from "node:fs";
import { PROJETOS } from "../projects";
import { msToFrame } from "../motion/schedule";

const [id, saida] = process.argv.slice(2);
const p = PROJETOS[id];
if (!p) throw new Error("projeto não existe: " + id);
const fps = p.canvas.fps;
const cortes = p.tracks.flatMap((t) => t.events.filter((e) => e.action === "poster-swap").map((e) => ({ slot: t.slot, q: msToFrame(e.atMs, fps), ms: e.atMs, preset: e.preset, params: e.params })));
fs.writeFileSync(saida, JSON.stringify({
  id: p.id, fps, quadros: p.canvas.durationFrames, duracaoMs: (p.canvas.durationFrames * 1000) / fps,
  musica: p.soundtrack.music ?? null,
  efeitos: p.soundtrack.events.map((e) => ({ id: e.sfxId ?? e.preset, atMs: e.atMs, durMs: e.durationMs, db: e.params?.db ?? -24 })),
  cortes,
  cartoes: p.camadas.palco.cartoes,
}, null, 1));
console.log("eventos ->", saida);
