# QA medido · CadernosC02Trio

210 quadros lidos (esperado 210).

- [x] número de quadros: 210 (esperado 210)
- [x] palco parado: título máx 0.02, fundo máx 0.02 (ref 1,5 / 0,3)
- [x] nenhum quadro preto (0)

## Cortes
| cartão | previsto | detectado | energia |
|---|---|---|---|
| A | 72 | 72 | 66.8 |
- [x] A q72: corte no quadro previsto
- [x] B não troca junto com A q72 (energia 0.6)
- [x] C não troca junto com A q72 (energia 0.1)
| A | 157 | 157 | 121.1 |
- [x] A q157: corte no quadro previsto
- [x] B não troca junto com A q157 (energia 0.0)
- [x] C não troca junto com A q157 (energia 0.5)
| B | 87 | 87 | 75.2 |
- [x] B q87: corte no quadro previsto
- [x] A não troca junto com B q87 (energia 0.0)
| B | 161 | 161 | 53.5 |
- [x] B q161: corte no quadro previsto
- [x] A não troca junto com B q161 (energia 4.4)
- [x] C não troca junto com B q161 (energia 0.2)
| C | 86 | 86 | 61.0 |
- [x] C q86: corte no quadro previsto
- [x] A não troca junto com C q86 (energia 0.3)
| C | 177 | 177 | 54.1 |
- [x] C q177: corte no quadro previsto
- [x] A não troca junto com C q177 (energia 0.9)
- [x] B não troca junto com C q177 (energia 2.5)
- [ ] bordas dos cartões fixas: A esquerda -1–132, C base 300–300 (ref 0 px)

## Saídas (ECC no cartão, 6 passos antes do corte, %/q)
| corte | preset | passos nossos | avanço nosso | ref |
|---|---|---|---|---|
| A q157 | curta | +0.01 +0.16 +0.11 +0.51 +1.21 +6.73 | x1.091 | A157: x1.093, último +5.32 |
- [x] A q157: avanço x1.091 dentro de 15 % da ref (A157 x1.093)
| C q86 | longa | +0.29 +0.46 +0.67 +1.00 +2.08 +5.52 | x1.106 | C86: x1.139, último +7.19 |
- [x] C q86: avanço x1.106 dentro de 15 % da ref (C86 x1.139)
| C q177 | recuo | -0.25 -0.30 -0.43 -0.63 -1.25 -3.49 | x0.939 | C173: x0.92, último -2.99 |
- [x] C q177: avanço x0.939 dentro de 15 % da ref (C173 x0.92)

**Falhas: 1**

## Determinismo
- diferença máxima still × render em pedaço no q175: 0

## Loudness (arquivo final)
- [Parsed_ebur128_0 @ 0x7e1408001a40] t: 6.999979   TARGET:-23 LUFS    M: -18.4 S: -14.4     I: -14.4 LUFS       LRA:   0.4 LU  FTPK: -10.8  -9.8 dBFS  TPK:  -1.4  -1.3 dBFS
-     I:         -14.4 LUFS
-     LRA:         0.4 LU
-     Peak:       -1.3 dBFS

## Medidor
**Falhas críticas: 0**
