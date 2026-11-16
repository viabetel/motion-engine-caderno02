# Pipeline da voz (Fase 4 · só quando o WAV existir)

1. **Gerar** (`gerar_elevenlabs.py`, roda na nuvem com o segredo `ELEVENLABS_API_KEY`): texto de `docs/sequencia/NARRACAO_ROTEIRO.md`, modelo `eleven_multilingual_v2` (A/B com `eleven_v4`), parâmetros de teste do roteiro. Primeiro a amostra de 8–12 s; a integral só depois da aprovação. O WAV original vai para `assets/c02-sequencia/voz/original.wav` e nunca é editado.
2. **Medir** (`medir_palavras.py`): Scribe (speech-to-text do ElevenLabs) com tempo por palavra → `voz_scribe.json`.
3. **Revisar à mão** as palavras críticas: Jesus, Espírito, Satanás, Senhor, Deus, quarenta, os versículos e a pontuação. Corrigir só rótulos de palavra, nunca o tempo sem ouvir.
4. **Normalizar** → `projects/c02-sequencia/voz_palavras.json` (`{palavra, inicioMs, fimMs}` na régua do arquivo).
5. **Encaixar**: `tempos.ts` troca os gatilhos estimados pelos medidos (`estimado: false`); respiros em compasso inteiro no silêncio entre frases (`RESPIROS`); a régua do filme sai de `noFilme`.
6. **QA**: S12–S14 do `SEQUENCE_QA.md` (gatilho ≤ 0,15 s depois da palavra, nenhuma palavra coberta, LUFS, pico real, STOI).

Nada aqui roda antes de existir o áudio; nenhum tempo de palavra é escrito à mão.
