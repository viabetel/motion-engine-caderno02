# PLANO_DE_RENDER · fases, bloqueios e checklist

## Fases

| Fase | O que sai | Bloqueio para seguir |
|---|---|---|
| 1 · agora | diagnóstico, contratos (`schemas/story.schema.ts`), estes documentos, relatório do trio v2 corrigido, mapa Figma→Remotion | — |
| 2 · Figma | poses intermediárias das 8 passagens (≥ 4 cada; B1 com 6) + mapa da câmera global + linha do tempo visual P1→P6 | **aprovação do Nicácio** |
| 3 · provas | composição `CadernosC02Sequencia`; prova A (P1→P2→P3), prova B (P3b→P4→P4b), prova C (P5→P5b→P6), cada uma com trilha-guia, quadros críticos, antes/depois, forma de onda e QA | aprovação das provas |
| 4 · voz | WAV do ElevenLabs, Scribe com tempo por palavra, revisão manual das palavras críticas, `voz_palavras.json`, reencaixe dos eventos, mix, QA | aprovação |
| 5 · final | render final na nuvem + folha de contato + QA completo (`SEQUENCE_QA`) | — |

## Render

- Só na nuvem: `gh workflow run render-motion-engine.yml -R viabetel/yamplink-motion -f projeto=<id> -f versao=<v>` (o workflow já faz tsc, medidor, provas, determinismo, render, som, master, folhas e QA). Para a sequência, o passo de QA troca `qa.py` (trio) por `qa_sequencia.py`.
- Prévias por trecho com `--frames=a-b` da mesma composição (nada de composições recortadas que dupliquem lógica).
- Arquivos publicados como artifact mesmo se o QA falhar; o MP4 vai para Downloads assim que existir.

## Checklist antes de cada render

- [ ] Figma da aresta aprovado e importado (`figma-para-projeto.mjs`), sem PNG de cena inteira como camada única
- [ ] medidor da sequência sem falha crítica (ordem, arestas, leitura, margens, gatilhos)
- [ ] citações conferidas com a ARC (pontuação inclusive)
- [ ] trilha medida no arquivo real; licença fora do repositório público
- [ ] nenhum gatilho `estimado: true` no render final
