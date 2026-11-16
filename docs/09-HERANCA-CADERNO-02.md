# 09 · O que vem do motion do Caderno 02 (cena 1, v4)

Fonte: repositório `viabetel/cadernos-do-caminho` (pasta local `Desktop/Clientes/Cadernos do Caminho/Caderno 02 - Tentação`), commit `6ec3d41` (entrega da cena 1 feed v4, render no Actions). O motor não reescreve o que já foi medido e aprovado ali: copia e generaliza.

## 1. Código que entra no motor

| Origem (`motion/src`) | O que faz | Vira no motor |
|---|---|---|
| `engine.ts` · `resposta`, `puxa` | mola a partir de um quadro; superposição de alvos (o objeto nunca para entre alvos) | `math.ts` · base de toda mola |
| `engine.ts` · `pulso01(f, tp, n, Tin, tau)` | entrada singular v ∝ (tp − t + 1)^−n até o pico, saída exponencial τ, velocidade contínua no pico | **`PulsoSaida`** do trio: é a mesma família medida na referência (n 1,4 a 1,8 em C, 2,5 a 4 em A/B). Muda só o parâmetro |
| `engine.ts` · `suave`, `doisTempos`, `aleatorio`, `ruido1` | smootherstep; pose em dois tempos (G1); ruído determinístico fBm de 4 oitavas (o mesmo do `rasgo.py`) | `math.ts`; dois tempos passa a ser em tempo (12 poses/s em qualquer fps) |
| `sinais.ts` · `progresso` | perfil trapezoidal de velocidade: a deriva acelera e desacelera em rampa, nunca começa nem para seco | **`Deriva`** |
| `sinais.ts` · `pouso` + `PAPEL_PESADO` | pouso de papel com o alvo distribuído em N degraus (sem tranco no arranque); massa maior para peça grande, ζ ≈ 0,68 | **`ChegadaPapel`** (pele Cadernos) |
| `sinais.ts` · `integralTensao`, `andou` | posição = ∫ velocidade quando a velocidade muda com a tensão da cena | regra geral do `math.ts` (nada de posição com velocidade "trocada" no meio) |
| `sinais.ts` · `posOrbita`, `estadoInimigo` | órbita 3D projetada, escala pela profundidade, inclina nas curvas por tanh(vx), bruma e foco pela distância | **`OrbitaInimigo`** no pôster A0; **`Afastamento`** (mesma física, raio crescendo) no C2 |
| `rasgo.ts` · `contorno` | polígono da borda rasgada, a mesma função do Figma (`referencia/rasgo.js`) | **`TornEdge`** + fervura de borda (G3: semente troca a cada 4 q) |
| `scripts/medir.mjs` | roda os sinais fora do navegador e reprova salto de velocidade antes do render | base do medidor do motor (critérios de 08) |
| `.github/workflows/render-cena1.yml` | npm, `preparar.sh`, `tsc`, medidor, quadros de prova, render com concorrência 2, BT.709, folha de contato | base do `render-motion-engine.yml` |
| `Cena1Feed.tsx` | camadas da cena 1: céu em loop, terra, cristas, Jesus com contraluz, inimigo, sombra, vinheta ≤ 0,38 | conteúdo animado do pôster A0 (mesma lógica, geometria do cartão) |

## 2. Material que entra

| Material | Uso no trio |
|---|---|
| `assets/inimigo_grok/loop` (145 PNG com alfa, 1696 × 960; o ciclo fecha no q79, IoU 0,91) + `inimigo.json` (caixa por quadro) | inimigo animado: pequeno em órbita no horizonte do A0; indo embora puxando o fio no C2 ("Vai-te, Satanás") |
| `assets/inimigo_grok/mergulho` (0 a 73 usável) | reserva; não entra na prova (o "Vai-te" é afastamento, não mergulho) |
| peças do crepúsculo (`kram_jesus_crepusculo`, `roberts_terra_crepusculo`, `kram_pedras_crepusculo`), céu do Kuindzhi | pôster A0 |
| grão, fitas, assinatura | todos os pôsteres da pele Cadernos |

## 3. Números da cena 1 v4 trazidos para o cartão

O A0 é a cena 1 a 0,52 da escala do feed. As velocidades em px escalam junto; tempo e ζ não.

| Sinal | Cena 1 (feed 1080, 24 q/s) | No cartão A0 (0,52) | Limite geral |
|---|---|---|---|
| céu em loop, sempre para a esquerda | 0,8 px/q = 19 px/s | ≈ 10 px/s | fundo ≤ 12 px/s (ok) |
| inimigo em órbita | período 192 q (8 s), largura 110 a 225 px | período 8 s, largura 57 a 117 px | — |
| respiração de Jesus (G2) | ±0,6°, período 56 a 72 q | igual em graus e em segundos | — |
| vinheta | ≤ 0,38 | igual | — |

## 4. Gramática do semi-animado (G1 a G11) como presets da pele Cadernos

G1 dois tempos · G2 respiração no pino · G3 fervura de borda · G4 descolar do papel · G5 pouso de papel · G6 rasgo de transição (no trio não entra: a troca é o corte da referência) · G7 câmera viva (vira a `Deriva` do pôster) · G8 marca à mão (círculo das pedras no A1) · G9 areia ao vento (A0, B0) · G10 calor no horizonte (A0) · G11 tecido ao vento (B1, manto no pináculo).
Números em `Caderno 02 - Tentação/documentos/01 Superprompt do motion.md` §3; valem como estão.

## 5. Mudanças no Figma por causa disso (16/11)

- **A0 agora é a cena 1** em crepúsculo (`87:163`): céu, terra, cristas, Jesus do Kramskoi, inimigo pequeno no horizonte e sombra; título DESERTO, kicker e fita sobre o céu. É o único cartão escuro do estado q60.
- O A0 de papel ficou ao lado como versão anterior (`79:61`, fora dos estados).
- Os quadros q64, q70 e q71 da troca A foram refeitos com o novo A0.
- No C2, a camada do inimigo indica que no motion ele usa o loop de asas do Grok.
