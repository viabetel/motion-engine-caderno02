# AUDIOVISUAL_DIRECTION · Caderno 02 em sequência

**Tese visual:** um único percurso de câmera pelo deserto no crepúsculo. Cada ambiente se transforma no próximo por movimento, profundidade, oclusão e objeto compartilhado. Nunca nove telas com zoom, nunca três cartões.

## 1. Mundo e câmera

- `WorldStage` com 7 planos e ordem fixa: `background` (céu) · `midground` (terra, cristas, arquitetura distante) · `subject` (Jesus, tentador, torre) · `foreground` (pedras próximas, beirais) · `paper` (peças rasgadas, fita) · `type` · `fx` (poeira, calor, luz, grão).
- `PersistentCameraRig`: escala, âncora e foco em coordenadas de mundo, avaliados por quadro. A câmera nunca reseta: na troca de cena, o estado de saída da aresta é o estado de entrada da cena seguinte (posição e velocidade contínuas, salvo corte escondido documentado).
- Parallax pela profundidade (fatores no `TRANSITION_GRAPH.md`); inclinação no máximo 4°; deriva ≤ 6 px/s e ≤ 0,8 %/s nas cenas com leitura.

## 2. Biblioteca de recursos (escolhidos por cena, nunca todos)

| Recurso | Onde entra | Por quê |
|---|---|---|
| MatchedDive | B1 | mesmo asset nas duas cenas: casamento real |
| AnchorMatch | B2, B4 | troca de pintura com âncora composicional e oclusão |
| StoneFollow | B2 | a pedra conduz o olhar e tem peso |
| VerticalVertigo | B4, B5 | a subida e o olhar para baixo |
| CameraOrbitLite | — | reservado (não cabe nesta história) |
| DepthParallax | todas as cenas | profundidade pelos planos |
| PaperPeel | B7, B8 | o papel do tentador se soltando |
| TornPaperReveal | B8 | o rasgo revela o deserto |
| InkTrace | P3, B3 | o círculo à mão e o traço que vira fita |
| RibbonSharedElement | P3b, P4b, P5b | o refrão ESTÁ ESCRITO |
| WorldUnfold | B6 | os reinos em pop-up |
| LensBreath | P3b, P4b | a câmera respira (recua 3 %) quando a resposta entra |
| AtmosphericDust | B2, P1 | poeira que demora a assentar |
| HeatHaze | P1, P6 | calor no horizonte (G10 do Caderno 02) |
| LocalizedDepthOfField | B1, P2 | foco nas mãos, fundo desfocado |
| TemporalDirectionalBlur | B1 (pedras), B2, B4, B8 | rastro na direção do vetor, só acima de 25 px/q |
| ImpactSettle | B2 (pedra) | peso que assenta sem borracha (ζ 0,9) |
| SoftFloat | B8 (papel caindo), fita | leveza com arrasto |
| TypographyMassReveal | P2 (40), títulos | tipografia com massa |
| QuoteBreath | respostas | citação entra mais leve que a oferta |
| BackgroundOcclusion | B1, B2, B6 | esconder a troca de fundo |
| FocusPull | B1 → P2 | o foco puxa para as mãos |
| SceneToSceneAudioBridge | todas as arestas | J-cut / L-cut com intenção |

## 3. Materiais (`MotionMaterialSystem`)

| Material | Massa percebida | Curva | Assentamento | Sombra |
|---|---|---|---|---|
| Pedra | alta | mola ζ 0,9, ω0 0,45 rad/q | sem overshoot visível (≤ 1 %) | de contato, curta e escura, encolhe ao pousar |
| Papel / fita | baixa | chegada m 5,5 + amassado de 4 % no pouso; caindo: gravidade 2,2 px/q² com arrasto 0,02 e flexão ≤ 6° | rápido (≤ 14 q) | difusa, distância cresce com a altura |
| Tecido (manto) | média | deslocamento ≤ 7 px na metade de baixo, ruído 1,4 px/q | contínuo | — |
| Poeira / ar | muito baixa | sobe rápido, desce em 1,2 s, partículas com semente fixa | lento | — |
| Tipografia da oferta | média-alta | linhas sobem da máscara em 9 q, mola TIPO (ζ 0,77) | firme | — |
| Tipografia da resposta | leve | palavra a palavra, desfoque 6 → 0 em 4 q | suave | — |
| Luz | — | multiplicar do crepúsculo varia ≤ 0,1 por cena; nada de flash | — | — |

## 4. Luz e unidade das obras

Kramskoi, Tissot e Duccio passam pelo mesmo tratamento do crepúsculo da P1 (multiplicar quente do topo para a base, 0,22 a 0,42; temperatura e contraste igualados por cena). Não deformar rostos, não animar corpos nem inventar o que as obras não mostram.

## 5. Tipografia

League Gothic (títulos), Instrument Serif Italic (citações), IBM Plex Mono (chapéus, 14 % de espaçamento). Texto entra e sai com a cena; nunca fica como placa.
