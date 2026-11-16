# 01 · Direção de arte: tokens, peles e regra de assunto

O motor separa **gramática** (tempo, cascata, saída, entrada, deriva, som) de **pele** (cor, fonte, textura, tipo de imagem). A gramática vem medida da referência ([00](00-REFERENCE-FORENSICS.md)). A pele vem da marca de cada assunto. Nada da pele da referência (vinho, laranja, ampulheta, busto) entra no motor.

## 1. Tokens que toda pele precisa preencher

| Token | Papel | Cadernos do Caminho (1ª prova) |
|---|---|---|
| `stage.bg` | fundo do palco | carvão #1F1E1C |
| `stage.grain` | textura sobre o palco | grão MULTIPLY 0,55 (assets/grao.png) |
| `card.radius` | raio do cartão em 1080 | 36 px (medido na ref) |
| `card.shadow` | sombra do cartão | 0 8 24 rgba(0,0,0,0.35) (quase nula, como a ref) |
| `surface.light` | fundo claro de pôster | papel #EEE9DF |
| `surface.dark` | fundo escuro de pôster | carvão #262522 |
| `surface.accent` | fundo de cor de pôster | vermelho #C0301A |
| `ink.primary` / `ink.inverse` | texto | carvão #1F1E1C / papel #EEE9DF |
| `accent` | etiqueta, fio, marca | vermelho #C0301A |
| `fiber` | margem do papel rasgado | #F4F0E7 |
| `type.display` | título grande | League Gothic (caixa alta, como a série) |
| `type.serif` | citação, kicker | Instrument Serif Italic |
| `type.body` | corpo | DM Sans |
| `type.label` | chapéu, etiqueta | IBM Plex Mono, espaçamento 14 % |
| `header.kicker` / `header.title` | título fixo do palco | "Três ofertas." / "A MESMA RESPOSTA" |
| `signature` | assinatura | selo CC + @nicacio.web |
| `imagery` | tipo de imagem | pintura e gravura antiga em papel rasgado, recortes de figura, silhuetas pretas |

Peles seguintes (preencher na hora, mesmos campos): **Yamplink** (azul/petróleo, símbolo, fontes da marca) e **Kivow** (paleta e iconografia do K). Uma pele nova é um arquivo de dados, não código.

## 2. Equivalência pele × gramática (o que a ref faz e como cada pele responde)

| Recurso da ref | Função na gramática | Cadernos |
|---|---|---|
| fundo vinho quase preto | palco que some | carvão com grão |
| cartões creme, bege e um preto | no máximo 1 cartão escuro por estado (ref: só A1 é preto) | papel na maioria; carvão no máximo em 1 cartão por estado (A1) |
| objeto metafórico 3D (ampulheta, busto, borboleta) | herói que chega com velocidade | figura recortada de pintura (Kramskoi, Tissot, Duccio) ou silhueta (Doré) |
| laranja saturado | um acento por pôster | vermelho #C0301A |
| serifada de alto contraste + itálico | título e kicker | League Gothic + Instrument Serif Italic |
| etiqueta laranja com texto | destaque que encolhe ao tamanho final | fita vermelha com IBM Plex Mono em papel ("ESTÁ ESCRITO") |
| grade de pontos, código de barras | textura gráfica de fundo | papel rasgado, fibra, fita adesiva |

## 3. Regra para aceitar um assunto novo

Antes de desenhar, preencher (o motor não inventa fato nem citação):

1. **Tese em uma frase** e 3 ângulos de conteúdo, um escolhido com motivo.
2. **Público e o que deve sentir.**
3. **Três frentes** que cabem nos cartões A, B e C (o trio precisa de um "três" natural no assunto).
4. **Rodadas:** o que muda em cada troca (setup → conflito → resposta é o molde mais forte).
5. **Fontes:** citação com referência exata; imagem com origem e licença (créditos vão na legenda do post, nunca na arte).
6. **Modo de velocidade:** `showcase-fast` (8–15 s), `social-story` (15–30 s) ou `explainer` (25–60 s).

### Aplicado à 1ª prova (Cadernos do Caminho, Caderno 02)

- **Tese (já aprovada no roteiro do Caderno 02):** TRÊS OFERTAS. A MESMA RESPOSTA. (Mateus 4:1–11, Almeida Revista e Corrigida.)
- **Ângulos considerados:** (a) teaser da série com 9 encontros de Jesus; (b) o chamado de Mateus em três pontos de vista; (c) **as três tentações**. **Escolhido (c)** porque o texto já tem um três exato (pão, pináculo, reinos), a resposta se repete três vezes ("Está escrito"), o que dá ao trio um refrão visual, e os recortes já existem e foram aprovados no Caderno 02.
- **Público:** quem segue @nicacio.web; deve sentir a cena (fome, oferta, firmeza), não ler um sermão.
- **Rodadas:** setup (deserto, 40 dias, fome) → as três ofertas → a mesma resposta.
- **Modo:** `showcase-fast` na prova de 7 s. O filme inteiro do Caderno 02 usa o modo `social-story`.

## 4. Regras de texto na tela

| Prioridade | Uso | Tamanho em 1080 | Regra |
|---|---|---|---|
| P1 | título do pôster | League Gothic 120–190 px | um golpe por vez no palco |
| P2 | citação curta / kicker | Instrument Serif 40–52 px | no máximo um cartão com frase essencial longa por vez |
| P3 | chapéu | IBM Plex Mono 20–24 px | referência curta junto da citação (MT 4:3) |
| — | proibido na arte | — | crédito de obra, licença, nota de pesquisa, travessão, símbolo decorativo |

Leitura mínima no modo narrativo: 2,2 s para cada 10 palavras, contados depois da última palavra entrar. No `showcase-fast` o essencial é o refrão (2 palavras); as citações são P2.
