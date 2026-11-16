# 11 · Editorial Story · Caderno 02 em sequência (feed 4:5)

Pedido do Nicácio (16/11): "não precisa desenhar os quadros todos juntos em 3, eram pra ser sequências da mesma história contada" e "quero efeitos flúidos e extremamente imersivos, foque nisso pra ficar lindo".
O trio continua no motor como modo `trio-showcase` (prova do comportamento da referência, pedida pelo PRD). A peça do Caderno 02 é o modo `editorial-story`: uma cena depois da outra, tela cheia.

## Decisões

- **Formato:** feed 4:5 (1080 × 1350), decisão dele para o Caderno 02. Reel 9:16 depois.
- **Mundo único:** o deserto no crepúsculo da cena 1 aprovada (mesma luz, mesmo grão). As obras (Kramskoi, Tissot, Duccio, Doré) entram reacendidas na mesma luz.
- **Câmera contínua:** nunca há página parada nem corte seco entre cenas. Cada passagem é um movimento de câmera com motivo na história. Tudo é medido: pulso hiperbólico na aceleração, chegada com velocidade final zero, deriva ≥ 0,25 px/q, rastro só acima de 25 px/q.
- **Profundidade:** cada cena tem planos com z próprio (céu, fundo, figura, frente). O parallax sai do z.
- **Texto:** entra e sai com a cena (sobe da máscara por linha), nunca fica como placa. Leitura: 2,2 s por 10 palavras depois da última entrar.
- **Refrão:** a fita vermelha ESTÁ ESCRITO é um elemento compartilhado e volta nas três respostas.

## Roteiro (24 q/s, cerca de 36 s)

| Cena | Tempo | O que se vê | Texto | Passagem para a próxima (o efeito imersivo) |
|---|---|---|---|---|
| P1 · Deserto | 0–5 s | a cena 1 aprovada: céu desliza, inimigo ronda no horizonte, Jesus respira | TRÊS OFERTAS. / A MESMA / RESPOSTA. no céu | **Mergulho nas mãos:** a câmera avança ×3 até as mãos de Jesus; as pedras da frente passam rente à lente (parallax mais rápido, desfoque de profundidade); as mãos da cena 1 viram as mãos da cena 2 no mesmo lugar (mergulho casado, desvio < 1 px) |
| P2 · Fome | 5–10 s | close nas mãos do Kramskoi em luz de crepúsculo | o 40 rola como contador atrás das mãos; *"Depois, teve fome."* MT 4:2 | **Desce ao chão:** a câmera desce pelo manto até as pedras aos pés; uma pedra do chão é a mesma pedra que o tentador ergue (elemento compartilhado) |
| P3 · Pedras | 10–16 s | caverna do Tissot reacendida; o tentador oferece as pedras; círculo à mão | MANDA QUE ESTAS PEDRAS SE TORNEM EM PÃES. → fita ESTÁ ESCRITO + *"Nem só de pão viverá o homem."* MT 4:4 | **Subida em vertigem:** pulso hiperbólico para cima (a mesma família do avanço medido na referência) pela torre do Templo até o alto |
| P4 · Pináculo | 16–22 s | Jesus no pináculo; a câmera olha para baixo e desce 38 % da altura (vertigem) e volta quando ele responde; manto ao vento | LANÇA-TE DAQUI ABAIXO. → fita + *"Não tentarás o Senhor, teu Deus."* MT 4:7 | **Abre o mundo:** a câmera sobe acima do pináculo e recua; os reinos do Duccio se levantam embaixo como livro pop-up |
| P5 · Reinos | 22–29 s | reinos ganhando cor, o tentador respira no canto | TUDO ISTO TE DAREI. → *"Vai-te, Satanás."* MT 4:10 | **Rasgo:** o pedaço com o tentador é arrancado (borda rasgada com fibra), gira e cai com gravidade; por trás aparece o deserto sereno |
| P6 · Fim | 29–36 s | o deserto calmo, Jesus pequeno no horizonte, câmera recuando 1,06 → 1,00 | *"Então o diabo o deixou."* MT 4:11 · ESTÁ ESCRITO · CADERNO 02 · FIM | — |

## Som

Trilha instrumental com pulso (a mesma família medida: intro sem grave, grave entra no primeiro mergulho). Só eventos de matéria soam: papel (rasgo, fita pousando), vento na vertigem. Nada de whoosh por movimento. Master −14 LUFS, −1 dBTP.

## Figma antes do código

Página **"Motion · Sequência (feed 4:5)"** no arquivo dos Cadernos: as 6 cenas no estado principal e cada passagem em 3 estados (início, meio, fim do movimento), com as camadas de profundidade separadas para o motor.
