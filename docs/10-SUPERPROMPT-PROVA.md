# 10 · Superprompt medido da prova (Trio Showcase · Caderno 02)

Implementação linha a linha: `projects/cadernos-c02-trio.ts` (dados), `motion/*.ts` (física), `components/*` (desenho). Cada número tem a medida da referência ao lado. Velocidades em px escalam ×2,109 (512 → 1080). Tempo, n e ζ não escalam.

## 1. Relógio e trilha

| Item | Valor | Origem |
|---|---|---|
| Canvas | 1080 × 1920, 30 q/s, 210 q (7,0 s) | ref 30 q/s; fim um quadro antes da rodada 3 da ref (A209) |
| Trilha | "Between Two Evils" (Michael Ramir C., Mixkit, licença livre), recorte de 9,770 s a 16,770 s | medida: colcheia 334,17 ms (89,8 BPM), grave entra em 13,50 s |
| Grave entra no filme | 3,73 s | ref: q112 = 3,73 s |
| Bumbo do líder da rodada 2 | q157 exato (5,233 s = colcheia 20 da faixa) | ref: líder no bumbo |
| Terceiro da rodada 2 | q177, no bumbo seguinte (+20 q) | ref: +12 a +21 q |
| Rodada 1 | A72, C86, B87 sem bumbo (intro) | ref: rodada 1 na intro, sem bumbo |

## 2. O efeito principal: a troca (40 dimensões)

| # | Dimensão | Valor | Ref |
|---|---|---|---|
| 1 | Intenção | mudar o conceito do cartão sem mexer no palco | palco 0 px |
| 2 | Estrutura | saída que acelera → corte seco no pico → chegada já em movimento | medido nas 11 trocas |
| 3 | Gatilho | evento `poster-swap` em ms absolutos na trilha do cartão | — |
| 4 | Quadro do corte | `round(ms·fps/1000)`, uma vez | — |
| 5 | Família da saída | pulso de entrada singular `pulso01` (Caderno 02), normalizado no pico | hiperbólico R² 0,99 |
| 6 | n (curta) | 3,05 | A157 3,05 |
| 7 | n (longa / recuo) | 1,59 / 1,6 | C86 1,59 |
| 8 | Rampa | 5 q (curta), 7 q (longa), 6 q (recuo), 4 q (chicote) | 3 a 7 q |
| 9 | Avanço total | ×1,093 (A157), ×1,139 (C86), ×0,92 (C177) | iguais |
| 10 | Subida junto | −38 px (curta), −29 px (longa), +38 px (recuo) | ty medido ×2,109 |
| 11 | Chicote (A72) | −54 px em 4 q, sem escala | −1,7 −3,2 −11 −38 px/q |
| 12 | Panorâmica (B161) | −570 px/s a partir de q157 (quando A troca) | −9 px/q em 512 |
| 13 | Sem saída (B87) | só a deriva até o corte | B87 |
| 14 | Ponto fixo da escala | 50 % × 30 % do cartão | translação para cima medida |
| 15 | Rastro na saída | desfoque = deslocamento na borda / 3, só acima de 25 px/q, máx 10 | rastro no último quadro |
| 16 | Corte | troca de pôster no quadro exato, sem fusão | energia sobe num quadro |
| 17 | Fundo no recuo | cor do pôster fica cheia no cartão; só o conteúdo escala | correção vista no Figma |
| 18 | Chegada (família) | 1 − (1 − t/D)^m, m 5,5: nasce rápida, velocidade final 0 | potência n 0,26–0,31 |
| 19 | D da chegada | 12 a 24 q | 14 a 24 q |
| 20 | Fração no 1º quadro | 22 a 40 % | 22 a 57 % |
| 21 | Queda (A1) | mola ζ 0,81, ω₀ 0,695 rad/q, +171 px | ampulheta A72 |
| 22 | Overshoot da queda | ≈ 8 px | 4 px em 512 |
| 23 | Rastro na chegada | o mesmo de 15, pela velocidade do herói | rastro no 1º quadro |
| 24 | Deriva por pôster | −6,15 a +8,3 %/s (≈ 0,2 a 0,28 %/q) | 9 de 14 pôsteres |
| 25 | Deriva zero | nos pôsteres com herói grande se movendo (A1, B1, C1) | ampulheta, cérebro |
| 26 | Cascata | líder A; eco +4 q; terceiro +16/+20 q | +4; +12 a +21 |
| 27 | Ordem da rodada 1 | A, C, B | A72, C86, B87 |
| 28 | Som no corte | só o líder da rodada 2 ganha baque de papel, no bumbo; eco mudo | eco mudo |
| 29 | Camadas | C atrás de A e B; A e B não se sobrepõem | medido |
| 30 | Máscara | raio 36, overflow escondido, sombra 0 8 24 35 % | raio 17 em 512 |
| 31 | Texto durante a saída | pode ser cortado pelo avanço nos últimos quadros (de propósito) | ref corta |
| 32 | Texto em leitura | nunca encosta na margem de 32 px do cartão | regra K5 |
| 33 | Golpes de texto | um por vez no palco, ≥ 9 q entre cartões | 9 a 12 q |
| 34 | Kicker | palavra a palavra, 2 q de passo, 4 q de desfoque 6 → 0 | ref |
| 35 | Título curto | letra a letra, 1 q de passo, cai de −24 px com desfoque 8 → 0 | NOTION |
| 36 | Título longo | linha a linha subindo da máscara em 9 q | regra Kivow: nunca letra a letra em frase longa |
| 37 | Contorno | 12 q alternando contorno e cheio a cada 2 q | "Time" q0–12 |
| 38 | Etiqueta / fita | entra 18 % maior, encolhe em 14 q, varre da esquerda em 200 ms | A278 n 0,31 em 14 q |
| 39 | Em dois tempos | respiração das figuras a 12 poses/s (G1 + G2 do Caderno 02) | pele Cadernos |
| 40 | Aceite | medidor (`tests/medidor-*.md`) + QA forense (`entregas/*_qa.md`) com a régua da ref | 08 |

## 3. Fases por pôster

A folha de deixas completa (quadro a quadro, cada camada) está em `projects/cadernos-c02-trio.ts` e na tabela do [06 §5](06-FIGMA-STORYBOARD.md). Mudança em relação ao 06: o terceiro corte da rodada 2 é **q177** (bumbo da faixa), não q173 da referência.

## 4. Possibilidades consideradas

| Ideia | Decisão | Motivo |
|---|---|---|
| Wipe com máscara entre pôsteres | rejeitado | a ref não tem; o corte no pico é o mecanismo medido |
| Ênfase de 2 % no cartão ativo | rejeitado | palco medido em 0 px |
| Whoosh em cada troca | rejeitado | nenhum efeito por troca na ref; só matéria (papel) e no máximo 5 no filme |
| Inimigo animado do Caderno 02 no A0 e no C2 | entra | material aprovado, mesmo personagem, dá vida sem inventar |
| Rasgo de transição G6 entre pôsteres | rejeitado no trio | quebraria a geometria fixa do cartão; fica para o Editorial Story |
| Locução | não nesta prova | ref sem voz; o roteiro do Caderno 02 é instrumental |
