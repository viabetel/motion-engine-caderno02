// Lê o palco e os pôsteres do Figma (REST) e escreve as camadas para o motor.
// Texto vira texto vivo (para as revelações); o resto vira PNG 2x na posição exata (absoluteRenderBounds).
// uso: FIGMA_TOKEN=... node scripts/figma-para-projeto.mjs <arquivo-de-config.json>
// O config diz o fileKey, o quadro do palco e os componentes dos pôsteres. Nada aqui conhece tema.
import fs from "node:fs";
import path from "node:path";

const cfgPath = process.argv[2];
const cfg = JSON.parse(fs.readFileSync(cfgPath, "utf8"));
const TOKEN = process.env.FIGMA_TOKEN;
if (!TOKEN) throw new Error("FIGMA_TOKEN ausente");
const API = "https://api.figma.com/v1";
const raiz = path.resolve(path.dirname(cfgPath), "..");
const pub = path.join(raiz, "public", cfg.pasta);
fs.mkdirSync(pub, { recursive: true });

const get = async (url) => {
  for (let t = 0; t < 5; t++) {
    const r = await fetch(url, { headers: { "X-Figma-Token": TOKEN } });
    if (r.status === 429) { await new Promise((s) => setTimeout(s, 4000 * (t + 1))); continue; }
    if (!r.ok) throw new Error(`${r.status} ${url}`);
    return r.json();
  }
  throw new Error("muitas tentativas " + url);
};
const slug = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 48);
const cor = (f) => {
  if (!f || f.type !== "SOLID" || f.visible === false) return null;
  const c = f.color; const a = (f.opacity ?? 1) * (c.a ?? 1);
  return `rgba(${Math.round(c.r * 255)},${Math.round(c.g * 255)},${Math.round(c.b * 255)},${+a.toFixed(3)})`;
};

function texto(n, ox, oy) {
  const st = n.style;
  const base = cor((n.fills || [])[0]);
  // faixas de cor (characterStyleOverrides + styleOverrideTable)
  const ov = n.characterStyleOverrides || [];
  const tab = n.styleOverrideTable || {};
  const faixas = [];
  let i0 = 0;
  for (let i = 1; i <= ov.length; i++) {
    if (i === ov.length || ov[i] !== ov[i0]) {
      const k = ov[i0];
      if (k && tab[k] && tab[k].fills) faixas.push({ de: i0, ate: i, cor: cor(tab[k].fills[0]) });
      i0 = i;
    }
  }
  const b = n.absoluteBoundingBox;
  return {
    tipo: "texto", id: n.id, nome: n.name, texto: n.characters,
    x: +(b.x - ox).toFixed(2), y: +(b.y - oy).toFixed(2), w: +b.width.toFixed(2), h: +b.height.toFixed(2),
    fonte: st.fontFamily, estilo: st.italic ? "italic" : "normal", peso: st.fontWeight,
    tamanho: st.fontSize, entreLetras: st.letterSpacing || 0, altLinha: st.lineHeightPx,
    alinha: (st.textAlignHorizontal || "LEFT").toLowerCase(), quebra: n.style.textAutoResize === "HEIGHT" || n.style.textAutoResize === undefined ? "ajusta" : "fixa",
    cor: base, faixas, opacidade: n.opacity ?? 1,
  };
}

async function quadro(id) {
  const j = await get(`${API}/files/${cfg.fileKey}/nodes?ids=${encodeURIComponent(id)}`);
  return j.nodes[id].document;
}

async function exporta(ids, destinos) {
  for (let i = 0; i < ids.length; i += 40) {
    const lote = ids.slice(i, i + 40);
    const j = await get(`${API}/images/${cfg.fileKey}?ids=${encodeURIComponent(lote.join(","))}&format=png&scale=2`);
    for (const id of lote) {
      const url = j.images[id];
      if (!url) { console.warn("sem imagem para", id); continue; }
      const r = await fetch(url);
      fs.writeFileSync(destinos[id], Buffer.from(await r.arrayBuffer()));
    }
  }
}

// Caixa do que o export PNG desenha: o nó inteiro sem o corte do pai, com sombras, desfoque e traço,
// respeitando máscara e clipsContent dos filhos. (absoluteRenderBounds vem cortado pelo cartão; não serve.)
const uniao = (a, b) => (!a ? b : !b ? a : { x0: Math.min(a.x0, b.x0), y0: Math.min(a.y0, b.y0), x1: Math.max(a.x1, b.x1), y1: Math.max(a.y1, b.y1) });
const corta = (a, b) => (!a || !b ? null : { x0: Math.max(a.x0, b.x0), y0: Math.max(a.y0, b.y0), x1: Math.min(a.x1, b.x1), y1: Math.min(a.y1, b.y1) });
const deBB = (b) => ({ x0: b.x, y0: b.y, x1: b.x + b.width, y1: b.y + b.height });
function expande(c, n) {
  if (!c) return c;
  let r = { ...c };
  const sw = (n.strokes || []).some((s) => s.visible !== false) ? (n.strokeWeight || 0) : 0;
  if (sw) { const k = n.strokeAlign === "INSIDE" ? 0 : n.strokeAlign === "OUTSIDE" ? sw : sw / 2; r = { x0: r.x0 - k, y0: r.y0 - k, x1: r.x1 + k, y1: r.y1 + k }; }
  let tot = r;
  for (const e of n.effects || []) {
    if (e.visible === false) continue;
    if (e.type === "DROP_SHADOW") {
      const s = (e.radius || 0) + (e.spread || 0);
      tot = uniao(tot, { x0: r.x0 + e.offset.x - s, y0: r.y0 + e.offset.y - s, x1: r.x1 + e.offset.x + s, y1: r.y1 + e.offset.y + s });
    } else if (e.type === "LAYER_BLUR") {
      const s = e.radius || 0; tot = uniao(tot, { x0: tot.x0 - s, y0: tot.y0 - s, x1: tot.x1 + s, y1: tot.y1 + s });
    }
  }
  return tot;
}
function caixaRender(n) {
  if (n.visible === false) return null;
  let kids = null;
  if (n.children && n.children.length) {
    let mascara = null;
    for (const k of n.children) {
      if (k.isMask) { mascara = deBB(k.absoluteBoundingBox); continue; }
      let c = caixaRender(k);
      if (mascara) c = corta(c, mascara);
      kids = uniao(kids, c);
    }
    if (n.clipsContent) kids = corta(kids, deBB(n.absoluteBoundingBox));
  }
  const temPintura = (n.fills || []).some((f) => f.visible !== false) || (n.strokes || []).some((s) => s.visible !== false);
  const proprio = !n.children || !n.children.length || temPintura ? deBB(n.absoluteBoundingBox) : null;
  return expande(uniao(proprio, kids), n);
}

