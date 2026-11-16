# QA forense do nosso render com a MESMA régua usada na referência (00-REFERENCE-FORENSICS):
# vídeo reduzido a 512x910, energia por cartão, cortes, bordas, palco parado, avanço de saída por ECC, quadros pretos.
# uso: python scripts/qa.py <nosso.mp4> <eventos.json> <saida.md>
import sys, json, subprocess
import numpy as np, cv2

V, EV, OUT = sys.argv[1:4]
ev = json.load(open(EV, encoding='utf-8'))
W, H = 512, 910
K = 512 / 1080
p = subprocess.Popen(['ffmpeg', '-v', 'error', '-i', V, '-vf', f'scale={W}:{H}:flags=area', '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-'], stdout=subprocess.PIPE)
fr = []
while True:
    b = p.stdout.read(W * H * 3)
    if len(b) < W * H * 3: break
    fr.append(np.frombuffer(b, np.uint8).reshape(H, W, 3))
n = len(fr)
cart = {s: (int(c['x'] * K), int(c['y'] * K), int((c['x'] + c['w']) * K), int((c['y'] + c['h']) * K)) for s, c in ev['cartoes'].items()}
# núcleos sem a sobreposição (as mesmas regiões da forense da referência)
R = {'A': (40, 175, 240, 500), 'B': (295, 175, 492, 500), 'C': (165, 560, 350, 850), 'T': (85, 55, 420, 135), 'BG': (0, 870, 150, 910)}
d = {k: [0.0] for k in R}
for i in range(1, n):
    a, b = fr[i - 1].astype(np.float32), fr[i].astype(np.float32)
    for k, (x0, y0, x1, y1) in R.items():
        d[k].append(float(np.abs(b[y0:y1, x0:x1] - a[y0:y1, x0:x1]).mean()))
L = [f'# QA medido · {ev["id"]}', '', f'{n} quadros lidos (esperado {ev["quadros"]}).', '']
falhas = 0
def item(okv, txt):
    global falhas
    L.append(f'- [{"x" if okv else " "}] {txt}')
    if not okv: falhas += 1

item(n == ev['quadros'], f'número de quadros: {n} (esperado {ev["quadros"]})')
item(max(d['T']) < 1.5 and max(d['BG']) < 1.0, f'palco parado: título máx {max(d["T"]):.2f}, fundo máx {max(d["BG"]):.2f} (ref 1,5 / 0,3)')
pretos = [i for i in range(n) if fr[i].mean() < 5]
item(not pretos, f'nenhum quadro preto ({len(pretos)})')

# cortes detectados × previstos
L += ['', '## Cortes', '| cartão | previsto | detectado | energia |', '|---|---|---|---|']
for c in ev['cortes']:
    s, q = c['slot'], c['q']
    janela = range(max(1, q - 2), min(n, q + 3))
    det = max(janela, key=lambda i: d[s][i])
    L.append(f'| {s} | {q} | {det} | {d[s][det]:.1f} |')
    item(det == q and d[s][det] > 12, f'{s} q{q}: corte no quadro previsto')
    # os outros cartões não trocam junto (PRD teste 3)
    for o in 'ABC':
        if o == s: continue
        if not any(cc['slot'] == o and abs(cc['q'] - q) <= 1 for cc in ev['cortes']):
            item(d[o][q] < 12, f'{o} não troca junto com {s} q{q} (energia {d[o][q]:.1f})')

# bordas fixas: detecção pela cor do palco nas mesmas linhas da forense
bgc = fr[0][900, 5].astype(np.float32)
def borda(linha):
    dd = np.abs(linha.astype(np.float32) - bgc).sum(axis=1)
    ix = np.where(dd > 40)[0]
    return (int(ix[0]), int(ix[-1])) if len(ix) else (-1, -1)
ax = [borda(f[300, 0:270])[0] for f in fr]
cy = [borda(f[560:910, 256])[1] for f in fr]
item(max(ax) - min(ax) <= 1 and max(cy) - min(cy) <= 1, f'bordas dos cartões fixas: A esquerda {min(ax)}–{max(ax)}, C base {min(cy)}–{max(cy)} (ref 0 px)')

# avanço de saída medido por ECC (mesma régua da ref)
REF = {'curta': ('A157', 1.093, 5.32), 'longa': ('C86', 1.139, 7.19), 'recuo': ('C173', 0.92, -2.99)}
L += ['', '## Saídas (ECC no cartão, 6 passos antes do corte, %/q)', '| corte | preset | passos nossos | avanço nosso | ref |', '|---|---|---|---|---|']
def ecc(a, b):
    ga = cv2.cvtColor(a, cv2.COLOR_RGB2GRAY).astype(np.float32); gb = cv2.cvtColor(b, cv2.COLOR_RGB2GRAY).astype(np.float32)
    M = np.eye(2, 3, dtype=np.float32)
    try:
        _, M = cv2.findTransformECC(ga, gb, M, cv2.MOTION_AFFINE, (cv2.TERM_CRITERIA_EPS | cv2.TERM_CRITERIA_COUNT, 150, 1e-5), None, 5)
        return float(np.log(np.sqrt(abs(np.linalg.det(M[:, :2])))))
    except cv2.error:
        return float('nan')
for c in ev['cortes']:
    if c['preset'] not in REF: continue
    x0, y0, x1, y1 = cart[c['slot']]
    q = c['q']
    passos = [ecc(fr[k - 1][y0:y1, x0:x1].copy(), fr[k][y0:y1, x0:x1].copy()) * 100 for k in range(q - 6, q)]
    tot = float(np.exp(np.nansum(passos) / 100))
    r = REF[c['preset']]
    L.append(f'| {c["slot"]} q{q} | {c["preset"]} | {" ".join(f"{v:+.2f}" for v in passos)} | x{tot:.3f} | {r[0]}: x{r[1]}, último {r[2]:+.2f} |')
    item(abs(tot - r[1]) / r[1] < 0.15, f'{c["slot"]} q{q}: avanço x{tot:.3f} dentro de 15 % da ref ({r[0]} x{r[1]})')

L += ['', f'**Falhas: {falhas}**']
open(OUT, 'w', encoding='utf-8').write('\n'.join(L) + '\n')
print('\n'.join(L))
