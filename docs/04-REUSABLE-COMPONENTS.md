# 04 · Componentes reutilizáveis (React / Remotion)

Princípio: **o pôster é dado, não código.** Um assunto novo = um JSON de projeto + uma pele + assets. Nenhum componente tem nome de tema.

## 1. Tipos

```ts
type LayoutMode = 'trio-showcase' | 'editorial-story' | 'hybrid-explainer';
type SlotId = 'A' | 'B' | 'C';

type Skin = {
  id: string;
  stage: {bg: string; grain?: string};
  card: {radius: number; shadow: string};
  surfaces: Record<'light' | 'dark' | 'accent', string>;
  ink: {primary: string; inverse: string};
  accent: string;
  fonts: Record<'display' | 'serif' | 'body' | 'label', string>;
  header: {kicker: string; title: string};
  signature?: {src: string; x: number; y: number; w: number};
  edge?: 'round' | 'torn';          // borda das peças de papel dentro do pôster
  twoStep?: boolean;                 // pose de recortes a cada 2 q (Cadernos G1)
};

type Layer =
  | {kind: 'image'; id: string; src: string; box: Box; fit: 'cover' | 'contain'; z: number; pin?: Pt; breathe?: Breathe; torn?: TornEdge}
  | {kind: 'text'; id: string; text: string; role: 'display' | 'serif' | 'body' | 'label'; size: number; box: Box; color: string; z: number}
  | {kind: 'tag'; id: string; text: string; box: Box; fill: string; color: string; z: number}
  | {kind: 'line'; id: string; path: string; stroke: string; width: number; z: number}
  | {kind: 'rect'; id: string; box: Box; fill: string; z: number};

type Poster = {
  id: string;                        // ex.: 'A1-pedras'
  surface: 'light' | 'dark' | 'accent';
  layers: Layer[];                   // coordenadas no tamanho do cartão
  hero: string;                      // id da camada que chega com velocidade
  drift: number;                     // %/q, negativo = recua
  readingPriority: 'essential' | 'atmospheric';
  source?: string;                   // nó do Figma de onde saiu
};

type MotionEvent = {
  atMs: number;
  slot: SlotId;
  action: 'exit-pulse' | 'cut' | 'hero-arrive' | 'kicker-words' | 'title-letters' | 'title-outline' | 'tag' | 'line-draw' | 'band-drop';
  target?: string;                   // id da camada
  preset: string;                    // 'curta' | 'longa' | 'recuo' | 'chicote' | 'potencia' | 'queda' ...
  params?: Record<string, number>;
  toPoster?: string;                 // só em 'cut'
  sfx?: string;
};

type Project = {
  id: string; theme: string; skin: string; mode: LayoutMode;
  canvas: {width: number; height: number; fps: number; durationMs: number};
  posters: Poster[];
  tracks: {slot: SlotId; initial: string; events: MotionEvent[]}[];
  audio: {music?: string; bpm?: number; downbeatMs?: number; events: MotionEvent[]};
};
```

## 2. Árvore

```
<MotionMaster project skin>              composição única, recebe o JSON
  <Backdrop/>                            fundo + grão do palco
  <SeriesHeader/>                        título fixo (kicker itálico + título)
  <SlotLayout mode>                      geometria do modo (02-LAYOUT)
    <PosterSlot id="C"/>                 máscara arredondada + sombra fixas
    <PosterSlot id="A"/>
    <PosterSlot id="B"/>
      <PosterCamera state>               deriva + pulso de saída (escala com ponto fixo a 30 %)
        <PosterLayer poster>             desenha as camadas do pôster ativo
          <ImageLayer/> <TextReveal/> <Tag/> <LineDraw/> <TornEdge/>
  <Signature/>
  <AudioTimeline/>                       música + efeitos com tempo em ms
```

## 3. Funções puras (motion/)

Base: o motor do Caderno 02 (`engine.ts`, `sinais.ts`, `rasgo.ts`, `medir.mjs`), já medido e renderizado na nuvem. Mapa completo em [09](09-HERANCA-CADERNO-02.md).


| Arquivo | Funções |
|---|---|
| `math.ts` | `potencia(t, D, n)`, `hiperbolico(q, tp, n, c)`, `mola(f, w0, zeta)`, `ruido(seed, t)` |
| `schedule.ts` | `msToFrame`, `rodada(liderMs, ordem, atrasos)` gera eventos de cascata |
| `slot-state.ts` | `resolveSlot(track, frame)` devolve pôster ativo, fase, u, deriva acumulada |
| `presets.ts` | tabelas de 03-MOTION-GRAMMAR (curta, longa, recuo, chicote, potência, queda, palavra, letra, etiqueta, fio) |
| `camera.ts` | escala e translação do pôster a partir de deriva + pulso |

## 4. O que nunca entra no componente

Nome de tema, texto, cor literal, caminho de imagem, número mágico de quadro. Tudo vem do projeto ou da pele.

## 5. Do Figma para o JSON

Cada pôster é um frame do Figma no tamanho do cartão (ver [06](06-FIGMA-STORYBOARD.md)). Um script lê o frame pela REST (camadas, caixas, textos, fills de imagem) e escreve o `Poster`. Assim o código anima exatamente o quadro aprovado, sem recompor no código.
