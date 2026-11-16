# TRANSITION_GRAPH · as 8 arestas da sequência (P1→P2→P3→P3b→P4→P4b→P5→P5b→P6)

Composição `CadernosC02Sequencia`, 1080 × 1350, **30 q/s**. Coordenadas em px do quadro 4:5. Tempos na **régua do roteiro** (provisórios até a voz medida; ver `VOICE_SCENE_MAP.md`). Câmera = `PersistentCameraRig` (escala, âncora, alvo de foco em coordenadas de mundo). Profundidade: fator de parallax por plano (`background` 0,45 · `midground` 0,8 · `subject` 1,0 · `foreground` 2,2 · `type`/`paper`/`fx` por evento).
Curvas: `S` = aceleração e desaceleração com velocidade contínua (Hermite, sai da velocidade da deriva e chega a zero); `pulso` = `pulso01` (entrada singular, medida na ref); `chegada` = 1 − (1 − t/D)^m; `gravidade` = y = v0·t + g·t²/2 com arrasto.

| Aresta | Nome | Roteiro (s) | Quadros | Tipo de match |
|---|---|---|---|---|
| B1 | Mergulho nas mãos | 6,9–8,9 | 207–267 | mesmo asset (Jesus do Kramskoi no crepúsculo) · casado real |
| B2 | Descida às pedras | 12,6–14,4 | 378–432 | composicional (pedra do chão → pedra na mão do tentador) com oclusão do manto |
| B3 | Resposta no mesmo ambiente | 17,8–18,6 | 534–558 | mesma imagem · traço vermelho vira a fita |
| B4 | Vertigem até o templo | 22,4–24,2 | 672–726 | corte escondido no pico do rastro vertical |
| B5 | Olhar para baixo e estabilizar | 28,6–30,2 | 858–906 | mesma imagem (pináculo mais alto que o quadro) |
| B6 | Abertura dos reinos | 34,0–36,2 | 1020–1086 | oclusão por nuvem (céu do Kuindzhi) + revelação em camadas |
| B7 | A oferta perde peso | 41,0–42,0 | 1230–1260 | mesma imagem · hierarquia e tensão do papel |
| B8 | Rasgo e volta ao deserto | 48,2–50,2 | 1446–1506 | o papel sai e revela o mundo da P1 por trás |

---

## B1 · P1 → P2 · Mergulho nas mãos (prioridade absoluta)

| Campo | Especificação |
|---|---|
| Intenção | da vastidão do deserto ao corpo de Jesus: a fome aparece como peso no corpo, não como texto |
| Duração | 2,0 s (60 q) |
| Âncora | as mãos entrelaçadas. P1: centro (879, 920). P2: centro (800, 840) |
| Câmera | escala do mundo 1,00 → 1,60 em `S`; a âncora viaja de (879, 920) a (800, 840) junto com a escala. Janela da câmera em coordenadas da P1: início (0, 0)–(1080, 1350) · fim (379, 395)–(1054, 1239) |
| Velocidade | entra na velocidade da deriva da P1 (0,25 px/q); pico em 0,55 da passagem (≈ 2,6 %/q de escala); sai a zero (repouso da P2) |
| Parallax | céu ×(1 + 0,45·(s−1)) · terra e cristas ×(1 + 0,8·(s−1)) · Jesus ×s · pedras da frente ×(1 + 2,2·(s−1)) |
| Oclusão | as pedras da frente crescem até 2,3× e atravessam a parte de baixo do quadro entre os quadros 225 e 245 (passam "rente à lente", desfoque de profundidade 18 px); escondem a troca do fundo nítido (P1) pelo fundo desfocado (P2) |
| Profundidade de campo | fundo: desfoque 0 → 10 px; terra: 0 → 14 px; Jesus sempre nítido (foco nas mãos) |
| Rastro | só nas pedras da frente (vertical, ≤ 6 px), quando passam de 25 px/q; nada borrado em Jesus |
| Luz | a P2 já está na mesma luz; o multiplicar do crepúsculo sobe 0 → 0,22 junto com a escala |
| Tipografia | o título da P1 sai subindo pela máscara (quadros 207–222). O 40 nasce atrás das mãos (TypographyMassReveal: sobe 60 px, opacidade 0 → 0,92, quadros 240–267). "DIAS E QUARENTA NOITES." e a citação entram depois do assentamento |
| Som | J-cut: o vento sobe 300 ms antes do quadro 207; pressão grave curta quando as pedras cruzam a lente; o ambiente fecha (menos vento, mais corpo) ao chegar nas mãos |
| Risco | as pedras da frente esticadas demais (PNG no limite da resolução) · salto no fundo quando troca do nítido para o desfocado |
| Plano B | se a pedra pixelar acima de 2×, usar o recorte em alta do Kramskoi (`kram_pedras_crepusculo.jpg`, 3840 px) · se o fundo saltar, cruzar os dois fundos em 8 q dentro da oclusão |
| Prévia | prova A (P1→P2→P3); quadros 200–275 um a um; gráfico de escala e velocidade da câmera |

