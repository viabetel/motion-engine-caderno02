# ONSCREEN_VOICE_RULES · texto na tela × voz

## 1. Relação por tipo de texto

| Texto na tela | Relação com a voz | Regra |
|---|---|---|
| Título da oferta (MANDA QUE ESTAS PEDRAS…, LANÇA-TE DAQUI ABAIXO., TUDO ISTO TE DAREI.) | **complementa**: a tela traz a frase literal da ARC; a voz conta a oferta com palavras próprias | entra por linha, cada linha no máximo 0,15 s depois da palavra que a nomeia; fica parada ≥ 0,9 s depois de montada |
| Resposta (Nem só de pão…, Não tentarás…, Ao Senhor, teu Deus…) | **repete**: voz e tela dizem a mesma citação literal | a tela acompanha a voz palavra a palavra (cada palavra aparece até 0,15 s depois de ser dita) e fica parada ≥ 2,2 s por 10 palavras depois da última |
| Fita ESTÁ ESCRITO | **refrão**: aparece na palavra "Está" da voz (P3b, P4b) e na palavra "Ao" do v.10 (P5b, onde a voz não diz "está escrito") | entra sempre com o mesmo movimento (18 % maior, encolhe em 14 q, varre em 200 ms); fica parada até a cena sair |
| Chapéu (referência MATEUS 4:x) | **referência**: não é dito | entra com a citação/título, P3 (rótulo) |
| 40 / DIAS E QUARENTA NOITES. | **complementa** "Quarenta dias sem comer." | o 40 nasce na passagem B1 (antes da fala) e firma em "Quarenta" |
| TRÊS OFERTAS. A MESMA RESPOSTA. | **alterna** com "Ali vieram três ofertas. E uma só resposta." | cada linha na palavra correspondente |
| ESTÁ ESCRITO. CADERNO 02 · FIM | **silêncio**: depois da última frase | leitura ≥ 3 s sem voz |

## 2. Leitura (régua)

- Texto essencial: ≥ 0,9 s parado depois de completamente montado; frases de leitura: 2,2 s por 10 palavras.
- Conferência em 360 × 450 (feed no celular). OCR é auxiliar; a revisão humana é obrigatória.
- Nada essencial a menos de 64 px da borda do quadro 4:5 nem atrás do rosto de uma figura.

## 3. Passagens × fala

- B1, B2, B4, B6 e B8 acontecem no silêncio entre frases (respiros de 1,4 a 1,8 s).
- B3, B5 e B7 podem começar no fim da última palavra, nunca sobre ela.
- Se a voz medida for mais longa que a cena desenhada, a cena ganha tempo (deriva continua) e a passagem espera o silêncio; se for mais curta, a cena segura a leitura mínima antes da passagem. Nunca acelerar a fala nem cortar palavra.

## 4. Gatilhos por palavra (preenchidos depois do Scribe)

Fonte única: `projects/c02-sequencia/tempos.ts`. Cada gatilho é `P.<palavra>` = tempo medido da palavra na régua do filme. Antes da voz existir, os gatilhos apontam para as estimativas do `VOICE_SCENE_MAP.md`, marcadas como `estimado: true`, e o medidor reprova o render final enquanto houver gatilho estimado.
