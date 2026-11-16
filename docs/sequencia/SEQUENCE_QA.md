# SEQUENCE_QA · critérios de aceite da sequência

Versão de máquina: `SEQUENCE_QA.json`. Nada é aprovado sem MP4 e evidência visual e sonora. As métricas do trio (bordas fixas, cartões) **não** valem aqui.

| # | Área | Critério | Como medir | Meta | Evidência |
|---|---|---|---|---|---|
| S1 | Formato | composição `CadernosC02Sequencia` registrada, 1080 × 1350, fps constante | `remotion compositions` + ffprobe | 30 q/s, 4:5 | log |
| S2 | Formato | duração derivada da voz e da leitura | quadros do filme × régua do roteiro | sem gatilho `estimado: true` no render final | medidor |
| S3 | Encadeamento | 8 arestas com estados de entrada, meio e saída aprovados no Figma | lista de nós no `FIGMA_TO_REMOTION_MAP.md` | 8/8, ≥ 4 poses cada | Figma |
| S4 | Encadeamento | nenhuma cena repetida ou faltando | ordem dos nós do `SceneGraph` × quadros | 1→2→3→3b→4→4b→5→5b→6 | medidor |
| S5 | Identidade espacial | câmera e âncora sem salto no quadro de troca | posição da âncora em q−12…q+12 de cada aresta (rastreio) | desvio < 2 px nas arestas com mesmo asset (B1, B3, B5, B7); corte escondido documentado nas outras | gráfico + folha q−12…q+12 |
| S6 | Enquadramento | nenhuma palavra ou elemento essencial cortado | caixas do texto × quadro, todos os quadros de leitura | margem ≥ 64 px (feed) | medidor + folha |
| S7 | Enquadramento | sem preto acidental, flash, fantasma, recorte aparecendo de repente, luz mudando de golpe | luminância média por quadro; diferença entre quadros fora das arestas | salto de luminância < 6 % fora de corte documentado; 0 quadros pretos | `qa_sequencia.py` |
| S8 | Movimento | posição, velocidade e aceleração por quadro nas 8 arestas | rastreio da âncora + ECC global, gráfico por aresta | picos no lugar previsto ±2 q; nenhuma parada seca sem intenção | gráficos |
| S9 | Movimento | rastro só na direção do movimento e só acima de 25 px/q; texto parado nítido | Laplaciano no texto em repouso; direção do rastro | 0 texto em repouso borrado | recortes |
| S10 | Peso | pedra pesada (B2), papel leve (B3, B8), passagem de câmera (B4, B6) com sombra e amortecimento | curva de assentamento por objeto | pedra: overshoot ≤ 1 %; papel: assenta ≤ 14 q; câmera: chega a 0 px/q | gráficos |
| S11 | Leitura | 360 × 450 | prévias reduzidas + OCR auxiliar + revisão humana | títulos ≥ 0,9 s parados depois de montados; frases 2,2 s / 10 palavras | folha 360 |
| S12 | Voz | gatilhos ≤ 0,15 s depois da palavra; passagem não cobre palavra-chave; nenhuma palavra cortada | `voz_palavras.json` × eventos | 100 % dos gatilhos | tabela |
| S13 | Áudio | −14 ± 1 LUFS, pico real ≤ −1 dBTP, sem clipping, mono ≤ 1,5 LU de perda | ebur128 + astats no MP4 | metas | relatório |
| S14 | Áudio | inteligibilidade (indício) | STOI voz × mix; simulação celular 300 Hz–7 kHz | ≥ 0,85 / ≥ 0,80 | relatório |
| S15 | Determinismo | quadro isolado = quadro no filme | still q × render em pedaço q | diferença 0 | log |
| S16 | Reutilização | um segundo tema com a mesma arquitetura | outro projeto `editorial-story` só com dados, arte e presets | diff de componentes = 0 | repositório |
