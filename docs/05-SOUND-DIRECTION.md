# 05 · Direção de som

## 1. O que a referência faz (medido em 00, seção 6)

- 100 BPM. Bumbo em 3-3-2 semicolcheias (13,5 + 13,5 + 9 q a 30 q/s).
- Intro de 3,73 s sem grave; o grave entra em q112.
- O corte do líder da rodada cai no bumbo; o eco (4 q depois) fica mudo.
- Nenhum whoosh separado por troca: a música é o efeito.
- Master: −14,2 LUFS integrado, −1,5 dBTP, LRA 5,4 LU.

## 2. Regras do motor

1. **A grade vem da música.** O projeto informa `bpm` e `downbeatMs`; o agendador encaixa o corte de cada líder no bumbo mais próximo (tolerância ±2 q) e empurra a cascata a partir dele.
2. **Proporção de eventos sonorizados:** na ref, 0 de 11 trocas têm efeito próprio. No motor, efeito só em evento de matéria da pele (papel na pele Cadernos), no máximo 1 a cada 2 rodadas.
3. **Um evento sonoro por vez.** Se A ganhou impacto, B e C ficam mudos naquela janela de 300 ms.
4. **Voz opcional:** com locução, valem as regras da seção 5 (a voz manda no tempo; música −24 LUFS sob ela).
5. **Master no arquivo final:** −14 LUFS ±1, true peak ≤ −1,0 dBTP, medido com `ffmpeg -af ebur128`.

## 3. Pele Cadernos

A série já tem regra de som (Caderno 02): drone baixo, pouco instrumento (corda grave ou oud), vento contínuo; só eventos de papel ganham som de papel. Para manter a gramática do trio, a trilha precisa ter **pulso perceptível** perto de 100 BPM (percussão de mão tipo daf ou frame drum sobre o drone), com intro sem grave e entrada do grave antes da 2ª rodada.

Fonte da trilha: banco com licença de uso livre (Pixabay Music ou equivalente), arquivo e licença guardados em `assets/audio/`. A escolha acontece depois da aprovação do Figma, com a forense de som da faixa (grade, entrada do grave) antes de encaixar os cortes.

## 4. QA de som

- grade da faixa medida com `audio_grade.py` (z ≥ 3);
- tabela evento a evento: corte do líder × ataque mais próximo (meta: ≤ 2 q em 100 % dos líderes);
- LUFS e true peak no MP4 final;
- escuta em mono.

## 5. Espaço para a voz (método do Kivow V9.2)

| Regra | Valor |
|---|---|
| Música sob a voz | −24 LUFS (−18 sem voz), abaixa 6 dB com a voz, ataque 80 ms, liberação 300 ms |
| Impacto em cima de sílaba tônica de palavra-chave | proibido, salvo sincronia de propósito escrita no cue sheet |
| Interface e impactos na faixa 1–4 kHz | 8 dB abaixo da voz |
| Cortes da voz | só em silêncio medido (≤ −40 dB), cada trecho entra num quadro inteiro |
| Inteligibilidade | STOI da voz isolada contra o mix ≥ 0,85, e ≥ 0,80 na simulação de alto-falante de celular (300 Hz a 7 kHz) |
| Voz em português | ElevenLabs no plano pago (a voz brasileira não sai no grátis) |
