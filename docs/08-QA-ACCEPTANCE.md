# 08 · QA e aceite

Build e `tsc` aprovados não provam nada. A prova é o vídeo, a folha de contato e a mesma régua da ref aplicada no nosso MP4.

## 1. Critérios medidos (nosso × ref)

| # | Critério | Como medir | Meta | Ref |
|---|---|---|---|---|
| 1 | Palco imóvel | energia no fundo e no título por quadro | ≤ 0,5 | 0,00 / 0,01 |
| 2 | Bordas dos cartões fixas | detecção de borda nas linhas y 300 / 750 (escala 512) | variação 0 px | 0 px |
| 3 | Cortes no quadro do cue sheet | salto de energia > 12 no núcleo do cartão | 100 % dos cortes no quadro previsto ±0 | 11 cortes |
| 4 | Cascata | atrasos líder → eco → terceiro | 4 q / 12–17 q | 4 / 12–17 |
| 5 | Pulso de saída | ECC escala por quadro nos 7 q antes do corte; ajuste hiperbólico | n e avanço total dentro de ±15 % do preset | tabela 00 §4.1 |
| 6 | Chegada | rastreio do herói; ajuste de potência | n 0,22–0,36; R² ≥ 0,98 | 0,26–0,31 |
| 7 | Deriva | escala mediana no miolo de cada pôster | |d| 0,1–0,28 %/q ou herói em movimento | 9 de 14 |
| 8 | Um golpe P1 por vez | log dos eventos de texto | distância ≥ 9 q | 9–12 q |
| 9 | Líder no bumbo | corte × ataque mais próximo | ≤ 2 q | 6 de 11 |
| 10 | Máscara | pixel fora da máscara arredondada | 0 | 0 |
| 11 | Área segura | caixa de todo texto essencial | dentro da área (02 §2) | — |
| 12 | Determinismo | still q175 × render q175 | diferença 0 | — |
| 13 | Som | LUFS / true peak | −14 ±1 / ≤ −1,0 dBTP | −14,2 / −1,5 |
| 14 | Generalização | 3 assuntos com o mesmo código | diff de código entre os 3 = 0 linhas | — |

## 2. Inspeção humana obrigatória

- Folha de contato do filme inteiro a 2 q/s (640 px de largura) lida inteira: texto tocando borda, quebra de linha inesperada, peça cortando texto, flash entre pôsteres.
- Cada troca vista quadro a quadro (q−3 a q+8), ao lado da troca equivalente da ref.
- Prévia no tamanho de celular (360 × 640).
- Dump dos textos pequenos (< 20 px) para garantir que nada de rascunho, crédito ou referência de pesquisa ficou na arte.

## 3. Reprovação automática

Qualquer critério 1–4, 10, 11 ou 12 fora da meta reprova o render antes de ele sair do Actions.

## 4. Erros já pagos no Kivow que valem aqui (regra geral na skill `motion-medido-remotion` §0b)

| # | Regra | Como se aplica no trio |
|---|---|---|
| K1 | Estado, não print rolando | cada pôster é feito de camadas com eventos próprios (chegada, kicker, título, fita); nunca uma imagem do pôster com zoom |
| K2 | Nada começa nem para seco | chegada em potência (velocidade cai até zero), deriva contínua; o único movimento que "para" é o corte, e ele vem no pico de propósito |
| K3 | Pausa só com motivo, ≤ 1,5 s | nenhum cartão fica com diferença média < 0,15 por mais de 1,5 s; a deriva garante isso |
| K4 | Deriva em px/s | no `showcase-fast` vale a deriva medida na ref (borda do cartão a ~14 px/s), exceção escrita; com voz ou leitura longa, ≤ 6 px/s |
| K5 | Zoom não corta o que está sendo lido | o avanço de saída corta texto de propósito só nos últimos 3 a 7 q antes do corte (como a ref); em estado de leitura nada encosta na margem de 32 px do cartão |
| K6 | Leitura medida | OCR a 360 × 640 nos quadros de leitura: títulos e fita ESTÁ ESCRITO têm de ser lidos; chapéus são P3 |
| K7 | Uma camada por elemento | composição mestre única, sem `Sequence` montando imagem; cada pôster existe uma vez e só fica visível na sua janela |
| K8 | Prévias de risco antes do filme | P1 = rodada 1 (q60 a q100), P2 = rodada 2 (q145 a q209), cada uma com "passa se" e folha de contato |
| K9 | Render na nuvem e entrega imediata | MP4 na raiz de Downloads assim que sair; QA na mensagem seguinte |
| K10 | Auditar todos os itens do quadro | a folha de contato é lida inteira: recorte, sobreposição, fantasma, número e texto iguais ao Figma |
