import type { VideoProject } from "../schemas/project.schema";
import { cadernosC02Trio } from "./cadernos-c02-trio";

export const PROJETOS: Record<string, VideoProject> = {
  [cadernosC02Trio.id]: cadernosC02Trio,
};
