# 03 · Gramática de movimento

Todos os números ao lado têm o valor da referência entre parênteses. Velocidades em px escalam com o tamanho (512 → 1080: × 2,109). **Tempo, n e ζ não escalam.**

## 1. Relógios

- Um relógio global em ms. Cada cartão tem a sua trilha de eventos (`SlotTrack`). O estado de cada cartão é função pura do tempo absoluto: `estado(slot, t)`.
- Evento em ms vira quadro uma única vez: `q = Math.round(ms * fps / 1000)`. Nunca somar quadros em cadeia.
- Qualquer quadro renderiza sozinho igual ao filme inteiro (render em pedaços e paralelo).

## 2. Máquina de estados por cartão

`ASSENTADO → SAINDO (pulso) → [corte] → CHEGANDO → ASSENTADO`

| Campo | Significado |
|---|---|
| `posterId` | pôster visível |
| `fase` | assentado, saindo, chegando |
| `uSaida` | 0→1 no pulso de saída |
| `uChegada` | 0→1 na chegada |
| `deriva` | escala acumulada da câmera do pôster |

Só existe um pôster por cartão em qualquer quadro (corte seco). Não há dois pôsteres sobrepostos, nem fusão.

## 3. Rodada e cascata

| Regra | Valor (ref) |
|---|---|
| Líder | sempre A |
| Eco | 4 q depois do líder (4 q nas rodadas 2–4; 1 q na rodada 1) |
| Terceiro | 12 a 17 q depois do líder (12, 17; 14 na rodada 1) |
| Corte do líder | no bumbo (6 de 11 trocas no bumbo) |
| Eco | mudo |
| Vida mínima de um pôster | 52 q (1,7 s) |

Na rodada 1 da ref a ordem é A, C, B. Nas outras, A, B, C. O motor aceita a ordem por rodada.

## 4. Presets medidos

### 4.1 `PulsoSaida` (avanço que acelera até o corte)

Escala por quadro antes do corte: `dln s(q) = c / (tₚ − q)ⁿ`, com `q` contado em quadros até o corte (q = −1 é o último quadro do pôster que sai).

| Variante | Rampa | n | Avanço total | Translação y no último quadro (1080) | Uso |
|---|---|---|---|---|---|
| `curta` | 3–5 q | 2,5–4,0 (A157 3,05; B213 2,54; A209 3,39) | × 1,07 a × 1,19 | −17 a −56 px | A e B |
| `longa` | 6–7 q | 1,4–1,8 (C86 1,59; C230 1,78; C282 1,44) | × 1,11 a × 1,16 | −18 a −57 px | C |
| `recuo` | 6 q | espelho de `longa` | × 0,92 | +16 px | 1 em cada 4 trocas de C |
| `chicote` | 4 q | translação pura | — | −1,7 −3,2 −11 −38 px/q | 1 troca de A |

O ponto fixo da escala fica a 30 % da altura do cartão (o avanço puxa para cima). Rastro de movimento no último quadro: desfoque direcional de 1/3 do deslocamento daquele quadro.

### 4.2 `Corte`

Troca de `posterId` no quadro exato. Sem fusão.

### 4.3 `ChegadaPotencia` (o herói entra andando e assenta)

Forma medida (potência sobre o tempo, nasce rápida e assenta devagar, sem overshoot):
`p(t) = p₀ + (p₁ − p₀) · (t / D)ⁿ` com **n 0,26–0,31** e **D 14–24 q** (borboleta 0,26 / 24 q; etiqueta 0,31 / 14 q).
Primeiro quadro com rastro (o objeto já estava em movimento antes do corte).

### 4.4 `ChegadaQueda` (objeto pesado que cai e assenta)

Mola subamortecida **ζ 0,81, ω₀ 0,70 rad/q** (ampulheta; overshoot de ~4 px em 512 → ~8 px em 1080). Em Remotion, a 30 q/s: `{mass: 1, stiffness: 1739, damping: 67,4}` (conversão da skill `remotion_spring(0,695, 0,81)`).

### 4.5 `Deriva`

Escala contínua 0,1 a 0,28 %/q, recuando na maioria (9 de 14 pôsteres). Regra: se o pôster tem objeto grande se movendo, deriva 0.

### 4.6 Texto

