# Caderno 02 · A tentação no deserto · superprompt do motion

**Peça:** motion semi-animado no sistema do Caderno 01. As pinturas e gravuras viram peças de papel recortado que se mexem por partes, como colagem animada. Não é foto parada com zoom.
**Entregas:** Reel 9:16 (1080x1920) e feed 4:5 (1080x1350), da mesma timeline. 24 q/s, 912 quadros (38 s). Trilha instrumental.
**Texto bíblico:** Mateus 4:1–11, Almeida Revista e Corrigida (a mesma família do 01). A ordem é a de Mateus. Lucas inverte a 2ª e a 3ª.

## 1. Tese e título

Jesus estava com fome, sozinho e fraco. Recebeu três ofertas e respondeu às três do mesmo jeito: "Está escrito". O vídeo prende pela promessa do título e paga no refrão.

| | Título | Narrativa |
|---|---|---|
| **A (escolhido)** | TRÊS OFERTAS. A MESMA RESPOSTA. | Abre a pergunta ("qual resposta?"), as três cenas mostram as ofertas, a fita "ESTÁ ESCRITO" volta três vezes e o fim fecha o laço. |
| B | ELE TEVE FOME. E MESMO ASSIM DISSE NÃO. | Começa pela fraqueza. É mais humano, mas entrega o final. |
| C | JESUS FOI TENTADO NO DESERTO. | Literal, igual à capa do 01. É seguro e prende menos. |

## 2. Obras (domínio público; créditos só na legenda)

| Cena | Obra | Peças |
|---|---|---|
| C1, C2, C6 | Ivan Kramskoi, *Cristo no deserto*, 1872 (Galeria Tretyakov) | placa, Jesus recortado, detalhe das mãos |
| C3 | James Tissot, *Jesus tentado no deserto*, 00.159.51 (Brooklyn Museum) | placa da caverna, Jesus, o tentador com as pedras |
| C4 | James Tissot, *Jesus levado ao pináculo do Templo*, 00.159.52 (Brooklyn Museum) | placa, Jesus |
| C5 | Duccio, *A tentação no monte*, 1308–11 (Frick Collection) | placa, demônio, Jesus, reinos (cidades) |

## 3. Gramática do semi-animado (vale para todas as cenas)

| ID | Efeito | Medida |
|---|---|---|
| G1 | **Em dois tempos.** As peças de papel mudam de pose a cada 2 quadros (12 poses/s), como stop-motion. A câmera, o texto e a areia andam a 24. | `fp = floor(f/2)*2` |
| G2 | **Respiração da peça.** A peça gira e sobe e desce num pino na base (pés, joelhos ou pedra). | rot ±0,6° a 1,6°, y ±3 px, período 56 a 72 q, fases diferentes por peça |
| G3 | **Fervura de borda.** Borda rasgada e marca à mão tremem, igual a desenho refeito. | feTurbulence 0,035, deslocamento 2,2 px, semente troca a cada 4 q |
| G4 | **Descolar do papel.** A figura sai da pintura: ganha filete branco de papel de 5 px e uma sombra que cresce. | sombra 0→12 px de deslocamento e 0→16 px de desfoque, escala 1→1,03, mola PESADO (2,2/120/34, ζ 1,05) |
| G5 | **Pouso de papel.** A peça entra girada e assenta com sombra que encolhe. | sai de −7° e 160 px, mola MEDIO (1/170/17, ζ 0,65), overshoot ≤ 4 %, 2 q de antecipação para trás |
| G6 | **Rasgo de transição.** A cena seguinte nasce por baixo enquanto a de cima é arrancada por uma borda rasgada com fibra branca. | 16 q; entrada em singularidade v = c/(tₚ−t)^1,2; saída exponencial τ 3; borda com ruído de 4 oitavas e amplitude de 22 px |
| G7 | **Câmera viva.** Avanço lento em cada cena, sem parar nunca, com parallax por camada. | escala 1,00→1,06 por cena; deriva ≥ 0,25 px/q; profundidade: placa 0,6 · figura 1,0 · texto 1,15 · frente 1,3 |
| G8 | **Marca à mão.** Círculo ou sublinhado vermelho desenhado a pena e depois em G3. | 11 q, cúbica de saída, traço de 5 px, #C0301A |
| G9 | **Areia ao vento** (C1 a C3). | 46 grãos de 1 a 3 px, vento de 1,8 a 3,2 px/q para a esquerda, oscilação vertical de 0,4 px/q |
| G10 | **Calor no horizonte** (Kramskoi). | faixa de 9 % da altura, deslocamento de 3 px, ruído 0,012 × 0,09 andando 0,6 px/q |
| G11 | **Tecido ao vento** (pináculo). | deslocamento de 7 px só na metade de baixo do manto (máscara em degradê), ruído andando 1,4 px/q |

