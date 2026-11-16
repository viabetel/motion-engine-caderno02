# Testes do PRD (§14) e onde cada um roda

| # | Teste do PRD | Onde | Como reprova |
|---|---|---|---|
| 1 | Render que começa no quadro 175 = render integral (determinismo) | workflow, passo "Teste de determinismo" (still q175 × render em pedaço q174–176) | diferença máxima > 0 aparece no `_qa.md` |
| 2 | Caixa de cada cartão fixa | `scripts/qa.py` (bordas medidas nas mesmas linhas da forense) + construção (cartão sem transformação) | variação > 1 px |
| 3 | A e B não mudam sem querer durante a troca de C | `scripts/qa.py` (energia dos outros cartões no quadro do corte) | energia > 12 |
| 4 | Máscara arredondada sem vazamento | construção (`overflow: hidden` + raio no cartão; nada é desenhado fora dele) + folha de contato | inspeção da folha |
| 5 | Número de quadros certo | `scripts/qa.py` | quadros lidos ≠ previstos |
| 6 | Trocas detectáveis e no cue sheet; corte autorizado não é glitch | `scripts/qa.py` (corte detectado = previsto) + `scripts/medir.ts` (tabela de cortes) | quadro diferente |
| 7 | Essencial dentro da área segura | `scripts/medir.ts` §Palco e área segura | aviso por item |
| 8 | Assinatura/branding persiste | construção (assinatura é camada do palco, fora dos cartões) + `qa.py` (palco parado) | energia do palco > limite |
| 9 | Texto essencial legível pelo tempo mínimo | `scripts/medir.ts` §Leitura (≥ 600 ms depois de montado) | falha crítica |
| 10 | Som tem música e efeitos; efeito não mascara sílaba | `sound/som.py` + ebur128 no `_qa.md`; sem voz nesta prova | inspeção |
| 11 | Sem quadro preto, repetição ou fantasma | `scripts/qa.py` (quadros pretos) + folha de todos os quadros | contagem > 0 |
| 12 | 30 × 60 q/s com o mesmo tempo | `scripts/medir.ts` §Cortes + composição `<id>60` | corte fora de ±1 quadro de 60 |
| 13 | Relatório de QA real, folhas, eventos e vídeo | workflow → `entregas/<nome>_qa.md`, `_folha.jpg`, `_todos_os_quadros.jpg`, `_provas/` | — |
| 14 | Origem, direitos e versão de cada asset | `assets/CREDITOS.md` | item sem origem |
| 15 | Inspeção humana no celular | Nicácio, no retorno | — |