| Preset | Medida (ref) |
|---|---|
| `KickerPalavra` | palavra a palavra, 2 q entre palavras, cada uma 4 q de desfoque 6→0 px e y +10→0 |
| `TituloLetra` | 1 letra por quadro, cada letra cai de −24 px com desfoque vertical 8→0 px em 4 q |
| `TituloContorno` | 12 q alternando contorno e cheio a cada 2 q, firma cheio |
| `Etiqueta` | barra entra 18 % maior e encolhe por `ChegadaPotencia` (n 0,31, 14 q); texto por dentro letra a letra a 1 letra/q |
| `Fio` | linha de 2 px desenha de ponta a ponta em 6–10 q, cúbica de saída |
| `SaidaEsticada` | último quadro do título: escala y 1,25 com desfoque vertical 10 px |

## 5. Regra anti-ruído

- Um golpe de texto P1 por vez no palco; golpes vizinhos com ≥ 9 q de distância (ref: 9–12 q).
- No máximo uma troca de líder a cada 52 q.
- Câmera do palco imóvel (0 px, medido). Movimento só dentro dos cartões.

## 6. Gramática da pele Cadernos (soma, não substitui)

Os recursos do Caderno 02 que encaixam na gramática do trio:
- **Em dois tempos (G1):** recortes de pintura mudam de pose a cada 2 q; câmera, texto e deriva andam a cada quadro.
- **Respiração (G2):** figura gira ±0,6° a 1,6° num pino na base, período 56–72 q. Substitui a deriva quando o pôster tem figura.
- **Fervura de borda (G3):** borda rasgada treme (semente troca a cada 4 q).
- **Fita (T3):** a etiqueta da ref vira a fita vermelha "ESTÁ ESCRITO" com IBM Plex Mono.

## 7. Tempo: uma régua só, com espaço para narração (método do Kivow V9.2)

O que o motion da Kivow (Semana nova V9.2) ensinou e que vale para todo projeto do motor:

1. **Fonte única de tempo.** Cada projeto tem um `tempos.ts` (e a leitura humana dele, `CUE_SHEET.md`). Imagem e som leem dali. Nada de quadro solto escrito no componente.
2. **A grade sai da faixa medida, não do rótulo.** BPM, entrada da batida 0 e drops vêm da medição (`audio_grade.py` / grade.json). Na Kivow o arquivo dizia 125 e a faixa media 124,00. Batida n = ENTRADA + n × PERÍODO, em segundos; vira quadro uma vez só.
3. **A voz manda na imagem.** Locução gravada como uma tomada contínua. Tempo de cada palavra medido (STT do ElevenLabs → `voz_palavras.json`). Cada estado visual entra no máximo 0,15 s depois da palavra que o nomeia. Gatilhos por palavra (`P.palavra`), nunca por quadro chutado.
4. **Respiro em compasso inteiro.** Quando um texto precisa ser lido e a voz não deixa, insere-se um respiro de exatamente 1 compasso no silêncio entre frases (corte da voz medido em silêncio). Tudo depois mantém a relação com a batida. Duas réguas: `noRoteiro(f)` (coreografia escrita) e `noFilme(t)` (depois dos respiros).
5. **Leitura parada medida.** Legenda ≥ 0,6 s parada; frase de leitura 2,2 s por 10 palavras depois da última palavra entrar; CTA final com tudo montado ≥ 3 s. Prova por OCR a 360 px.
6. **Deriva em px por segundo** nos modos com leitura (`social-story`, `explainer`): no máximo 6 px/s de translação e 0,8 %/s de escala, sem tirar o essencial da margem segura. O `showcase-fast` usa a deriva medida na ref (3 a 8 %/s) porque não tem leitura longa.

| Modo | Régua de tempo | Voz | Deriva |
|---|---|---|---|
| `showcase-fast` (prova de 7 s) | grade da música | não | ref: 0,1 a 0,28 %/q |
| `social-story` | grade da música + respiros | opcional, manda quando existe | ≤ 0,8 %/s |
| `explainer` | voz primeiro, música encaixada nela | sim | ≤ 0,8 %/s, pausa de leitura explícita |

No trio com voz, a cascata A → B → C continua, mas o corte do líder vai para a palavra que nomeia o novo pôster (ou para o bumbo mais próximo dela, ±2 q), e o eco espera a voz respirar.
