# Som do motor (05-SOUND-DIRECTION): trilha recortada na grade medida + efeitos de matéria sintetizados (determinísticos).
# A música faz o trabalho; efeito só em evento de matéria da pele (papel), baixo, um de cada vez. Nada de whoosh por troca.
# uso: python sound/som.py <eventos.json> <pasta public> <saida.wav>
import json, sys, subprocess, tempfile, os
import numpy as np
import scipy.io.wavfile as wf
from scipy.signal import butter, sosfilt

EV, PUB, OUT = sys.argv[1:4]
SR = 48000
ev = json.load(open(EV, encoding='utf-8'))
dur = ev['duracaoMs'] / 1000
N = int(round(dur * SR))
mix = np.zeros((N, 2))

# ---------------------------------------------------------------- trilha
m = ev.get('musica')
if m:
    tmp = os.path.join(tempfile.gettempdir(), 'trilha_recorte.wav')
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-ss', f"{m['offsetMs'] / 1000:.3f}", '-t', f'{dur + 0.1:.3f}',
                    '-i', os.path.join(PUB, m['src']), '-ac', '2', '-ar', str(SR), tmp], check=True)
    sr, x = wf.read(tmp)
    x = x.astype(np.float64) / (32768.0 if x.dtype == np.int16 else 1.0)
    x = x[:N]
    mix[:len(x)] += x * 10 ** (m.get('gainDb', 0) / 20)
    fo = int(m.get('fadeOutMs', 250) / 1000 * SR)
    mix[-fo:] *= np.linspace(1, 0, fo)[:, None] ** 1.5

# ---------------------------------------------------------------- efeitos de papel (semente fixa = mesmo som em todo render)
def banda(x, lo, hi):
    return sosfilt(butter(4, [lo, hi], btype='band', fs=SR, output='sos'), x)

def env(n, ataque, queda):
    t = np.arange(n) / SR
    return np.minimum(1, t / max(ataque, 1e-4)) * np.exp(-np.maximum(0, t - ataque) / queda)

def sfx(nome, durMs, semente):
    r = np.random.default_rng(semente)
    n = int(max(durMs, 120) / 1000 * SR)
    t = np.arange(n) / SR
    if nome == 'papel-virada':   # folha virando: ruído de banda alta com varredura
        x = banda(r.standard_normal(n), 1200, 7000) * env(n, 0.006, 0.09)
        x += banda(r.standard_normal(n), 300, 1200) * env(n, 0.015, 0.05) * 0.4
    elif nome == 'papel-baque':  # papel pesado pousando: baque grave curto + transiente
        f = 95 * np.exp(-t / 0.08) + 50
        x = np.sin(2 * np.pi * np.cumsum(f) / SR) * env(n, 0.002, 0.11) * 0.9
        x += banda(r.standard_normal(n), 800, 5000) * env(n, 0.001, 0.025) * 0.5
    elif nome == 'fita-pousa':   # fita adesiva assentando: toque seco
        x = banda(r.standard_normal(n), 2000, 6000) * env(n, 0.001, 0.02)
        x += np.sin(2 * np.pi * 180 * t) * env(n, 0.001, 0.03) * 0.3
    elif nome == 'pena':         # pena riscando o círculo: grãos ásperos
        graos = (r.random(n) < 0.004).astype(float) * r.uniform(0.3, 1, n)
        x = banda(graos + r.standard_normal(n) * 0.05, 2500, 9000) * np.sin(np.pi * np.clip(t / (durMs / 1000), 0, 1)) ** 0.7
    elif nome == 'papel-rasgo':  # rasgo curto: estalos com densidade em arco
        dens = np.sin(np.pi * np.clip(t / (durMs / 1000), 0, 1)) ** 1.2
        estalos = (r.random(n) < 0.02 * dens).astype(float) * r.uniform(0.2, 1, n)
        x = banda(estalos + r.standard_normal(n) * 0.25 * dens, 700, 6000)
    else:
        x = np.zeros(n)
    return x / (np.max(np.abs(x)) + 1e-9)

for i, e in enumerate(ev['efeitos']):
    x = sfx(e['id'], e['durMs'], 1000 + i) * 10 ** (e['db'] / 20)
    a = int(e['atMs'] / 1000 * SR)
    b = min(N, a + len(x))
    if a < N:
        mix[a:b, 0] += x[:b - a] * 0.96
        mix[a:b, 1] += x[:b - a] * 1.0

pico = np.max(np.abs(mix))
if pico > 0.98:
    mix *= 0.98 / pico
wf.write(OUT, SR, (mix * 32767).astype(np.int16))
print('som ->', OUT, f'{dur:.2f} s, pico {20 * np.log10(pico + 1e-9):.1f} dBFS, efeitos {len(ev["efeitos"])}')
