# 00 · Diagnóstico técnico da sequência (Fase 1)

## Causa-raiz do desvio

1. A ordem do PRD anterior era "reproduzir primeiro o comportamento do MP4". Construí o runtime para isso e só para isso: `components/stage/MotionMaster.tsx` sempre monta três `PosterSlot`; `motion/slot-state.ts` resolve pôsteres por cartão A/B/C; `projects/index.ts` registra só `CadernosC02Trio`.
2. `editorial-story` existe apenas no tipo `LayoutMode` (`schemas/project.schema.ts`). Não há composição, câmera global, grafo de cenas nem passagem implementada.
3. No Figma, a página `93:37` tem as 9 poses de DESTINO. As 8 passagens existiam só como texto em `docs/11`.
4. O relatório público `_v2_qa.md` dizia "Falhas: 1" (teste de borda). O instrumento foi corrigido depois (commit `0c5dfa4`) e a v2 re-medida passa, mas o relatório publicado não tinha sido atualizado. Corrigido agora em `entregas/motion-engine_CadernosC02Trio_v2_qa.md`.

## Auditoria do código contra os 9 estados

| Necessidade da sequência | Existe hoje | Situação | Ação |
|---|---|---|---|
| Composição 1080 × 1350 própria | não | só `CadernosC02Trio` 1080 × 1920 | criar `CadernosC02Sequencia` (Fase 3) |
| Câmera global persistente | não | câmera é por cartão (`camera.ts`: deriva × saída) | `PersistentCameraRig` em coordenadas de mundo |
| Grafo de cenas e arestas | não | trilhas A/B/C com `poster-swap` | `SceneGraph` + `TransitionGraph` |
| Elementos compartilhados | parcial | linha viva (`CamadaLinha`) entre camadas do mesmo pôster | `SharedElementRegistry` entre cenas |
| Camadas com profundidade | não | ordem do Figma, sem z | `WorldStage` com 7 planos e fator de parallax |
| Física por material | parcial | presets genéricos (chegada, queda, potência) | `MotionMaterialSystem` (pedra, papel/fita, tecido, poeira, tipografia, luz) |
| Rastro direcional | sim | `Rastro.tsx` (SVG feGaussianBlur por eixo) | reaproveita |
| Texto vivo com revelação | sim | `TextLayer.tsx` (linha, palavra, letra, contorno, contador) | reaproveita; soma `QuoteBreath`, `TypographyMassReveal` |
| Importador Figma → camadas | sim | `scripts/figma-para-projeto.mjs` (texto vivo + PNG 2x na caixa real) | reaproveita para os 9 estados e as poses |
| Relógio determinístico em ms | sim | `motion/schedule.ts`, `math.ts` (pulso01, chegada, mola analítica, ruído com semente) | reaproveita; soma duas réguas (roteiro × filme) |
| Voz por palavra | não | — | `VoiceDirector` + pipeline (placeholders, sem tempos inventados) |
| Som por camadas | parcial | `sound/som.py` (trilha + 5 efeitos de papel) | `AudioTimeline` com 6 camadas (05 · SOUND_DESIGN) |
| QA da sequência | não | `qa.py` mede o trio (bordas fixas, cartões) | `SequenceQARunner` com critérios próprios |

## O que fica intacto

O modo `trio-showcase` continua como está (benchmark técnico secundário). Nada da sequência passa por `PosterSlot` nem por `slot-state.ts`.

## Contratos criados nesta fase (sem tocar no runtime do trio)

`schemas/story.schema.ts`: `SequenceStoryProject`, `SceneNode`, `BridgeEdge`, `CameraKey`, `SharedElement`, `MaterialProfile`, `WorldLayer` (planos `background`, `midground`, `subject`, `foreground`, `type`, `paper`, `fx`), `VoiceCue`, `AudioCue`.
