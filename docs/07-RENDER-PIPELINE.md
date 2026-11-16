# 07 · Pipeline de render

**Nada pesado roda no notebook** (8 GB, disco cheio). Render, recorte com IA e ffmpeg longo rodam na nuvem.

## 1. Onde mora

- Código: `motion-engine/` dentro do repositório privado `viabetel/yamplink-motion` (já tem render no GitHub Actions para os motions da Kivow). Pasta local de trabalho: `Desktop/Yamplink/motion-engine`.
- Projetos (dados): `motion-engine/projects/<assunto>.json`. Peles: `motion-engine/skins/<pele>.json`. Assets: `motion-engine/assets/<assunto>/`.

## 2. Passos

1. **Figma aprovado** → `scripts/figma-para-projeto.mjs` lê os quadros dos pôsteres pela REST (curl, token por segredo de rede na nuvem) e escreve `posters` no JSON; exporta os recortes em 2x.
2. **Medidor antes do render** (`scripts/medir.ts`, esbuild): roda as funções puras de estado para todos os quadros e reprova se algum critério de [08](08-QA-ACCEPTANCE.md) falhar (bordas do cartão, cascata, golpes simultâneos, saltos).
3. **Quadros de prova:** `npx remotion still Trio --frame=N` para q60, q71, q72, q80, q150, q205.
4. **Render:** `gh workflow run render-motion-engine.yml -R viabetel/yamplink-motion -f projeto=cadernos-c02-trio -f versao=vN`.
   No Actions: `npm ci`, `tsc`, medidor, render h264 crf 16 a 30 q/s, conversão BT.709 faixa TV (comando do Caderno 02), ebur128, folha de contato (2 q/s) e forense N0 do nosso MP4.
5. **Entrega:** o MP4 vai para a raiz de Downloads do Nicácio assim que existe (mandar primeiro); a folha de contato e a tabela de defeitos vêm na mensagem seguinte.

## 3. Determinismo

- `Math.round(ms * fps / 1000)` uma única vez por evento.
- Ruído com semente fixa por camada (`ruido(seed, frame)`), nunca `Math.random`.
- Teste: `still` do quadro 175 sozinho = quadro 175 do render inteiro (diferença de pixel 0).
