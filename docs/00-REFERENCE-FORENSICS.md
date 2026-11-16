# 00 · Forense da referência (reel_instagram.mp4)

Medido em 16/11/2026 sobre os **306 quadros** (folhas com todos os quadros, sem amostragem), com energia de diferença por painel, registro afim (ECC) quadro a quadro dentro de cada cartão, rastreio por máscara de cor e análise do áudio a 30 q/s.
Legenda de status: **OBSERVADO** (visto no quadro) · **MEDIDO** (número tirado do pixel ou do áudio) · **MODELADO** (curva ajustada, R² ao lado) · **INFERÊNCIA** (leitura nossa, sem prova) · **NÃO RESOLVIDO**.

Arquivos de prova (scratchpad da sessão): `forense/folhas/folha_01..04.jpg` (todos os quadros), `forense/tiras/troca_*.jpg` (cada troca quadro a quadro), `forense/tiras/vida_*.jpg` (vida de cada pôster, a cada 3 q), `forense/slots.json`, `forense/deriva.json`, `forense/som.png`.

## 1. Arquivo

| Campo | Valor | Status |
|---|---|---|
| Duração / quadros / fps | 10,2 s · 306 q · 30 q/s | MEDIDO |
| Resolução | 512 × 910 (9:16) | MEDIDO |
| Áudio | AAC estéreo 48 kHz, −14,2 LUFS, −1,5 dBTP, LRA 5,4 LU | MEDIDO (pacote) |
| Escala para 1080 × 1920 | × 2,109 | MEDIDO |

## 2. Palco: nada se move

| Elemento | Caixa em 512 | Caixa em 1080 | Variação no filme | Status |
|---|---|---|---|---|
| Título (2 linhas) | y 61–135 | y 129–285 | energia mediana 0,01; máx 1,5 (q29) | MEDIDO |
| Fundo | — | — | energia 0,00 em 100 % dos quadros | MEDIDO |
| Cartão A (sup. esq.) | x 34–249, y 167–547 | x 72–525, y 352–1154 | bordas fixas nos 306 q | MEDIDO |
| Cartão B (sup. dir.) | x 289–498, y 167–539 | x 610–1050, y 352–1137 | bordas fixas nos 306 q | MEDIDO |
| Cartão C (inferior) | x 158–355, y 514–861 | x 333–749, y 1084–1816 | bordas fixas nos 306 q | MEDIDO |
| Raio do canto | 17 px | 36 px | — | MEDIDO |
| Sombra do cartão | queda de 1 a 6 níveis em ~4 px | ~8 px, quase nula | — | MEDIDO |
| Ordem de camadas | C atrás de A e de B | — | o canto inferior de A aparece por cima do topo de C (q72–85, A preto) | OBSERVADO |
| Cor do fundo | #210E08 (vinho quase preto) | — | — | MEDIDO |

**Consequência:** o palco é uma vitrine imóvel. Todo movimento acontece dentro das máscaras. Isso desmente a hipótese de "ênfase de 2 % no slot ativo": não há.

## 3. As 11 trocas (corte no quadro exato)

Detectadas por salto de energia > 12 no núcleo do cartão. Quadro = primeiro quadro do pôster novo.

| Rodada | Ordem | Quadro | s | Atraso para a anterior | Bumbo no quadro? | Status |
|---|---|---|---|---|---|---|
| 1 | A | 72 | 2,40 | — | não (intro sem bumbo) | MEDIDO |
| 1 | C | 86 | 2,87 | +14 | não | MEDIDO |
| 1 | B | 87 | 2,90 | +1 | não | MEDIDO |
| 2 | A | 157 | 5,23 | (+85 desde A72) | sim, bumbo em 156 | MEDIDO |
| 2 | B | 161 | 5,37 | +4 | não (mudo) | MEDIDO |
| 2 | C | 173 | 5,77 | +12 | sim, bumbo em 174 | MEDIDO |
| 3 | A | 209 | 6,97 | (+52) | perto (206 / grade 210) | MEDIDO |
| 3 | B | 213 | 7,10 | +4 | não (mudo) | MEDIDO |
| 3 | C | 230 | 7,67 | +17 | sim, bumbo em 228 | MEDIDO |
| 4 | A | 278 | 9,27 | (+69) | sim, bumbo em 278 | MEDIDO |
| 4 | C | 282 | 9,40 | +4 | na batida (282) | MEDIDO |