## B2 · P2 → P3 · Descida às pedras

| Campo | Especificação |
|---|---|
| Intenção | a fome encontra a oferta: o olhar desce pelo corpo até o chão e uma pedra conduz à mão que a oferece |
| Duração | 1,8 s (54 q) |
| Âncora | uma pedra. P2: pedra do primeiro plano em (300, 1290). P3: pedra na mão esquerda do tentador em (500, 706) |
| Câmera | inclina para baixo: o mundo da P2 sobe 820 px em `S` (manto passa pela tela); a pedra-âncora cresce 1,0 → 1,7 e vai ao centro |
| Oclusão | o manto escuro de Jesus cobre o quadro entre 0,45 e 0,65 da passagem; dentro dele a P3 entra por baixo com a pedra do tentador já no lugar da pedra-âncora |
| Material | pedra: pesada; chega e assenta com mola ζ 0,9 (sem borracha), sombra de contato aparece e encolhe; poeira (AtmosphericDust) sobe 40 px e assenta em 1,2 s |
| Velocidade | de repouso a pico de 32 px/q no meio, chega a zero na P3 |
| Rastro | vertical, só no pico |
| Tipografia | o texto da P2 sai junto com o mundo (sobe); o chapéu e o título da oferta (P3) entram por linha depois do assentamento |
| Som | tecido roçando no início, pedra raspando no chão no encontro, poeira |
| Risco | troca visível de pintura (Kramskoi → Tissot) · cores diferentes |
| Plano B | escurecer 20 % mais o manto na oclusão; unificar a temperatura das duas obras antes |
| Prévia | prova A; quadros 370–440 |

## B3 · P3 → P3b · Resposta no mesmo ambiente

| Campo | Especificação |
|---|---|
| Intenção | a oferta perde a voz; a Escritura responde |
| Duração | 0,8 s (24 q) |
| Âncora | o círculo vermelho à mão em volta das pedras: centro (670, 696), 594 × 252 |
| Movimento | o traço do círculo se recolhe (InkTrace ao contrário) e vira uma linha que corre até (80, 150), onde vira a fita ESTÁ ESCRITO (entra 18 % maior e encolhe, chegada m 5,5 em 14 q). A câmera não muda de imagem: só recua 3 % (respira) |
| Tipografia | o título agressivo sai por máscara (linhas descem em 9 q); a citação entra palavra a palavra, mais leve (QuoteBreath) |
| Material | fita: leve, pousa com amassado de 4 % e para (papel/fita) |
| Som | traço de tinta curto, fita assentando |
| Risco | a linha cruzar o rosto do tentador |
| Plano B | trajetória da linha por cima do céu da caverna (curva) |
| Prévia | prova A |

## B4 · P3b → P4 · Vertigem até o templo

| Campo | Especificação |
|---|---|
| Intenção | o tentador "leva" Jesus ao alto: a câmera sobe com aceleração real |
| Duração | 1,8 s (54 q) |
| Âncora | o eixo vertical da torre; chegada em Jesus no pináculo, cabeça em (560, 520) |
| Câmera | subida: o mundo desce. Parte 1: a caverna desce acelerando em `pulso` (n 2,4, rampa 12 q); pico ≈ 90 px/q; o corte de imagem acontece no pico, escondido pelo rastro vertical. Parte 2: a arquitetura do Tissot (pináculo, 1860 px de altura) continua descendo e desacelera em `chegada` (m 5,5, 30 q) até a P4 |
| Perspectiva | elementos mais próximos (beirais, colunas) descem 1,4× mais rápido que o fundo |
| Rastro | vertical, proporcional à velocidade (≤ 8 px), zero na chegada |
| Tipografia | a citação da P3b sai junto (desce); o título da P4 entra por linha depois que a câmera assenta (leitura) |
| Som | vento subindo, reverberação abrindo quando chega ao alto |
| Risco | o corte no pico ficar visível se o rastro for pouco |
| Plano B | 2 q de faixa escura (beiral) passando no pico |
| Prévia | prova B (P3b→P4→P4b); quadros 665–735 |

