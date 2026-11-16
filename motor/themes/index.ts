import { cadernos } from "./cadernos";

export type Pele = { id: string; palco: string; grao: string };
export const PELES: Record<string, Pele> = { cadernos };