**Regras tiradas daqui:**
1. **A abre toda rodada.** Sempre. Os outros entram em cascata.
2. **O segundo da cascata vem 4 q depois (133 ms)** nas rodadas 2, 3 e 4. É rápido demais para competir: lê como eco da troca de A.
3. **O terceiro vem 12 a 17 q depois de A** (400 a 570 ms), num bumbo próprio.
4. **Vida de um pôster:** 52 a 87 q (1,7 a 2,9 s); média 69 q (2,3 s).
5. Intervalo entre rodadas: 85, 52, 69 q. Não é fixo: segue a frase musical, não um metrônomo.

## 4. O que acontece numa troca (o mecanismo principal)

O pôster novo entra por **corte seco** (não há wipe nem fusão: energia sobe num único quadro). Mas o corte fica escondido no pico de um movimento. São dois lados:

### 4.1 Saída: avanço que acelera e corta no pico (8 das 11 trocas)

ECC afim no cartão, escala entre quadros consecutivos (dlns em % por quadro):

| Troca | Últimos 6 passos de escala (%/q) | Translação y no último passo (px em 512) | Avanço total | Modelo hiperbólico v = c/(tₚ−t)ⁿ | R² |
|---|---|---|---|---|---|
| C86 | +0,43 +0,59 +0,87 +1,36 +2,30 +7,19 | −8,5 | × 1,139 | n 1,59 | 0,999 |
| A157 | 0,00 +0,03 +0,30 +1,00 +2,28 +5,32 | −10,4 | × 1,093 | n 3,05 | 0,988 |
| B213 | +0,27 +0,52 +1,03 +1,75 +2,84 +5,38 | −7,9 | × 1,125 | n 2,54 | 0,989 |
| C173 | (recuo) −0,40 −0,58 −0,82 −1,22 −1,80 −2,99 | +7,8 | × 0,92 | espelho do avanço | — |
| A209 | 0,00 +0,09 +0,42 +1,13 +2,93 +12,63 | −26,6 | × 1,188 | n 3,39 | 0,999 |
| C230 | +0,41 +0,59 +0,92 +1,52 +2,75 +8,38 | −14,6 | × 1,160 | n 1,78 | 1,000 |
| A278 | 0 0 0 0 +1,05 +5,32 | −10,9 | × 1,066 | n 4,0 | 0,996 |
| C282 | +0,35 +0,56 +0,77 +1,15 +1,86 +5,20 | −27,1 | × 1,107 | n 1,44 | 0,999 |

Status: **MEDIDO + MODELADO.**
- O avanço não é uma rampa suave: a velocidade **explode** perto do corte (aceleração hiperbólica). O último quadro antes do corte concentra metade do movimento.
- **C** usa rampa longa (6 a 7 q, n 1,4 a 1,8). **A e B** usam rampa curta (3 a 5 q, n 2,5 a 4).
- Há sempre translação para cima junto do avanço: o ponto fixo da escala fica **acima do centro** do cartão.
- A exceção **C173** é o espelho: recuo (zoom out) que acelera até o corte.

### 4.2 Outras saídas (3 das 11)

| Troca | Saída | Números | Status |
|---|---|---|---|
| A72 | chicote para cima, sem escala | y: −0,8 −1,5 −5,3 −17,9 px/q (em 512) | MEDIDO |
| B87 | nenhuma: o pôster mantém a deriva até o corte | escala −0,18 %/q constante | MEDIDO |
| B161 | panorâmica para cima a velocidade constante, começa no quadro em que A troca (157) | −9 px/q por 4 q | MEDIDO |

**INFERÊNCIA:** B161 começa a se mover no exato quadro do corte de A157. A troca de um cartão "dá o empurrão" no vizinho.

### 4.3 Entrada: o objeto chega com velocidade e assenta