function camadas(doc, pastaRel) {
  const ob = doc.absoluteBoundingBox;
  const out = [];
  const exportar = {};
  for (const n of doc.children || []) {
    if (n.visible === false) continue;
    if (n.name === cfg.nomeGrao) {
      out.push({ tipo: "grao", nome: n.name, opacidade: n.opacity ?? 1, mistura: (n.blendMode || "NORMAL").toLowerCase().replace("_", "-") });
      continue;
    }
    if (n.type === "TEXT") { out.push(texto(n, ob.x, ob.y)); continue; }
    const cx = caixaRender(n);
    if (!cx) continue;
    const arq = `${pastaRel}/${String(out.length).padStart(2, "0")}-${slug(n.name)}.png`;
    out.push({
      tipo: "imagem", id: n.id, nome: n.name, src: arq,
      x: +(cx.x0 - ob.x).toFixed(2), y: +(cx.y0 - ob.y).toFixed(2), w: +(cx.x1 - cx.x0).toFixed(2), h: +(cx.y1 - cx.y0).toFixed(2),
      opacidade: n.opacity ?? 1, mistura: (n.blendMode || "NORMAL").toLowerCase().replace("_", "-"),
    });
    exportar[n.id] = path.join(raiz, "public", arq);
  }
  return { w: ob.width, h: ob.height, fundo: cor((doc.fills || [])[0]), camadas: out, exportar };
}

const saida = { origem: { fileKey: cfg.fileKey, lidoEm: new Date().toISOString() }, palco: null, posteres: {} };
const todos = {};
// palco: fundo, título fixo, assinatura e geometria dos cartões
{
  const doc = await quadro(cfg.palco);
  const ob = doc.absoluteBoundingBox;
  fs.mkdirSync(path.join(pub, "palco"), { recursive: true });
  const cartoes = {};
  const resto = { ...doc, children: [] };
  for (const n of doc.children) {
    const m = /^Cartão ([A-Z])$/.exec(n.name);
    if (m) {
      const b = n.absoluteBoundingBox;
      const sh = (n.effects || []).find((e) => e.type === "DROP_SHADOW" && e.visible !== false);
      cartoes[m[1]] = { x: b.x - ob.x, y: b.y - ob.y, w: b.width, h: b.height, raio: n.cornerRadius || 0,
        sombra: sh ? `${sh.offset.x}px ${sh.offset.y}px ${sh.radius}px ${cor({ type: "SOLID", color: sh.color })}` : null };
    } else resto.children.push(n);
  }
  const c = camadas(resto, `${cfg.pasta}/palco`);
  Object.assign(todos, c.exportar); delete c.exportar;
  saida.palco = { ...c, cartoes, ordem: doc.children.filter((n) => /^Cartão /.test(n.name)).map((n) => n.name.slice(-1)) };
}
for (const [chave, id] of Object.entries(cfg.posteres)) {
  const doc = await quadro(id);
  fs.mkdirSync(path.join(pub, chave), { recursive: true });
  const c = camadas(doc, `${cfg.pasta}/${chave}`);
  Object.assign(todos, c.exportar); delete c.exportar;
  saida.posteres[chave] = { componente: id, nome: doc.name, ...c };
  console.log(chave, doc.name, c.camadas.map((l) => `${l.tipo}:${l.nome}`).join(" | "));
}
await exporta(Object.keys(todos), todos);
// confere a caixa calculada contra o tamanho real do PNG (2x); se divergir, mantém o centro e usa o PNG
const pngTam = (f) => { const b = fs.readFileSync(f); return [b.readUInt32BE(16) / 2, b.readUInt32BE(20) / 2]; };
let ajustes = 0;
for (const grupo of [saida.palco, ...Object.values(saida.posteres)]) {
  for (const l of grupo.camadas) {
    if (l.tipo !== "imagem") continue;
    const [w, h] = pngTam(path.join(raiz, "public", l.src));
    if (Math.abs(w - l.w) > 2 || Math.abs(h - l.h) > 2) {
      console.warn(`caixa ajustada: ${l.nome.slice(0, 40)} calc ${l.w}x${l.h} png ${w}x${h}`);
      l.x = +(l.x + (l.w - w) / 2).toFixed(2); l.y = +(l.y + (l.h - h) / 2).toFixed(2); l.w = w; l.h = h; ajustes++;
    }
  }
}
console.log("caixas ajustadas pelo PNG:", ajustes);
fs.writeFileSync(path.join(raiz, cfg.saida), JSON.stringify(saida, null, 1));
console.log("ok", Object.keys(todos).length, "imagens");