## B5 · P4 → P4b · Olhar para baixo e estabilizar

| Campo | Especificação |
|---|---|
| Intenção | a ameaça ("lança-te daqui abaixo") é vertigem; a resposta é chão firme |
| Duração | 1,6 s (48 q) |
| Movimento | a câmera inclina para baixo 38 % da altura (513 px) em `S` (o pináculo é mais alto que o quadro: 740 px de imagem abaixo); segura 6 q; volta para cima com mola amortecida (PESADO, ζ 1,05) e assenta em Jesus |
| Tipografia | o título da oferta sai durante a descida; a fita ESTÁ ESCRITO volta com o MESMO movimento da B3 (mesma curva, mesma escala de entrada) quando a câmera assenta |
| Material | manto: tecido em pequena amplitude (deslocamento 7 px na metade de baixo) |
| Som | assobio de vento descendo; silêncio curto no fundo; volta com o ambiente firme |
| Risco | enjoo: inclinação rápida demais |
| Plano B | limitar a velocidade de pico a 24 px/q |
| Prévia | prova B |

## B6 · P4b → P5 · Abertura dos reinos

| Campo | Especificação |
|---|---|
| Intenção | "um monte muito alto": sobe acima de tudo e o mundo se abre embaixo |
| Duração | 2,2 s (66 q) |
| Câmera | sobe (o pináculo desce e sai), atravessa uma camada de nuvem do Kuindzhi (oclusão 0,35–0,55), depois recua de 1,30 → 1,00 sobre o Duccio |
| Revelação | as cidades sobem em camadas, como livro pop-up discreto: rotateX 70° → 0° com perspectiva 1200 px, 6 q entre elas (torres, cidade à esquerda, cidade à direita), mola MEDIO (ζ 0,65), sombras de contato crescendo; o céu fica atrás com parallax 0,45 |
| Tipografia | "TUDO ISTO" / "TE DAREI." por linha depois da abertura |
| Som | ar aberto, reverberação longa, três dobras de papel suaves (uma por cidade) |
| Risco | pop-up de PNG chapado parecer cartolina |
| Plano B | menos ângulo (45°) e sombra mais longa |
| Prévia | prova C (P5→P5b→P6) começa no fim desta aresta |

## B7 · P5 → P5b · A oferta perde peso

| Campo | Especificação |
|---|---|
| Intenção | a oferta encolhe; a decisão entra |
| Duração | 1,0 s (30 q) |
| Movimento | o título da oferta perde contraste e sai por máscara; a câmera aproxima 4 % do tentador (à esquerda); a borda rasgada em volta do tentador aparece (fibra branca) e o pedaço começa a se soltar: canto sobe 12 px, sombra cresce 0 → 18 px de desfoque (tensão) |
| Tipografia | "Vai-te, Satanás." entra decidida (sobe da máscara em 6 q, sem overshoot); depois a fita e a citação do v.10 |
| Som | nenhum efeito sobre a voz; tensão de papel (rangido curto) depois de "Satanás" |
| Risco | efeito competir com a frase |
| Plano B | atrasar o rangido para depois da última sílaba |
| Prévia | prova C |

## B8 · P5b → P6 · Rasgo e volta ao deserto

| Campo | Especificação |
|---|---|
| Intenção | o tentador é arrancado; o deserto de antes volta, agora em paz |
| Duração | 2,0 s (60 q) |
| Física | o pedaço (≈ 740 × 700 px, centro de massa no meio) solta: rotação 0 → +14° com velocidade angular 0,9°/q e arrasto; queda com gravidade 2,2 px/q² e arrasto 0,02; sai pela parte de baixo em ≈ 36 q. A sombra acompanha (distância cresce com a altura) |
| Revelação | pelo buraco aparece o deserto da P6 (o mesmo mundo da P1); em seguida o resto da folha do Duccio desliza para baixo (PaperPeel, 24 q) e revela tudo; a câmera recua 1,06 → 1,00 e assenta |
| Tipografia | "Então, o diabo o deixou." depois do assentamento; ESTÁ ESCRITO. em seguida; CADERNO 02 · FIM por último; leitura ≥ 3 s em silêncio |
| Som | rasgo único (impacto), depois alívio: ambiente do deserto volta, cauda curta da trilha |
| Risco | papel girando parecer cartão rígido |
| Plano B | dobrar a ponta (flexão de 6°) enquanto cai |
| Prévia | prova C; quadros 1440–1510 |
