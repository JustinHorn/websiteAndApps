import { Direction, TILES, TILES_SQUARE_ROOT } from './constants';

export const getLeftDirection = (prior: Direction) => {
  switch (prior) {
    case Direction.N:
      return Direction.W;
    case Direction.E:
      return Direction.N;
    case Direction.S:
      return Direction.E;
    case Direction.W:
      return Direction.S;
  }
};
export const getRightDirection = (prior: Direction) => {
  switch (prior) {
    case Direction.N:
      return Direction.E;
    case Direction.E:
      return Direction.S;
    case Direction.S:
      return Direction.W;
    case Direction.W:
      return Direction.N;
  }
};

export const moveSnake = (
  snakeHead: any,
  food: any,
  snakeDirection: Direction,
  snake: any[]
) => {
  const isSnake = (r: number, c: number) =>
    snake.some((s) => s.r === r && s.c === c);

  const isFood = (r: number, c: number) => food.c === c && food.r === r;

  const newHead = { ...snakeHead };
  if (snakeDirection === Direction.N) newHead.r = newHead.r - 1;
  if (snakeDirection === Direction.E) newHead.c = newHead.c + 1;
  if (snakeDirection === Direction.S) newHead.r = newHead.r + 1;
  if (snakeDirection === Direction.W) newHead.c = newHead.c - 1;

  newHead.r >= TILES_SQUARE_ROOT && (newHead.r = 0);
  newHead.r <= -1 && (newHead.r = TILES_SQUARE_ROOT - 1);
  newHead.c >= TILES_SQUARE_ROOT && (newHead.c = 0);
  newHead.c <= -1 && (newHead.c = TILES_SQUARE_ROOT - 1);

  const headOnFood = isFood(snakeHead.r, snakeHead.c);

  let newSnake: { r: number; c: number }[] = [];

  if (headOnFood) {
    newSnake = [newHead, ...snake];
    const gameOver = isSnake(newHead.r, newHead.c);
    const newFood = nextFood(newSnake, TILES);

    return { newFood, newSnake, gameOver };
  }

  const newTail = snake.slice(1);

  for (let i = newTail.length - 1; i > 0; i--) {
    newTail[i].r = newTail[i - 1].r;
    newTail[i].c = newTail[i - 1].c;
  }
  newTail.length > 0 && (newTail[0] = { ...snakeHead });

  newSnake = [newHead, ...newTail];

  const gameOver = newTail.some(
    ({ r, c }, i) => newHead.r === r && newHead.c === c
  );

  return { newSnake, newFood: food, gameOver };
};

export const nextFood = (snake: Snake, TILES: Tile[]) => {
  const freeTiles = TILES.filter(
    (tr, tc) => !snake.some((sr, sc) => sr === tr && tc === sc)
  );
  const newFood = freeTiles[Math.floor(freeTiles.length * Math.random())];
  return newFood;
};
