// Biblioteca de fontes do motor (Google Fonts pelo Remotion). A pele escolhe; aqui só se carrega.
import { loadFont as leagueGothic } from "@remotion/google-fonts/LeagueGothic";
import { loadFont as instrumentSerif } from "@remotion/google-fonts/InstrumentSerif";
import { loadFont as ibmPlexMono } from "@remotion/google-fonts/IBMPlexMono";
import { loadFont as dmSans } from "@remotion/google-fonts/DMSans";

const sub: ("latin" | "latin-ext")[] = ["latin", "latin-ext"];
const lg = leagueGothic("normal", { weights: ["400"], subsets: sub });
const isI = instrumentSerif("italic", { weights: ["400"], subsets: sub });
instrumentSerif("normal", { weights: ["400"], subsets: sub });
const plex = ibmPlexMono("normal", { weights: ["400", "500", "600"], subsets: sub });
const dm = dmSans("normal", { weights: ["400", "500", "700"], subsets: sub });

const MAPA: Record<string, string> = {
  "League Gothic": lg.fontFamily,
  "Instrument Serif": isI.fontFamily,
  "IBM Plex Mono": plex.fontFamily,
  "DM Sans": dm.fontFamily,
};
export const familia = (nome: string) => MAPA[nome] ?? nome;
