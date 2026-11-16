# Roteiro de narração · Caderno 02 em sequência (uma tomada contínua)

**Decisão (do prompt mestre):** narração autoral entre os versículos; a voz reproduz literalmente só as frases bíblicas decisivas; a tela mostra as citações maiores. Motivo: repetir em voz toda a escrita da tela cria redundância e mata a velocidade.
**Tradução:** Almeida Revista e Corrigida (Sociedade Bíblica do Brasil, ed. 2009), Mateus 4:1–11, conferida em bibliaonline.com.br/arc/mt/4.
**Legenda:** `[L]` = citação literal da ARC (vai entre aspas na tela quando aparece) · `[A]` = narração autoral (nunca apresentada como citação).

## Texto integral para o ElevenLabs (colar assim, com a pontuação)

> O Espírito levou Jesus ao deserto. Ali vieram três ofertas. E uma só resposta.
>
> Quarenta dias sem comer. Depois teve fome.
>
> A primeira oferta: transformar pedras em pão.
> Está escrito: Nem só de pão viverá o homem.
>
> A segunda, no alto do templo: que se jogasse dali.
> Também está escrito: Não tentarás o Senhor, teu Deus.
>
> A terceira: todos os reinos do mundo, em troca de adoração.
> Vai-te, Satanás. Ao Senhor, teu Deus, adorarás e só a ele servirás.
>
> Então, o diabo o deixou.

## Frase a frase

| # | Frase | Tipo | Fonte | Palavras | Duração estimada (2,4 pal/s) | Interpretação |
|---|---|---|---|---|---|---|
| 1 | O Espírito levou Jesus ao deserto. | A | Mt 4:1 ("foi conduzido Jesus pelo Espírito ao deserto") | 6 | 2,5 s | calmo, ponto de partida, sem peso |
| 2 | Ali vieram três ofertas. | A | Mt 4:3–9 | 4 | 1,7 s | anúncio, leve tensão |
| 3 | E uma só resposta. | A | Mt 4:4, 7, 10 | 4 | 1,7 s | firmeza; pausa depois |
| 4 | Quarenta dias sem comer. | A | Mt 4:2 ("tendo jejuado quarenta dias e quarenta noites") | 4 | 1,8 s | lento, cansaço |
| 5 | Depois teve fome. | L | Mt 4:2 | 3 | 1,4 s | íntimo, quase baixo |
| 6 | A primeira oferta: transformar pedras em pão. | A | Mt 4:3 | 7 | 2,9 s | a oferta soa razoável, não vilã |
| 7 | Está escrito: Nem só de pão viverá o homem. | L | Mt 4:4 | 8 | 3,3 s | resposta sem pressa, voz mais assentada |
| 8 | A segunda, no alto do templo: que se jogasse dali. | A | Mt 4:5–6 | 10 | 4,0 s | vertigem; "dali" sustentado |
| 9 | Também está escrito: Não tentarás o Senhor, teu Deus. | L | Mt 4:7 | 8 | 3,3 s | mesma firmeza da 7 (refrão) |
| 10 | A terceira: todos os reinos do mundo, em troca de adoração. | A | Mt 4:8–9 | 11 | 4,4 s | amplitude; "adoração" cai |
| 11 | Vai-te, Satanás. | L | Mt 4:10 | 3 | 1,6 s | decisão, sem gritar |
| 12 | Ao Senhor, teu Deus, adorarás e só a ele servirás. | L | Mt 4:10 | 10 | 4,0 s | firme e sereno |
| 13 | Então, o diabo o deixou. | L | Mt 4:11 | 5 | 2,2 s | alívio; depois, silêncio |

**Total:** 83 palavras · fala ≈ 34,8 s · com as pausas marcadas ≈ 40 s de voz dentro de um filme de cerca de 45 s (a duração final sai da voz medida; nunca acelerar a fala para caber).

## Pausas intencionais (onde a câmera faz as grandes passagens)

| Depois da frase | Pausa alvo | Para quê |
|---|---|---|
| 3 | 1,6 s | mergulho nas mãos (P1→P2) |
| 5 | 1,4 s | descida às pedras (P2→P3) |
| 7 | 1,4 s | vertigem até o templo (P3b→P4) |
| 9 | 1,8 s | abertura dos reinos (P4b→P5) |
| 12 | 1,6 s | rasgo e volta ao deserto (P5b→P6) |
| 13 | ≥ 3,0 s | silêncio de fechamento, leitura de ESTÁ ESCRITO. CADERNO 02 · FIM |

## Guia de pronúncia (para a amostra de 8–12 s)

Espírito (es-PÍ-ri-to) · Satanás (sa-ta-NÁS, sem "Satã") · adorarás (a-do-ra-RÁS) · servirás (ser-vi-RÁS) · "Vai-te" (VAI-te, o "te" curto, sem hífen audível) · "teu Deus" sem elisão · "Nem só de pão" com "só" tônico.

## ElevenLabs (proposta de teste, não fato)

- Modelo principal: `eleven_multilingual_v2` (controle previsível de ritmo e pausas em pt-BR). Teste A/B: `eleven_v4`, sem enviar `speed`/`style` se o modelo não aceitar.
- Voz: nativa brasileira, médio-grave, calma, firme, íntima, não teatral (nada de voz de trailer).
- Ponto de partida: stability ≈ 0,52 · similarity ≈ 0,78 · style 0–0,10 · speaker boost conforme a voz · speed ≈ 0,94–0,98.
- Primeiro uma amostra de 8–12 s (frases 1 a 5) com o guia de pronúncia; só depois a geração integral. Plano pago é decisão do Nicácio (a voz brasileira não sai no plano grátis).
