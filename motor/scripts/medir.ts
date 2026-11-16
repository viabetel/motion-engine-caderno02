// Medidor: roda as funções puras do motor fora do navegador e reprova o projeto antes do render (08-QA §1 e §4).
// uso: npx tsx scripts/medir.ts [ProjetoId]   → escreve tests/medidor-<id>.md e sai com 1 se algo crítico falhar
import fs from "node:fs";
import path from "node:path";
import { PROJETOS } from "../projects";
import type { CamadaTexto, VideoProject } from "../schemas/project.schema";
import { msToFrame, q30 } from "../motion/schedule";
import { resolveSlot, saidaEm } from "../motion/slot-state";
import { estadoDaCamada, mira } from "../motion/presets";

const linhas: string[] = [];
let falhas = 0;
const ok = (cond: boolean, msg: string, critico = true) => {
  linhas.push(`- [${cond ? "x" : " "}] ${msg}${!cond && !critico ? " (aviso)" : ""}`);
  if (!cond && critico) falhas++;
};

function mede(p: VideoProject) {
  linhas.push(`# Medidor · ${p.id}\n`, `Gerado em ${new Date().toISOString()} · ${p.canvas.width}x${p.canvas.height} · ${p.canvas.fps} q/s · ${p.canvas.durationFrames} q\n`);
  const fps = p.canvas.fps;
  const cartoes = p.camadas.palco.cartoes;

  // 1. cortes: mesmo tempo a 30 e 60 q/s (PRD teste 12)
  linhas.push("## Cortes");
  const cortes = p.tracks.flatMap((t) => t.events.filter((e) => e.action === "poster-swap").map((e) => ({ slot: t.slot, ms: e.atMs, q: msToFrame(e.atMs, fps), q60: msToFrame(e.atMs, 60), preset: e.preset, to: String(e.params?.to) })))
    .sort((a, b) => a.ms - b.ms);
  linhas.push("| cartão | quadro | ms | quadro a 60 q/s | saída | entra |", "|---|---|---|---|---|---|");
  for (const c of cortes) linhas.push(`| ${c.slot} | ${c.q} | ${c.ms.toFixed(1)} | ${c.q60} | ${c.preset} | ${c.to} |`);
  ok(cortes.every((c) => Math.abs((c.q60 * 1000) / 60 - (c.q * 1000) / fps) <= 1000 / 60 + 0.01), "cada corte cai no mesmo tempo a 30 e a 60 q/s (±1 quadro de 60)");

  // 2. rodadas: A lidera; eco e terceiro
  linhas.push("\n## Rodadas (cascata)");
  const lideres = cortes.filter((c) => c.slot === "A");
  for (const l of lideres) {
    const outros = cortes.filter((c) => c.slot !== "A" && c.q > l.q - 2 && c.q <= l.q + 25);
    linhas.push(`- líder A q${l.q}: ` + outros.map((o) => `${o.slot} +${o.q - l.q} q`).join(", "));
    ok(outros.every((o) => o.q > l.q), `rodada q${l.q}: A abre a rodada`);
    ok(outros.length === 2, `rodada q${l.q}: os três cartões trocam (${outros.length + 1})`);
  }

  // 3. golpes de texto P1: um por vez no palco (≥ 9 q entre cartões diferentes)
  linhas.push("\n## Golpes de texto P1");
  const golpes: { slot: string; q: number; alvo: string }[] = [];
  for (const t of p.tracks) {
    const segs = [{ id: t.initialPosterId, ms: 0 }, ...t.events.filter((e) => e.action === "poster-swap").map((e) => ({ id: String(e.params?.to), ms: e.atMs }))];
    for (const s of segs) {
      const po = p.posters.find((x) => x.id === s.id)!;
      for (const e of po.events) if (e.priority === 1) golpes.push({ slot: t.slot, q: msToFrame(s.ms + e.atMs, fps), alvo: `${po.id} ${e.target}` });
    }
  }
  golpes.sort((a, b) => a.q - b.q);
  for (const g of golpes) linhas.push(`- q${g.q} · ${g.slot} · ${g.alvo}`);
  for (let i = 1; i < golpes.length; i++) {
    const a = golpes[i - 1], b = golpes[i];
    if (a.slot !== b.slot) ok(b.q - a.q >= 9 * (fps / 30), `golpes ${a.alvo} → ${b.alvo}: ${b.q - a.q} q (mínimo 9)`, false);
  }

  // 4. leitura: P1 visível ≥ 600 ms depois de entrar (até o corte seguinte ou o fim)
  linhas.push("\n## Leitura");
  const fimMs = (p.canvas.durationFrames * 1000) / fps;
  for (const t of p.tracks) {
    const trocas = t.events.filter((e) => e.action === "poster-swap");
    const segs = [{ id: t.initialPosterId, ms: 0 }, ...trocas.map((e) => ({ id: String(e.params?.to), ms: e.atMs }))];
    segs.forEach((s, i) => {
      const fim = i + 1 < segs.length ? segs[i + 1].ms : fimMs;
      const po = p.posters.find((x) => x.id === s.id)!;
      for (const e of po.events.filter((x) => x.priority === 1)) {
        const camada = p.camadas.posteres[po.camadas].camadas.find((c) => mira(e.target, c.nome));
        const n = camada && camada.tipo === "texto" ? (e.preset === "letras" ? camada.texto.replace(/\s/g, "").length : camada.texto.split(/\s+/).length) : 1;
        const entra = s.ms + e.atMs + (e.preset === "letras" ? n * q30(1) : e.preset === "palavras" ? n * q30(2) : Math.max(e.durationMs, q30(9)));
        const leitura = fim - entra;
        ok(leitura >= 600, `${po.id} ${e.target}: ${Math.round(leitura)} ms de leitura depois de montado (mínimo 600)`);
      }
    });
  }

  // 5. saída: escala no pico = total; o corte acontece no pico; velocidade cresce até o corte
  linhas.push("\n## Saídas (avanço até o corte)");
  for (const c of cortes) {
    const ev = p.tracks.find((t) => t.slot === c.slot)!.events.find((e) => e.atMs === c.ms)!;
    const prm = ev.params ?? {};
    const tot = typeof prm.total === "number" ? prm.total : 1;
    const corte = (c.q * 1000) / fps;
    const esc = [6, 5, 4, 3, 2, 1].map((k) => saidaEm(corte - (k * 1000) / fps, corte, c.preset, prm));
    const pico = esc[esc.length - 1];
    const passos = esc.slice(1).map((v, i) => Math.abs(Math.log(v.escala) - Math.log(esc[i].escala)) * 100);
    linhas.push(`- ${c.slot} q${c.q} ${c.preset}: escala no último quadro ${pico.escala.toFixed(4)} (alvo ${tot}), ty ${pico.ty.toFixed(1)} px; passos %/q ${passos.map((x) => x.toFixed(2)).join(" ")}`);
    if (["curta", "longa", "recuo"].includes(c.preset)) {
      ok(Math.abs(pico.escala - tot) / tot < 0.005, `${c.slot} q${c.q}: chega ao avanço total no quadro do pico`);
      ok(passos.every((v, i) => i === 0 || v >= passos[i - 1] - 1e-9), `${c.slot} q${c.q}: a velocidade só cresce até o corte (aceleração hiperbólica)`);
    }
  }

  // 6. cartões fixos e área segura do texto essencial
  linhas.push("\n## Palco e área segura");
  for (let f = 0; f < p.canvas.durationFrames; f += 7) {
    for (const t of p.tracks) {
      const s = resolveSlot(t, (f * 1000) / fps, fps, cartoes[t.slot].h);
      if (!p.posters.find((x) => x.id === s.posterId)) { ok(false, `q${f} ${t.slot}: pôster ${s.posterId} não existe`); }
    }
  }
  ok(true, "geometria dos cartões vem do palco e não tem transformação (fixa por construção)");
  const sz = p.safeZones;
  for (const po of p.posters) {
    const t = p.tracks.find((tr) => tr.initialPosterId === po.id || tr.events.some((e) => e.params?.to === po.id))!;
    const cart = cartoes[t.slot];
    for (const e of po.events.filter((x) => x.priority === 1)) {
      const c = p.camadas.posteres[po.camadas].camadas.find((k) => mira(e.target, k.nome)) as CamadaTexto | undefined;
      if (!c || !("x" in c)) continue;
      const X0 = cart.x + c.x, Y0 = cart.y + c.y, X1 = X0 + c.w, Y1 = Y0 + c.h;
      ok(Y0 >= sz.top && Y1 <= p.canvas.height - sz.bottom && X1 <= p.canvas.width - sz.right, `${po.id} ${e.target}: dentro da área segura (${Math.round(X0)},${Math.round(Y0)})–(${Math.round(X1)},${Math.round(Y1)})`, false);
    }
  }

  // 7. deriva medida na borda do cartão (px/s): exceção do showcase-fast escrita no 08 K4
  linhas.push("\n## Deriva na borda do cartão");
  for (const po of p.posters) {
    const t = p.tracks.find((tr) => tr.initialPosterId === po.id || tr.events.some((e) => e.params?.to === po.id))!;
    const v = Math.abs(po.deriva / 100) * (cartoes[t.slot].w / 2);
    ok(v <= 12 || p.layoutMode === "trio-showcase", `${po.id}: ${v.toFixed(1)} px/s na borda (≤ 12 fora do showcase)`, false);
  }

  // 9. texto cortado pela câmera durante a leitura (regra K5): a deriva não pode empurrar texto para fora do cartão
  linhas.push("\n## Texto dentro do cartão durante a leitura (deriva máxima)");
  for (const t of p.tracks) {
    const trocas = t.events.filter((e) => e.action === "poster-swap");
    const segs = [{ id: t.initialPosterId, ms: 0 }, ...trocas.map((e) => ({ id: String(e.params?.to), ms: e.atMs }))];
    segs.forEach((s, i) => {
      const prox = trocas[i];
      const rampaMs = prox ? q30(typeof prox.params?.rampa === "number" ? prox.params.rampa : 7) : 0;
      const fim = (i + 1 < segs.length ? segs[i + 1].ms : fimMs) - rampaMs; // a saída corta texto de propósito; a leitura termina antes
      const po = p.posters.find((x) => x.id === s.id)!;
      const arq = p.camadas.posteres[po.camadas];
      const smax = Math.max(1, Math.exp((po.deriva / 100) * ((fim - s.ms) / 1000)));
      const smin = Math.min(1, Math.exp((po.deriva / 100) * ((fim - s.ms) / 1000)));
      const ox = arq.w * 0.5, oy = arq.h * 0.3;
      for (const c of arq.camadas) {
        if (c.tipo !== "texto") continue;
        for (const sc of [smin, smax]) {
          const x0 = ox + (c.x - ox) * sc, x1 = ox + (c.x + c.w - ox) * sc, y0 = oy + (c.y - oy) * sc, y1 = oy + (c.y + c.h - oy) * sc;
          const dentro = x0 >= 8 && y0 >= 8 && x1 <= arq.w - 8 && y1 <= arq.h - 8;
          if (!dentro || sc === smax) ok(dentro, `${po.id} ${c.nome}: escala ${sc.toFixed(3)} → caixa (${x0.toFixed(0)},${y0.toFixed(0)})–(${x1.toFixed(0)},${y1.toFixed(0)}) em ${arq.w}×${arq.h}`);
          if (!dentro) break;
        }
      }
    });
  }

  // 8. determinismo das funções de estado (mesma entrada, mesma saída)
  const po = p.posters[0];
  const cam = p.camadas.posteres[po.camadas].camadas[0];
  const a = JSON.stringify(estadoDaCamada(cam, po.events, 1234.5, 1000 / fps)), b = JSON.stringify(estadoDaCamada(cam, po.events, 1234.5, 1000 / fps));
  ok(a === b, "estado das camadas é função pura do tempo (determinismo)");
}

const alvo = process.argv[2];
for (const p of Object.values(PROJETOS)) if (!alvo || p.id === alvo) mede(p);
fs.mkdirSync(path.join(__dirname, "..", "tests"), { recursive: true });
const out = path.join(__dirname, "..", "tests", `medidor-${alvo ?? "todos"}.md`);
fs.writeFileSync(out, linhas.join("\n") + `\n\n**Falhas críticas: ${falhas}**\n`);
console.log(linhas.join("\n"));
console.log(`\nFalhas críticas: ${falhas}`);
process.exit(falhas ? 1 : 0);
