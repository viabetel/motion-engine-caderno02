# SOUND_DESIGN · Caderno 02 em sequência

## 1. Camadas

| Camada | Conteúdo | Nível | Regra |
|---|---|---|---|
| VOZ | tomada contínua do ElevenLabs | referência (−17 a −16 LUFS antes do master) | WAV original guardado intacto |
| TRILHA | instrumental com pulso (grade medida no arquivo real) | −24 LUFS sob a voz, −18 sem voz | ducking 6 dB, ataque 80 ms, liberação 300 ms (ajustar na escuta) |
| AMBIENTE | deserto (vento leve), espaço do Templo (reverberação), ar aberto dos reinos | −32 a −28 LUFS | contínuo por cena; cruza nas passagens |
| MATÉRIA | pedra raspando, poeira, tecido, papel, fita | −30 a −24 dB de pico | só com causa visível |
| MOVIMENTO | ar da câmera nas grandes passagens (subida, mergulho) | baixo | nunca whoosh a cada movimento |
| IMPACTO | o rasgo (B8) | um único | depois, alívio |

## 2. Por passagem

| Aresta | Som | Corte |
|---|---|---|
| B1 | vento sobe 300 ms antes; pressão grave curta quando as pedras cruzam a lente; o ambiente fecha ao chegar nas mãos | J-cut |
| B2 | tecido roçando, pedra raspando no encontro, poeira | — |
| B3 | traço de tinta curto, fita assentando | — |
| B4 | vento subindo, reverberação abrindo no alto | L-cut da reverberação |
| B5 | assobio descendo, silêncio curto no fundo, ambiente firme na volta | — |
| B6 | ar aberto, reverberação longa, três dobras de papel suaves | — |
| B7 | rangido de papel depois da última sílaba de "Satanás" | — |
| B8 | rasgo único; alívio; ambiente do deserto volta; cauda curta da trilha | L-cut |

Ofertas: tensão rítmica na trilha. Respostas: menos densidade, espaço aberto. Nada de batida robótica nem som reconhecível de biblioteca de notificação.

## 3. Trilha

BPM e batida 0 medidos no arquivo real (`audio_grade.py` e a medição da faixa), nunca pelo nome. Candidata atual: "Between Two Evils" (Mixkit 1020, colcheia 334,17 ms, 89,8 BPM, grave entra em 13,50 s do arquivo). A grade só sugere: as passagens seguem a voz; quando houver conflito, a voz manda.

## 4. Master e verificação

−14 LUFS integrado ±1 e pico real ≤ −1 dBTP medidos no MP4; sem clipping; soma mono (perda ≤ 1,5 LU); efeitos 8 dB abaixo da voz na faixa de 1 a 4 kHz; STOI da voz contra o mix ≥ 0,85 (celular ≥ 0,80) como indício, não prova; escuta no celular e no fone pelo Nicácio.

## 5. Licenças

Trilha e referência fora do repositório público. No render da nuvem a trilha vem do repositório privado.
