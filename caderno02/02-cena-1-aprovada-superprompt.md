# Cena 1 (feed 4:5) · superprompt do motion

Vale **só** a cena 1 em 4:5 (1080x1350, 24 q/s). Os quadros-chave das outras cenas no Figma ainda vão mudar, então não animar mais nada.
O quadro aprovado está em `motion/referencia/cena1_feed_figma.png` e as medidas de cada camada em `motion/referencia/cena1_feed_camadas.json`.
O quadro 0 do motion tem que bater com o Figma camada por camada, exceto o inimigo, que começa no horizonte (ver M4).

## Intenção

É crepúsculo no deserto, o fim dos 40 dias. Jesus está sentado, quieto, e o mundo em volta continua se mexendo devagar: nuvens, brilho, bruma.
Lá no fundo, dentro do brilho vermelho do horizonte, nasce um ponto preto que bate asas, vem crescendo e, perto, mergulha na direção dele.
O inimigo **se apresenta**. Nada é rápido, exceto o mergulho.

## Duração e roteiro (175 quadros, 7,3 s)

| Quadros | O que acontece |
|---|---|
| 0–10 | Plano aberto, tudo vivo (M1–M3), o céu está vazio |
| 10–89 | **Aproximação** (um ciclo inteiro do loop de asas, 79 q). O inimigo nasce no brilho, minúsculo, e cresce |
| 89–163 | **Mergulho** (quadros 0–73 da sequência de mergulho). Ele vira, abre as asas e desce na direção de Jesus |
| 163–175 | Ele segura perto de Jesus, à esquerda da cabeça, sem cobrir o rosto. Fim da cena |

A troca loop→mergulho acontece no quadro 89, onde o loop volta à pose do quadro 0 (IoU 0,91, medido em `assets/inimigo_grok/inimigo.json`). Sem salto.

## M1 · Câmera e parallax (o cenário móvel)

- **Câmera:** escala 1,000 → 1,045 entre q0 e q175, com âncora em (720, 760), perto do peito de Jesus. Curva `suave` só nas pontas: 12 q de rampa no começo e no fim, no meio a deriva fica constante (≥ 0,25 px/q na borda do quadro). Nunca parada.
- **Deriva horizontal por profundidade.** Cada camada anda para a esquerda, e o total em 175 q é: céu 10 px · terra (crista) 18 px · cristas 30 px · Jesus + pedras da frente 46 px. Cada camada começa em +total/2 e termina em −total/2, então a maior excursão fica em 23 px. Todas as caixas sobram ≥ 40 px além da borda do quadro, conferir.
- Jesus anda **junto** com as pedras da frente, porque está sentado na pedra.

## M2 · Céu vivo (Kuindzhi)

- **Nuvens derivam:** a imagem do céu anda mais 0,12 px/q para a esquerda dentro da caixa (além do M1).
- **Brilho respira:** uma cópia do céu com `brightness(1.18) saturate(1.1)`, mascarada por um degradê vertical que só deixa passar a faixa do horizonte (y 600–720 da tela, pico em 680). A opacidade é `0.45·(0.5 − 0.5·cos(2π f/120))`, ou seja, ciclo de 5 s, nunca pisca.
- **Bruma no horizonte** (costura céu e terra): pegar as faixas vermelhas do próprio Kuindzhi (recorte y 360–530 do original, espelhado), aplicar desfoque de 18 px e esticar numa faixa de 2400 px de largura, posta em y 655–745 entre a Terra (Cenário 1) e as Cristas (Cenário 2). Usar `mix-blend-mode: screen`, opacidade 0,28 e deriva +0,6 px/q (para a direita, contra o resto, o que dá vento).

## M3 · Jesus vivo (semi-animado, em dois tempos)

- **Respiração:** pino nos pés (base do recorte). Rotação ±0,4°, y ±2 px, período de 72 q, fase 0. A pose muda **a cada 2 quadros** (`doisTempos`, 12 poses/s), como peça de papel em stop-motion.
- **Transbordo animado (o papel descola):** quando o inimigo começa o mergulho (q89), o recorte de Jesus descola da cena pela mola PESADO (2,2/120/34, ζ 1,05). A escala vai de 1 a 1,02 com o pino nos pés. A sombra projetada vai de (-34, 12) raio 30 para (-48, 18) raio 42 e de 0,55 para 0,62 de opacidade. A cabeça e os ombros, que já passam por cima do céu, ficam mais à frente, como papel que se ergue.
- Não mexer no rosto, nem fazer piscar ou girar a cabeça. É uma peça de papel, não um boneco.

