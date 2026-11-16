# Para o ChatGPT · prompt do espaço da narração (Caderno 02 em sequência)

Olá. Este repositório é público só para você analisar. O projeto real fica no repositório privado do Nicácio; aqui estão os documentos, o código do motor, as cenas do Figma exportadas e os renders de teste. A trilha da Mixkit e o vídeo de referência ficaram de fora por licença.

## 1. O que existe

- **Motor de motion** (`motor/`, Remotion + TypeScript), feito a partir do seu PRD (`docs/00` a `docs/10`): tipos `VideoProject`, `Poster`, `SlotTrack`, `MotionEvent`; tempo em ms convertido para quadro uma única vez; presets medidos na referência (avanço hiperbólico até o corte, chegada que assenta com velocidade zero, deriva); medidor que reprova antes do render (`motor/scripts/medir.ts`); QA forense do render com a mesma régua da referência (`motor/scripts/qa.py`); som com trilha recortada na grade medida + efeitos de papel sintetizados (`motor/sound/som.py`).
- **Prova do motor no modo Trio Showcase** (`entregas/…_v1.mp4` e `_v2.mp4`, 7 s): os três cartões da referência, com o Caderno 02. Resultado medido em `entregas/*_qa.md` (cortes nos quadros previstos, palco parado, determinismo 0, −14,4 LUFS).
- **A peça de verdade:** o Nicácio quer o Caderno 02 contado **em sequência**, uma cena depois da outra, com passagens fluidas e imersivas. Roteiro em `docs/11-EDITORIAL-STORY-C02.md`; cenas desenhadas no Figma exportadas em `figma/sequencia/` (feed 4:5, 1080 × 1350):

| Cena | Arquivo | Texto na tela | Passagem para a próxima |
|---|---|---|---|
| P1 Deserto | `P1-deserto.jpg` | TRÊS OFERTAS. A MESMA RESPOSTA. | mergulho nas mãos de Jesus |
| P2 Fome | `P2-fome.jpg` | 40 · DIAS E QUARENTA NOITES. · "Depois, teve fome." (Mt 4:2) | a câmera desce até as pedras |
| P3 Pedras | `P3-…`, `P3b-…` | MANDA QUE ESTAS PEDRAS SE TORNEM EM PÃES. → ESTÁ ESCRITO · "Nem só de pão viverá o homem." (Mt 4:4) | subida em vertigem pela torre do Templo |
| P4 Pináculo | `P4-…`, `P4b-…` | LANÇA-TE DAQUI ABAIXO. → ESTÁ ESCRITO · "Não tentarás o Senhor, teu Deus." (Mt 4:7) | a câmera sobe e o mundo se abre nos reinos |
| P5 Reinos | `P5-…`, `P5b-…` | TUDO ISTO TE DAREI. → "Vai-te, Satanás." · "Ao Senhor, teu Deus, adorarás, e só a ele servirás." (Mt 4:10) | o pedaço com o tentador é arrancado como papel |
| P6 Fim | `P6-fim.jpg` | "Então o diabo o deixou." (Mt 4:11) · ESTÁ ESCRITO. · CADERNO 02 · FIM | — |

- **O método de tempo e voz que já funcionou** (motion do Kivow, repositório público): https://github.com/viabetel/kivow-semana-motion, em `kivow-semana/src/v9/tempos.ts` e `kivow-semana/docs/v9/` (CUE_SHEET, SOUND_DESIGN, MOTION_QA, V9.2_CORRECOES). Resumo do que vale como regra: `tempos.ts` como fonte única; grade da faixa medida; voz em tomada contínua com tempo por palavra (STT do ElevenLabs); estado na tela no máximo 0,15 s depois da palavra; respiro de um compasso inteiro no silêncio entre frases quando algo precisa ser lido (duas réguas: roteiro e filme); música −24 LUFS sob a voz com ducking de 6 dB (80/300 ms); nenhum impacto em sílaba tônica; STOI ≥ 0,85.

## 2. O que pedimos a você

Um **prompt único para o Claude** preparar o espaço da narração desta sequência, para quando a voz do ElevenLabs chegar. Ele precisa decidir e medir, não sugerir de forma genérica:

1. **Roteiro de locução** para uma tomada contínua, em português do Brasil, com começo, meio e fim. Decida com motivo: a voz lê os versículos (Almeida Revista e Corrigida) ou narra entre eles com texto próprio enquanto a tela mostra o versículo? Nada de fato inventado sobre o texto bíblico. Sem travessão e sem cara de IA. Duração-alvo de 30 a 40 s.
2. **Mapa voz × cena × passagem:** em que cena cada frase cai, onde ficam os silêncios, se as passagens imersivas (mergulho, descida, vertigem, abertura, rasgo) acontecem no silêncio entre frases ou sobre a voz, e quanto respiro cada uma pede.
3. **Relação entre o texto na tela e a voz:** repetir, complementar ou alternar; quanto tempo de leitura parada cada texto essencial pede quando a voz está falando outra coisa.
4. **Regras para o motor:** o que vira gatilho por palavra; como a câmera e as passagens se ajustam quando a voz é mais longa ou mais curta que a cena desenhada; onde entram os respiros em compasso inteiro; como a fita ESTÁ ESCRITO (refrão visual) se alinha com a palavra falada.
5. **Som:** trilha instrumental com pulso (o motor encaixa os cortes na grade medida), ducking, efeitos de papel sem cobrir sílaba.
6. **ElevenLabs:** modelo, perfil de voz (idade, timbre, ritmo, pausa) e parâmetros (estabilidade, similaridade, estilo, velocidade), e o pipeline: gerar → STT com tempo por palavra → `voz_palavras.json` → `tempos.ts`.
7. **Critérios de aceite medidos**, no formato de `docs/08-QA-ACCEPTANCE.md` (número, como medir, meta).

**Formato da resposta:** um prompt para o Claude em português, em seções numeradas, com números e critérios mensuráveis, pronto para colar. Se precisar escolher entre alternativas, escolha e diga o motivo em uma linha.

## 3. Restrições do Nicácio

- Figma primeiro: nenhuma mudança de cena vai para o código antes de estar desenhada e aprovada no Figma.
- Feed 4:5 agora; Reel 9:16 depois.
- Render e processamento pesado só na nuvem (GitHub Actions).
- Créditos de obra e de música vão na legenda do post, nunca na arte.
- Efeitos fluidos e imersivos, nada duro ou "engessado"; cada movimento com motivo na história.
