// Gera docs/sequencia/FIGMA_TO_REMOTION_MAP.md a partir das 9 poses de destino no Figma (REST, FIGMA_TOKEN).
// Plano, identidade compartilhada, material e origem saem de regras pelo nome da camada (revisáveis no próprio mapa).
import fs from "node:fs";
const T = process.env.FIGMA_TOKEN, K = "qSQa66nPKuVvDZxqHJ3BCr";
const CENAS = { P1: "93:40", P2: "93:75", P3: "93:100", P3b: "93:119", P4: "95:58", P4b: "95:76", P5: "95:96", P5b: "95:129", P6: "95:170" };
const regra = (n) => {
  const s = n.name;
  if (n.type === "TEXT") return { plano: "type", comp: /ESTÁ ESCRITO/.test(n.characters || "") ? "fita" : "", mat: /Título|Contador|Letreiro|Fecho/.test(s) ? "tipografia-oferta" : "tipografia-resposta", origem: "topo-esquerda" };
  if (/^Céu|Cenário 0/.test(s)) return { plano: "background", comp: "paisagem", mat: "", origem: "centro" };
  if (/inimigo|Inimigo|Satanás em voo/.test(s)) return { plano: "background", comp: "inimigo", mat: "papel", origem: "centro" };
  if (/Terra|Cenário 1|Cristas|Cenário 2/.test(s)) return { plano: "midground", comp: "paisagem", mat: "", origem: "centro" };
  if (/^Jesus/.test(s)) return { plano: "subject", comp: "maos", mat: "tecido", origem: "base-centro (pino)" };
  if (/Tissot · a caverna/.test(s)) return { plano: "subject", comp: "pedra", mat: "pedra", origem: "pedra do tentador" };
  if (/pináculo/.test(s)) return { plano: "subject", comp: "torre", mat: "", origem: "eixo da torre" };
  if (/Duccio/.test(s)) return { plano: "subject", comp: "reinos", mat: "papel", origem: "centro" };
  if (/Reino/.test(s)) return { plano: "midground", comp: "reinos", mat: "papel", origem: "base (pop-up)" };
  if (/Pedaço arrancado/.test(s)) return { plano: "paper", comp: "rasgo", mat: "papel", origem: "centro de massa" };
  if (/Pedras da frente|Cenário 3/.test(s)) return { plano: "foreground", comp: "pedra", mat: "pedra", origem: "centro" };
  if (/Círculo à mão/.test(s)) return { plano: "paper", comp: "fita", mat: "papel", origem: "centro" };
  if (/^Fita/.test(s)) return { plano: "paper", comp: "fita", mat: "fita", origem: "esquerda-centro" };
  if (/Assinatura/.test(s)) return { plano: "type", comp: "assinatura", mat: "", origem: "fixa na tela" };
  if (/Grão|Sombra|Luz|Escurecer|Letreiro de borda/.test(s)) return { plano: "fx", comp: "", mat: "luz", origem: "quadro" };
  return { plano: "?", comp: "", mat: "", origem: "centro" };
};
const ids = Object.values(CENAS).join(",");
const j = await (await fetch(`https://api.figma.com/v1/files/${K}/nodes?ids=${encodeURIComponent(ids)}`, { headers: { "X-Figma-Token": T } })).json();
const L = ["# FIGMA_TO_REMOTION_MAP · Caderno 02 em sequência", "", `Gerado de \`scripts/mapa-figma-sequencia.mjs\` em ${new Date().toISOString().slice(0, 16)} a partir da página \`93:37\`. Coordenadas em px do quadro 1080 × 1350. Plano, identidade e material vêm de regras pelo nome da camada; revisar antes da Fase 3.`, ""];
for (const [cena, id] of Object.entries(CENAS)) {
  const d = j.nodes[id].document, o = d.absoluteBoundingBox;
  L.push(`## ${cena} · \`${id}\` · ${d.name}`, "", "| Nó | Camada | Tipo | Asset | Caixa (x, y, w × h) | Plano | Compartilhado | Material | Origem da transformação |", "|---|---|---|---|---|---|---|---|---|");
  for (const n of d.children) {
    if (n.visible === false) continue;
    const b = n.absoluteBoundingBox; const r = regra(n);
    const img = (n.fills || []).find((f) => f.type === "IMAGE");
    const asset = n.type === "TEXT" ? `texto «${(n.characters || "").replace(/\n/g, " / ").slice(0, 40)}»` : img ? `imagem ${(img.imageRef || img.imageHash || "?").slice(0, 8)}` : n.type === "INSTANCE" ? "componente" : "grupo/vetor (export PNG 2x)";
    L.push(`| \`${n.id}\` | ${n.name.slice(0, 48)} | ${n.type} | ${asset} | ${Math.round(b.x - o.x)}, ${Math.round(b.y - o.y)}, ${Math.round(b.width)} × ${Math.round(b.height)} | ${r.plano} | ${r.comp || "—"} | ${r.mat || "—"} | ${r.origem} |`);
  }
  L.push("");
}
L.push("## Identidades compartilhadas", "", "| Id | O que é | Cenas | Material |", "|---|---|---|---|",
  "| maos | mãos de Jesus (mesmo asset do Kramskoi no crepúsculo) | P1, P2, P6 | tecido |",
  "| pedra | pedra do chão → pedras na mão do tentador | P1 (frente), P2, P3, P3b | pedra |",
  "| torre | eixo do pináculo do Templo | P4, P4b | — |",
  "| fita | refrão ESTÁ ESCRITO (nasce do círculo à mão) | P3, P3b, P4b, P5b, P6 | fita |",
  "| paisagem | céu e terra do deserto | P1, P2, P6 | — |",
  "| rasgo | pedaço com o tentador | P5b, B8 | papel |",
  "| reinos | cidades do Duccio | P5, P5b | papel |");
fs.writeFileSync("docs/sequencia/FIGMA_TO_REMOTION_MAP.md", L.join("\n") + "\n");
console.log("mapa ok", L.length, "linhas");