O pôster novo já nasce com o objeto principal em movimento, desacelerando. Rastreio por máscara de cor:

| Pôster | Objeto | Primeiros passos (px/q em 512) | Modelo | Assentamento | Status |
|---|---|---|---|---|---|
| A72 | ampulheta caindo e girando no lugar | y: −46 −17 −12 −8 −2, depois +4 (passa e volta) | mola ζ 0,81, ω₀ 0,70 rad/q (R² 0,975) | ~8 q | MEDIDO + MODELADO |
| C173 | borboleta puxando o fio | x: +9,0 +3,8 +3,6 +2,7 +1,9 +1,4 … | potência u^0,26, 24 q (R² 0,999) | ~24 q | MEDIDO + MODELADO |
| C173 | pedra presa no fio | x: +2,7 +1,7 +1,5 +1,0 … | potência u^0,59, 55 q (R² 0,993) | contínua | MEDIDO + MODELADO |
| A278 | etiqueta laranja encolhendo até o tamanho final | borda: +5 +2 +1 +1 +1 … | potência u^0,31, 14 q (R² 0,992) | ~14 q | MEDIDO + MODELADO |
| A209 | peças do quebra-cabeça se aproximando | 5 → 2 px/q | suave (smoothstep) 20 q (R² 0,984) | ~20 q | MEDIDO + MODELADO |
| B161 | estrelas deslizando com rastro | 1,7 → 0,3 px/q | potência u^0,83 (R² 0,975) | ~8 q | MEDIDO |

**Família de curvas da entrada:** saída de corte em potência **u^n com n 0,26 a 0,31** para o objeto principal (nasce rápido, assenta devagar, sem overshoot). Mola subamortecida só no objeto "pesado" que cai (ampulheta, ζ 0,81). Isso é a primitiva `potencia` da skill (n 0,29 a 0,38) e confirma o par **pulso hiperbólico na saída + potência na entrada**.

## 5. Vida interna de um pôster

### 5.1 Deriva (a câmera nunca para)

Escala mediana por quadro no miolo da vida de cada pôster (exclui 8 q iniciais e 8 finais):

| Pôster | Deriva | Pôster | Deriva |
|---|---|---|---|
| A0 Time | −0,205 %/q (recua) | B0 Tools | +0,277 %/q (avança) |
| A1 ampulheta | 0 | B1 arquitetura | 0 |
| A2 busto | −0,092 %/q | B2 estrelas | +0,051 %/q |
| A3 quebra-cabeça | −0,187 %/q | B3 multidão | −0,073 %/q |
| A4 interrogação | −0,217 %/q | C0 feixe | −0,013 %/q |
| C2 borboleta | −0,267 %/q | C3 encruzilhada | −0,235 %/q |
| C4 texto final | +0,179 %/q | C1 cérebro | 0 |

Status: **MEDIDO.** 9 de 14 pôsteres têm deriva de 0,1 a 0,28 %/q (3 a 8 %/s), quase sempre **recuo**. Os que ficam em 0 são os que têm objeto grande se movendo dentro (ampulheta, cérebro que se parte). Regra: **ou a câmera deriva, ou o objeto se move; nunca os dois parados.**

### 5.2 Gramática interna (lida nas tiras de vida, quadro a quadro)

| Evento | Como é | Duração medida | Exemplos | Status |
|---|---|---|---|---|
| Chegada do herói | objeto entra cortado pela borda, com rastro (motion blur) no 1º quadro | 8 a 24 q | ampulheta, estrelas, borboleta, peças | OBSERVADO + MEDIDO |
| Chapéu / kicker | palavra a palavra, cada uma com desfoque → nítido e leve subida | 2 q entre palavras, 4 q até nítida | "your day finally in one", "Sit right next" | OBSERVADO |
| Título grande | letra a letra, cada letra cai de cima com desfoque vertical | 1 letra por quadro (NOT → NOTIO → NOTION em 3 q) | FRAME, NOTION, CHAOS | OBSERVADO |
| Título com contorno | letras alternam contorno ↔ cheio por ~12 q antes de firmar | q0–q12 | "Time" | OBSERVADO |
| Etiqueta de destaque | barra de cor entra grande, varre da esquerda e encolhe até o tamanho final; o texto escreve por dentro | 14 q (u^0,31) | "Relentless", "Rich or Poor", "Which one are you?" | MEDIDO |
| Fio / conector | linha fina desenha de um ponto a outro | 6 a 10 q | quebra-cabeça (L), busto (curva), borboleta | OBSERVADO |
| Faixa escura | faixa vertical desce do topo e para | ~12 q | B0, B1 | OBSERVADO |
| Saída do título | letras esticam na vertical (rastro) no último quadro | 1 q | NOTION em q281 | OBSERVADO |

