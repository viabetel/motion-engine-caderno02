# Medidor · CadernosC02Trio

Gerado em 2026-11-16T18:08:25.090Z · 1080x1920 · 30 q/s · 210 q

## Cortes
| cartão | quadro | ms | quadro a 60 q/s | saída | entra |
|---|---|---|---|---|---|
| A | 72 | 2400.0 | 144 | chicote | A1 |
| C | 86 | 2866.7 | 172 | longa | C1 |
| B | 87 | 2900.0 | 174 | deriva | B1 |
| A | 157 | 5233.3 | 314 | curta | A2 |
| B | 161 | 5366.7 | 322 | panoramica | B2 |
| C | 177 | 5900.0 | 354 | recuo | C2 |
- [x] cada corte cai no mesmo tempo a 30 e a 60 q/s (±1 quadro de 60)

## Rodadas (cascata)
- líder A q72: C +14 q, B +15 q
- [x] rodada q72: A abre a rodada
- [x] rodada q72: os três cartões trocam (3)
- líder A q157: B +4 q, C +20 q
- [x] rodada q157: A abre a rodada
- [x] rodada q157: os três cartões trocam (3)

## Golpes de texto P1
- q0 · A · A0 Título
- q18 · A · A0 Fita · PARA SER TENTADO
- q36 · B · B0 Contador · 40
- q57 · C · C0 Título
- q102 · A · A1 Título
- q116 · C · C1 Título
- q128 · B · B1 Título
- q157 · A · A2 Fita · ESTÁ ESCRITO
- q166 · B · B2 Fita · ESTÁ ESCRITO
- q173 · B · B2 Título
- q182 · C · C2 Barra vermelha
- [x] golpes A0 Fita · PARA SER TENTADO → B0 Contador · 40: 18 q (mínimo 9)
- [x] golpes B0 Contador · 40 → C0 Título: 21 q (mínimo 9)
- [x] golpes C0 Título → A1 Título: 45 q (mínimo 9)
- [x] golpes A1 Título → C1 Título: 14 q (mínimo 9)
- [x] golpes C1 Título → B1 Título: 12 q (mínimo 9)
- [x] golpes B1 Título → A2 Fita · ESTÁ ESCRITO: 29 q (mínimo 9)
- [x] golpes A2 Fita · ESTÁ ESCRITO → B2 Fita · ESTÁ ESCRITO: 9 q (mínimo 9)
- [x] golpes B2 Título → C2 Barra vermelha: 9 q (mínimo 9)

## Leitura
- [x] A0 Título: 2000 ms de leitura depois de montado (mínimo 600)
- [x] A0 Fita · PARA SER TENTADO: 1333 ms de leitura depois de montado (mínimo 600)
- [x] A1 Título: 1533 ms de leitura depois de montado (mínimo 600)
- [x] A2 Fita · ESTÁ ESCRITO: 1300 ms de leitura depois de montado (mínimo 600)
- [x] B0 Contador · 40: 1300 ms de leitura depois de montado (mínimo 600)
- [x] B1 Título: 700 ms de leitura depois de montado (mínimo 600)
- [x] B2 Fita · ESTÁ ESCRITO: 1000 ms de leitura depois de montado (mínimo 600)
- [x] B2 Título: 933 ms de leitura depois de montado (mínimo 600)
- [x] C0 Título: 800 ms de leitura depois de montado (mínimo 600)
- [x] C1 Título: 1767 ms de leitura depois de montado (mínimo 600)
- [x] C2 Barra vermelha: 633 ms de leitura depois de montado (mínimo 600)

## Saídas (avanço até o corte)
- A q72 chicote: escala no último quadro 1.0000 (alvo 1), ty -54.0 px; passos %/q 0.00 0.00 0.00 0.00 0.00
- C q86 longa: escala no último quadro 1.1390 (alvo 1.139), ty -29.0 px; passos %/q 0.73 1.00 1.50 2.60 6.18
- [x] C q86: chega ao avanço total no quadro do pico
- [x] C q86: a velocidade só cresce até o corte (aceleração hiperbólica)
- B q87 deriva: escala no último quadro 1.0000 (alvo 1), ty 0.0 px; passos %/q 0.00 0.00 0.00 0.00 0.00
- A q157 curta: escala no último quadro 1.0930 (alvo 1.093), ty -38.0 px; passos %/q 0.11 0.20 0.43 1.24 6.92
- [x] A q157: chega ao avanço total no quadro do pico
- [x] A q157: a velocidade só cresce até o corte (aceleração hiperbólica)
- B q161 panoramica: escala no último quadro 1.0000 (alvo 1), ty -57.0 px; passos %/q 0.00 0.00 0.00 0.00 0.00
- C q177 recuo: escala no último quadro 0.9200 (alvo 0.92), ty 38.0 px; passos %/q 0.48 0.66 0.99 1.72 4.12
- [x] C q177: chega ao avanço total no quadro do pico
- [x] C q177: a velocidade só cresce até o corte (aceleração hiperbólica)

