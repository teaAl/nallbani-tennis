export interface Court {
  active: boolean;
  id: string;
  indoor: boolean;
  name: string;
  type: CourtSurface;
}

export enum CourtSurface {
  CLAY = "CLAY",
  GRASS = "GRASS",
  HARD = "HARD",
}
