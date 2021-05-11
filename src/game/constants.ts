export const TILES_SQUARE_ROOT = 9;

export const MAP = [...Array(TILES_SQUARE_ROOT).keys()].map((r) =>
  [...Array(TILES_SQUARE_ROOT).keys()].map((c) => ({ r, c }))
);
export const TILES = MAP.reduce((p, c) => [...p, ...c]);

export const MOVE_TIME = 500;

export enum Direction {
  N,
  E,
  S,
  W,
}
