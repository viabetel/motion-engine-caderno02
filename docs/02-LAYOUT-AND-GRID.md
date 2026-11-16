# 02 · Layout e grade

## 1. Trio Showcase em 1080 × 1920 (medido na ref × 2,109)

| Peça | x | y | largura × altura | z |
|---|---|---|---|---|
| Título (kicker itálico + título) | 180–790 | 129–285 | 610 × 156 | 4 |
| Cartão A | 72 | 352 | 453 × 802 | 2 |
| Cartão B | 610 | 352 | 441 × 785 | 3 |
| Cartão C | 333 | 1084 | 416 × 732 | 1 (atrás de A e B) |
| Raio do canto | — | — | 36 px | — |

Relações que se preservam em qualquer pele:
- A e B começam na mesma linha (y 352). A é 12 px mais largo e 17 px mais alto que B.
- C fica centrado entre A e B (centro em x 541, a 1 px do centro da tela) e sobe 70 px por baixo de A e 53 px por baixo de B.
- Vão entre A e B: 85 px. Margem esquerda de A: 72 px. Margem direita de B: 30 px. A assimetria é da ref e fica.

## 2. Área segura do Reels

Fora os 220 px do topo, os 420 de baixo e os 140 da direita (regra já usada no Caderno 02).
- Título do palco: y 129–285. Fica sobre a faixa do topo como na ref, que também ocupa essa faixa. Só o rótulo "Reels" do Instagram passa ali; o título é decorativo e lê inteiro.
- **Texto essencial dentro de C** fica acima de y 1500 (C vai até 1816; os últimos 316 px de C só levam imagem).
- **Texto essencial dentro de B** fica à esquerda de x 940.

## 3. Grade interna dos pôsteres

Cada pôster é desenhado no tamanho exato do seu cartão e com margem interna de 32 px. Regra de composição (lida nos 14 pôsteres da ref):
- herói ocupa 35 a 60 % da área do cartão e pode sair pela borda (a máscara corta);
- texto P1 entre 1/4 e 1/2 da altura do cartão;
- um único acento de cor por pôster.

## 4. Outros modos (mesmo motor, outra geometria)

| Modo | Geometria |
|---|---|
| `editorial-story` | página cheia 1080 × 1920 (ou 1080 × 1350 no feed); papel rasgado entre páginas |
| `hybrid-explainer` | trio + `HeroExpand`: um cartão cresce até 1016 × 1500 centrado para leitura e volta ao slot; os outros dois recuam com a mesma curva |

O trio em 4:5 (1080 × 1350) não é escala do 9:16: recalcula A/B em cima e C embaixo com a mesma proporção de vão; fica para depois da prova.