**Tipografia** (a mesma do 01: League Gothic, Instrument Serif Italic, DM Sans, IBM Plex Mono):
- **T1 título:** cada linha sobe de uma máscara na linha de base, 100 %→0 em 9 q, mola tipo (1/170/20, ζ 0,77), 4 q entre linhas. Ao sair, sobe com máscara em 7 q. O texto entra e sai; nada fica como placa parada.
- **T2 citação:** Instrument Serif, palavra a palavra a cada 3 q, desfoque 6→0 px e y 10→0.
- **T3 fita "ESTÁ ESCRITO":** fita vermelha com IBM Plex Mono em papel. Pousa colada com G5 e squash de 4 %. É o refrão e volta nas três respostas.
- **Leitura mínima:** 2,2 s para cada 10 palavras, contados depois da última palavra entrar.
- **Área segura do Reels:** fora os 220 px do topo, os 420 de baixo e os 140 da direita.

## 4. Roteiro (24 q/s)

| Cena | Quadros | Fundo | Texto | Imagem e movimento |
|---|---|---|---|---|
| **C1 capa** | 0–132 | carvão | Chapéu: CADERNO 02 · MATEUS 4:1–11. Título: TRÊS OFERTAS. / A MESMA / **RESPOSTA.** Apoio: "Jesus no deserto, logo depois do batismo." | Kramskoi rasgado na metade de baixo, letreiro DESERTO tonal no topo. Jesus em G2 (pino na pedra, rot ±0,6°), G9 e G10. Câmera G7 |
| **C2 fome** | 132–252 | papel | Contador "40" gigante (1→40 em 30 q, em dois tempos) + "dias e quarenta noites." Depois: *"Depois, teve fome."* MT 4:2 | Detalhe das mãos do Kramskoi rasgado entra com G5, com fita na dobra e areia |
| **C3 pedras** | 252–432 | papel | Chapéu A PRIMEIRA · MT 4:3. Título: MANDA QUE ESTAS / PEDRAS SE TORNEM / EM PÃES. Aos 96 q: fita ESTÁ ESCRITO + *"Nem só de pão viverá o homem."* MT 4:4 | Caverna do Tissot rasgada. O tentador oferece as pedras balançando no pino dos joelhos (rot ±3°, G1). Círculo G8 nas pedras. Jesus descola (G4) quando a resposta entra |
| **C4 pináculo** | 432–612 | vermelho | Chapéu A SEGUNDA · MT 4:5–6. Título: LANÇA-TE / DAQUI ABAIXO. Aos 100 q: fita + *"Não tentarás o Senhor, teu Deus."* MT 4:7 | Pináculo do Tissot em tira vertical. A câmera desce do rosto até o pátio (vertigem, 38 % da altura, mola PESADO) e volta quando ele responde. Manto em G11 |
| **C5 reinos** | 612–792 | carvão | Chapéu A TERCEIRA · MT 4:8–9. Título: TUDO ISTO / TE DAREI. Aos 100 q: *"Vai-te, Satanás."* e depois fita + *"Ao Senhor, teu Deus, adorarás, e só a ele servirás."* MT 4:10 | Duccio escurecido 45 %. Os reinos sobem como livro pop-up (rotateX 88°→0, perspectiva de 1200 px, 6 q entre eles, MEDIO) e ganham cor. O demônio respira (G2). No "Vai-te", o terço esquerdo da obra, com o demônio, é rasgado: gira +14° e cai com gravidade de 2,2 px/q² por 26 q |
| **C6 fim** | 792–912 | papel | *"Então o diabo o deixou."* MT 4:11. Letreiro ESTÁ ESCRITO. Depois CADERNO 02 · FIM + "Histórias, palavras e encontros com Jesus." | Kramskoi sereno: só o horizonte e Jesus pequeno, câmera recuando 1,06→1,00 |

As transições entre as cenas usam G6, cada uma num sentido: C1→C2 de baixo para cima, C2→C3 da direita, C3→C4 de cima, C4→C5 da esquerda e C5→C6 de baixo.

## 5. Som (trilha instrumental)

Um drone baixo, com pouco instrumento (corda grave ou oud), e vento contínuo. Só os eventos de papel ganham som de papel: os 5 rasgos e os 3 pousos da fita. O resto fica mudo. Nada de um efeito para cada evento. O pico da trilha cai no "Vai-te" (q 712).

## 6. Critérios de aceite (medidos no render)

1. Nenhum quadro com todas as peças paradas: deriva da câmera ≥ 0,25 px/q.
2. Peças em dois tempos: diferença de pose entre q e q+1 igual a 0 em quadros pares e ímpares alternados.
3. Texto legível pela regra de 2,2 s por 10 palavras. Nada a menos de 64 px da borda (4:5) nem dentro da faixa insegura do Reels.
4. Sem fantasma de figura na placa: a área do recorte aparece apagada quando a peça se mexe.
5. Folha de contato do filme inteiro (2 q/s) lida antes de dizer pronto.
