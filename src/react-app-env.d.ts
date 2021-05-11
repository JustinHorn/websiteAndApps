/// <reference types="react-scripts" />

interface Tile {
  r: number;
  c: number;
}

type Snake = Tile[];

type SnakeHead = Tile;

type Food = Tile;
