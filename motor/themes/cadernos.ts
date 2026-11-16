// Pele "Cadernos do Caminho" (01-ART-DIRECTION §1). Só dados.
export const cadernos = {
  id: "cadernos",
  palco: "#1F1E1C",
  grao: "cadernos-c02/grao.png",
  superficies: { light: "#EEE9DF", dark: "#262522", accent: "#C0301A" },
  tinta: { primary: "#1F1E1C", inverse: "#EEE9DF" },
  acento: "#C0301A",
  fibra: "#F4F0E7",
  fontes: { display: "League Gothic", serif: "Instrument Serif", body: "DM Sans", label: "IBM Plex Mono" },
  cartao: { raio: 36, sombra: "0px 8px 24px rgba(0,0,0,0.35)" },
  doisTempos: true,
  borda: "torn" as const,
};