## M4 · O inimigo (as sequências do Grok)

As sequências estão em `assets/inimigo_grok/loop/` (1696x960) e `assets/inimigo_grok/mergulho/` (1472x800). São PNG com alfa, silhueta #121110.
As caixas da figura por quadro estão em `assets/inimigo_grok/inimigo.json`, em pixels da sequência 2x.

- **Estabilizar:** em cada quadro, posicionar a sequência pelo **centro da caixa da figura**, não pelo canto do PNG. Assim o movimento na tela é só o que nós desenhamos.
- **Índice do quadro:** loop `idx = doisTempos(f − 10) mod 79`. Mergulho `idx = doisTempos(f − 89)`, travado em 73. Os dois rodam em dois tempos, que dá a velocidade real com 12 atualizações por segundo, a mesma textura de stop-motion de Jesus.
- **Distância `d`:** 1 = longe, 0 = perto. De q10 a q89, `d = exp(−(f−10)/34)` normalizado para chegar a 0,1 em q89, uma aproximação que desacelera. No mergulho, `d` vai de 0,1 a 0 por `suave`.
- **Tamanho:** largura da caixa da figura na tela = `lerp(560, 54, d^0.85)` no loop. No mergulho, cresce de 560 a 640 até q163.
- **Trajetória (centro da figura):**
  - P0 (q10) = (285, 655): dentro do brilho, metade das asas abaixo da crista;
  - P1 (q89) = (300, 330): perto, no céu escuro onde estava o título;
  - P2 (q163) = (455, 600): à esquerda da cabeça de Jesus, sem tocar o rosto (rosto em x ≈ 640–760, y ≈ 560–680).
  - Curvas: Bézier P0→P1 com controle (170, 520) e P1→P2 com controle (330, 520). O tempo segue `d`, e o mergulho acelera com potência u^1,6 (cai e ganha velocidade).
- **Ar entre ele e a câmera (a "longitude"):**
  - opacidade `0.82 + 0.18·(1−d)`;
  - desfoque `1.4·d^0.7` px;
  - bruma `0.35·d`: sobrepor a cor do céu na altura dele, `#3A2622`, sobre a silhueta. Pode ser um `<Img>` igual por cima com `filter: brightness(0) invert(...)` tingido, ou um retângulo com `mix-blend-mode: lighten` mascarado pelo alfa da silhueta.
- **Profundidade na pilha:** enquanto `d > 0.55` ele fica entre o céu e a Terra (a crista corta a parte de baixo). Com `d ≤ 0.55` ele sobe para cima de todas as camadas de cenário, mas fica **atrás de Jesus** até q140. No fim do mergulho (q140+) passa à frente das pedras e continua atrás de Jesus.
- **Rastro do mergulho:** só quando a velocidade na tela passar de 8 px/q. Desfoque de movimento curto na direção do movimento (2 a 3 cópias com 0,25 de opacidade, deslocadas 3 e 6 px para trás). Nada de rastro no loop.

## M5 · O que NÃO entra

- Texto (o título está escondido no Figma de propósito). A assinatura fica parada em (84, 44).
- Grão por cima (cena carvão não tem grão no Caderno 01).
- Som, que é outra etapa.
- Brilho, aura ou luz celestial em Jesus.

## Critérios de aceite (medir no render, não no olho)

1. O quadro 0 comparado com `cena1_feed_figma.png` (sem o inimigo) tem diferença média < 3/255 por canal nas áreas de cenário.
2. Nenhum quadro com a câmera parada: a deriva na borda é ≥ 0,25 px/q.
3. Jesus e o inimigo mudam de pose só nos quadros pares (dois tempos): o md5 do recorte de Jesus em f e f+1 é igual quando f é par.
4. Nenhum vão entre camadas e a borda do quadro, nem fundo carvão aparecendo onde não devia. Conferir os 4 cantos em todos os quadros da folha de contato.
5. O rosto de Jesus nunca é coberto pela silhueta. A caixa do inimigo fica fora de x 640–760 × y 560–680.
6. A troca loop→mergulho no q89 não salta: o centro da figura anda ≤ 12 px entre q88 e q89.
7. O inimigo no q10 tem ≤ 60 px de largura e se lê como algo vivo dentro do brilho (asas batendo), não como mancha.
