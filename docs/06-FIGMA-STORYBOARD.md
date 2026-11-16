# 06 · Storyboard no Figma (antes de qualquer código)

**Arquivo:** Cadernos do Caminho `qSQa66nPKuVvDZxqHJ3BCr`, página nova **"Motion · Trio (prova)"**. Nada das páginas existentes é editado.

## 1. O que a página tem

| Quadro | Conteúdo |
|---|---|
| 0 · Palco | 1080 × 1920 com fundo, título fixo, assinatura e os três cartões vazios nas caixas medidas (02-LAYOUT) |
| 1 · Pôsteres | os 9 pôsteres, cada um no tamanho exato do seu cartão, em camadas editáveis (texto vivo, recortes como imagem, peças rasgadas) |
| 2 · Estados do palco | 3 quadros 1080 × 1920: q60 (setup assentado), q150 (ofertas assentadas), q205 (respostas assentadas) |
| 3 · Troca A (q64 → q80) | 5 estados da troca crítica: antes, avanço 50 %, pico (q71), corte com herói em movimento (q72), assentado (q80) |
| 4 · Banco de imagens | recortes e obras usados, em proporção real |

## 2. Os 9 pôsteres (prova de 7 s, 30 q/s, mesma cronologia da ref q0–q208)

Cada pôster traduz o mecanismo do pôster da ref que ocupa o mesmo lugar e tempo. Texto: Almeida Revista e Corrigida, Mateus 4.

| Cartão | Quando | Mecanismo herdado da ref | Pôster Cadernos | Texto |
|---|---|---|---|---|
| A0 | q0–71 | palavra gigante que alterna contorno e cheio, objetos entrando pelos cantos, etiqueta de cor | a cena 1 do Caderno 02 em crepúsculo: céu do Kuindzhi, terra de En-Gedi, Jesus do Kramskoi, inimigo pequeno rondando no horizonte (ver 09) | chapéu CADERNO 02 · MT 4:1 · título DESERTO · *conduzido pelo Espírito* + fita PARA SER TENTADO |
| B0 | q0–86 | faixa escura desce do topo com figura; kicker itálico; título em duas linhas | papel com faixa de carvão rasgada que desce do topo; mãos do Kramskoi no pé da faixa | contador 40 (1→40) · *dias e quarenta noites* |
| C0 | q0–85 | feixe de cor que gira a partir de um círculo com figura pequena andando; kicker palavra a palavra; título letra a letra | papel; feixe vermelho rasgado que gira a partir do círculo; silhueta de Jesus (Tissot) pequena | chapéu MT 4:2 · *depois, teve* · FOME. |
| A1 | q72–156 | fundo preto, objeto pesado entra caindo e girando; texto claro + linha vermelha | carvão; o tentador do Tissot com as pedras entra em queda pelo canto | chapéu A PRIMEIRA · MT 4:3 · *Se tu és o Filho de Deus,* · PEDRAS / EM PÃES (vermelho) |
| B1 | q87–160 | faixa vertical escura alta, figuras pequenas na base, título em 3 tamanhos | papel; a torre do Templo (Tissot) em tira vertical rasgada; Jesus pequeno no alto | chapéu A SEGUNDA · MT 4:6 · *lança-te* · DAQUI ABAIXO |
| C1 | q86–172 | objeto central que se parte em pedaços com rótulos | papel; os reinos do Duccio numa peça que se rasga em três | chapéu A TERCEIRA · MT 4:9 · TUDO ISTO · *te darei* |
| A2 | q157–208 | busto partido por faixa de cor; etiqueta no topo; frase com pílula embaixo | papel; rosto do Kramskoi partido por uma tira vermelha deslocada | fita ESTÁ ESCRITO · *Nem só de pão viverá o homem.* · MT 4:4 |
| B2 | q161–208 | duas formas deslizam com rastro; kicker itálico + título | papel; duas pedras deslizam e assentam | fita ESTÁ ESCRITO · *Não tentarás* · O SENHOR, TEU DEUS. · MT 4:7 |
| C2 | q173–208 | figura leve presa por fio a uma pedra; título numa barra de cor | papel; silhueta do Doré se afastando, fio vermelho até a pedra | barra vermelha VAI-TE, SATANÁS. · MT 4:10 |

**Refrão:** a fita vermelha ESTÁ ESCRITO aparece em A2 (q157), B2 (q166) e C2 (barra, q186): três vezes em cascata, como a resposta de Jesus.