## Palco e área segura
- [x] geometria dos cartões vem do palco e não tem transformação (fixa por construção)
- [x] A0 Título: dentro da área segura (102,416)–(493,610)
- [x] A0 Fita · PARA SER TENTADO: dentro da área segura (93,682)–(389,753)
- [ ] B0 Contador · 40: dentro da área segura (714,422)–(947,818) (aviso)
- [x] C0 Título: dentro da área segura (363,1252)–(613,1436)
- [x] A1 Título: dentro da área segura (102,478)–(493,612)
- [ ] B1 Título: dentro da área segura (640,956)–(1017,1068) (aviso)
- [x] C1 Título: dentro da área segura (363,1204)–(660,1331)
- [x] A2 Fita · ESTÁ ESCRITO: dentro da área segura (92,391)–(364,471)
- [x] B2 Fita · ESTÁ ESCRITO: dentro da área segura (631,634)–(876,705)
- [x] B2 Título: dentro da área segura (640,754)–(889,912)
- [x] C2 Barra vermelha: dentro da área segura (373,1402)–(773,1488)

## Deriva na borda do cartão
- [x] A0: 13.9 px/s na borda (≤ 12 fora do showcase)
- [x] B0: 6.6 px/s na borda (≤ 12 fora do showcase)
- [x] C0: 0.8 px/s na borda (≤ 12 fora do showcase)
- [x] A1: 0.0 px/s na borda (≤ 12 fora do showcase)
- [x] B1: 0.2 px/s na borda (≤ 12 fora do showcase)
- [x] C1: 0.6 px/s na borda (≤ 12 fora do showcase)
- [x] A2: 6.3 px/s na borda (≤ 12 fora do showcase)
- [x] B2: 3.3 px/s na borda (≤ 12 fora do showcase)
- [x] C2: 16.6 px/s na borda (≤ 12 fora do showcase)

## Texto dentro do cartão durante a leitura (deriva máxima)
- [x] A0 Chapéu: escala 1.000 → caixa (34,44)–(321,66) em 453×802
- [x] A0 Título: escala 1.000 → caixa (30,64)–(421,258) em 453×802
- [x] A0 Kicker: escala 1.000 → caixa (34,252)–(354,322) em 453×802
- [x] A1 Chapéu: escala 1.000 → caixa (34,44)–(321,66) em 453×802
- [x] A1 Chapéu: escala 1.000 → caixa (34,44)–(321,66) em 453×802
- [x] A1 Kicker: escala 1.000 → caixa (34,72)–(295,129) em 453×802
- [x] A1 Kicker: escala 1.000 → caixa (34,72)–(295,129) em 453×802
- [x] A1 Título: escala 1.000 → caixa (30,126)–(421,260) em 453×802
- [x] A1 Título: escala 1.000 → caixa (30,126)–(421,260) em 453×802
- [x] A2 Citação · Mt 4:4: escala 1.000 → caixa (34,118)–(414,198) em 453×802
- [x] A2 Chapéu: escala 1.000 → caixa (34,208)–(158,230) em 453×802
- [x] B0 Chapéu: escala 1.083 → caixa (168,28)–(302,52) em 441×785
- [x] B0 Contador · 40: escala 1.083 → caixa (94,56)–(347,485) em 441×785
- [x] B0 Kicker: escala 1.083 → caixa (18,652)–(423,700) em 441×785
- [x] B1 Chapéu: escala 1.002 → caixa (34,523)–(309,545) em 441×785
- [x] B1 Kicker: escala 1.002 → caixa (34,549)–(182,611) em 441×785
- [x] B1 Título: escala 1.002 → caixa (30,605)–(407,717) em 441×785
- [x] B2 Kicker: escala 1.025 → caixa (29,349)–(256,412) em 441×785
- [x] B2 Título: escala 1.025 → caixa (25,406)–(280,568) em 441×785
- [x] B2 Chapéu: escala 1.025 → caixa (29,578)–(156,601) em 441×785
- [x] C0 Chapéu: escala 1.000 → caixa (34,92)–(158,114) em 416×732
- [x] C0 Kicker: escala 1.000 → caixa (34,120)–(223,180) em 416×732
- [x] C0 Título: escala 1.000 → caixa (30,168)–(280,352) em 416×732
- [x] C1 Chapéu: escala 1.009 → caixa (33,91)–(322,113) em 416×732
- [x] C1 Título: escala 1.009 → caixa (28,119)–(328,247) em 416×732
- [x] C1 Kicker: escala 1.009 → caixa (33,239)–(181,305) em 416×732
- [x] C2 Chapéu: escala 1.000 → caixa (54,290)–(190,312) em 416×732
- [x] C2 Título na barra: escala 1.000 → caixa (56,319)–(386,403) em 416×732
- [x] C2 Refrão: escala 1.000 → caixa (182,416)–(392,456) em 416×732
- [x] estado das camadas é função pura do tempo (determinismo)

**Falhas críticas: 0**