### 5.3 Ordem dentro de cada pôster (molde de 70 q)

| Fase | Quadros após o corte | O que entra |
|---|---|---|
| Chegada | 0–12 | herói com velocidade, assentando |
| Contexto | 3–18 | chapéu palavra a palavra |
| Respiro | ~18–30 | só deriva |
| Golpe | 30–55 | título grande letra a letra, ou etiqueta |
| Segura | ≥ 15 q | leitura, só deriva |
| Saída | últimos 3 a 7 | avanço hiperbólico até o corte |

**Revezamento entre cartões:** no começo do filme, A firma "Silent" em q18–21, B escreve TOOLS em q30–36, A abre a etiqueta em q39–42, C escreve FRAME em q51–57, B escreve CHAOS em q54–63. Os golpes de texto se revezam com 9 a 12 q de distância: **um golpe por vez no palco.** (MEDIDO nas tiras.)

## 6. Som × imagem

| Item | Valor | Status |
|---|---|---|
| Andamento | 100 BPM (batida = 18 q; meio compasso = 36 q) | MEDIDO (autocorrelação e ataques) |
| Padrão do bumbo | 3-3-2 em semicolcheias (13,5 + 13,5 + 9 q) | MEDIDO (ataques em 120, 134, 147, 156, 165, 174…) |
| Intro | 0–112 q sem grave; só marcação leve (ataques fracos a cada 9 q) | MEDIDO (grave < 150 Hz sobe de ~5 para ~38 dB em q112) |
| Entrada do grave (drop) | q112 (3,73 s) | MEDIDO |
| Trocas que caem em bumbo | 6 de 11 (A157, C173, A209≈, C230, A278, C282) | MEDIDO |
| Trocas mudas | o 2º da cascata (B161, B213) e a rodada 1 inteira (intro) | MEDIDO |
| Efeito sonoro próprio por troca | nenhum detectável separado da música | INFERÊNCIA (o fluxo nos cortes é o do bumbo) |

**Regra de som:** a música faz o trabalho. O corte do líder da rodada cai no bumbo; o eco (4 q depois) fica mudo. Nada de whoosh por troca.

## 7. O que NÃO dá para recuperar

| Item | Motivo |
|---|---|
| Curvas Bézier exatas do autor | o MP4 só mostra amostras a 30 q/s; temos os modelos com R² |
| Assets e fontes originais | não temos o projeto; o motor usa material próprio |
| Stems de som | áudio já mixado |
| Desfoque de movimento exato | existe no 1º quadro de entrada e no último de saída; intensidade aproximada pelo rastro (~1/3 do deslocamento) |

## 8. Diferenças em relação ao que o PRD do pacote dizia

| PRD | Medido | Efeito no motor |
|---|---|---|
| "troca é corte ou wipe de 250–450 ms" | corte seco escondido no pico de avanço hiperbólico (3–7 q) | preset principal = `PulsoSaida` + `Corte` + `ChegadaPotencia` |
| "ênfase opcional de 2 % no slot ativo" | palco imóvel, 0 px | proibido mexer no cartão |
| "AttentionPass 350–800 ms" | eco de 4 q + terceiro a 12–17 q | cascata com 2 atrasos fixos |
| "deriva ≤ 4 px/s" | deriva de escala 3 a 8 %/s dentro do cartão | deriva por pôster, não no palco |
| tempos de troca 2,87–2,90 "B e C" | C86 antes de B87 | ordem da rodada 1 é A, C, B |