**Título fixo do palco:** *Três ofertas.* (Instrument Serif Italic) / A MESMA RESPOSTA (League Gothic). **Assinatura:** selo CC + @nicacio.web.

## 3. Aprovação

O código só começa depois de o Nicácio aprovar no Figma: o palco, os 9 pôsteres e os estados da troca A. Mudança pedida no Figma volta para o Figma antes do código.

## 4. Construído (16/11/2026)

Página `78:37` · link: https://www.figma.com/design/qSQa66nPKuVvDZxqHJ3BCr/?node-id=78-37

| Peça | Nó |
|---|---|
| 0 · Palco com medidas | `78:43` |
| Estado q60 · o deserto | `78:59` |
| Estado q150 · as ofertas | `78:72` |
| Estado q205 · a resposta | `78:85` |
| Pôsteres (componentes) | A0 `87:163` (cena 1; a versão papel `79:61` ficou ao lado) · B0 `79:74` · C0 `79:85` · A1 `80:60` · B1 `80:71` · C1 `80:78` · A2 `82:57` · B2 `82:69` · C2 `82:86` |
| 2 · Linha do tempo | `84:163` |
| 3 · Troca A0 → A1 (q64, q70, q71, q72, q75, q80) | `84:241` `84:269` `84:297` `84:325` `84:349` `84:373` |

Os estados do palco usam instâncias: mudar um pôster atualiza os três estados. Os 6 quadros da troca A são cópias soltas (precisam mexer em camadas internas) e são refeitos depois da aprovação dos pôsteres.
Todas as imagens vieram do banco do Caderno 02 (mesmo arquivo, página `26:37`); nenhuma imagem nova foi subida.

## 5. Cue sheet da prova (30 q/s)

| Cartão | Pôster | Corte | Saída do anterior | Chegada | Golpe de texto P1 | Outros eventos |
|---|---|---|---|---|---|---|
| A | A0 Deserto | q0 | — | Jesus sobe do pé, potência n 0,3 em 18 q | título contorno → cheio q0–12 · fita q18–32 | kicker palavra a palavra q8–16 |
| B | B0 40 dias | q0 | — | faixa de carvão desce q0–12, mãos penduradas | contador 1 → 40 q36–48 (em dois tempos) | chapéu q6 · kicker q54–64 |
| C | C0 Fome | q0 | — | feixe gira do horizontal até 34° q0–12 | FOME. letra a letra q57–62 | chapéu q3 · "Depois, teve" q3–18 |
| A | A1 Pedras | q72 | chicote para cima q68–71 (−1,7 −3,2 −11 −38 px/q) | tentador em queda, mola ζ 0,81 (+171 px no corte) | PEDRAS SE TORNEM q102–110 · EM PÃES. q146–150 | chapéu q75 · kicker q78–86 · círculo à mão q130–141 |
| C | C1 Reinos | q86 | avanço longo q79–85 (n 1,6, × 1,14) | cidades se separam, potência n 0,3 em 24 q | TUDO ISTO q116–124 | chapéu q92 · "te darei." q152–158 |
| B | B1 Pináculo | q87 | nenhuma (deriva até o corte) | faixa do pináculo desce q87–99 | DAQUI ABAIXO. q128–140 | chapéu q92 · "lança-te" q110–114 |
| A | A2 Pão | q157 | avanço curto q152–156 (n 3, × 1,09) | fatia vermelha assenta (deslocamento 26 → 0 px) | fita ESTÁ ESCRITO q157–171 | citação q163–178 |
| B | B2 Não tentarás | q161 | panorâmica para cima, −19 px/q de q157 a q160 | pedras deslizam com rastro, potência n 0,8 | fita q166–180 · título q175–184 | kicker q170–176 |
| C | C2 Vai-te | q177 (bumbo da faixa) | recuo q171–176 (× 0,92) | inimigo se afasta puxando o fio, potência n 0,26 em 24 q | barra VAI-TE, SATANÁS. q186–199 | "porque está escrito." q198–206 |

Fim da prova em q209, um quadro antes da 3ª rodada da referência (A209).


## 6. As outras 5 trocas em estados (16/11)

Seção "4 · AS OUTRAS CINCO TROCAS" na página `78:37` (y 4900): C86, B87, A157, B161 e C177, cada uma em 4 estados (antes q−3, pico q−1, corte q, assentado q+8). O terceiro corte da rodada 2 passou para **q177**, o bumbo da trilha medida.
