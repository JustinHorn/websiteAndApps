import React, { useEffect, useState } from 'react';
import './App.css';

const TILES_SQUARE_ROOT = 9;

const MAP = [...Array(TILES_SQUARE_ROOT).keys()].map((r) =>
  [...Array(TILES_SQUARE_ROOT).keys()].map((c) => ({ r, c }))
);
const TILES = MAP.reduce((p, c) => [...p, ...c]);

const MOVE_TIME = 500;

enum Direction {
  N,
  E,
  S,
  W,
}

const getLeftDirection = (prior: Direction) => {
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
const getRightDirection = (prior: Direction) => {
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

function App() {
  const [gameOver, setGameOver] = useState(false);
  const [snake, setSnake] = useState([{ r: 1, c: 0 }]);
  const [snakeDirection, setSnakeDirection] = useState(Direction.W);
  const [food, setFood] = useState({ r: 2, c: 2 });

  const snakeHead = snake[0];

  const isSnake = (r: number, c: number) =>
    snake.some((s) => s.r === r && s.c === c);
  const isSnakeHead = (r: number, c: number) =>
    snakeHead.c === c && snakeHead.r === r;

  const isFood = (r: number, c: number) => food.c === c && food.r === r;

  const moveSnake = () => {
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
      const freeTiles = TILES.filter(
        (tr, tc) => !snake.some((sr, sc) => sr === tr && tc === sc)
      );

      newSnake = [newHead, ...snake];
      const gameOver = isSnake(newHead.r, newHead.c);
      const newFood = freeTiles[Math.floor(freeTiles.length * Math.random())];

      setFood(newFood);
      setSnake(newSnake);
      setGameOver(gameOver);

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

    setSnake(newSnake);
    setGameOver(gameOver);

    return { newSnake, newFood: food, gameOver };
  };

  let interval: NodeJS.Timeout;

  const changeDirection = (event: KeyboardEvent) => {
    const code = event.code;
    if (code === 'KeyA' || code === 'ArrowLeft') {
      setSnakeDirection(getLeftDirection(snakeDirection));
    } else if (code === 'KeyD' || code === 'ArrowRight') {
      setSnakeDirection(getRightDirection(snakeDirection));
    }
    clearInterval(interval);
  };

  useEffect(() => {
    window.addEventListener('keypress', changeDirection);
    return () => window.removeEventListener('keypress', changeDirection);
  }, [changeDirection]);

  useEffect(() => {
    interval = setInterval(() => moveSnake(), MOVE_TIME);
    return () => clearInterval(interval);
  }, [snakeDirection, moveSnake]);

  useEffect(() => {
    if (gameOver) {
      clearInterval(interval);
      window.removeEventListener('keypress', changeDirection);
    }
  }, [gameOver]);

  return (
    <div className="App">
      <h1>Hello Player</h1>
      {gameOver && <p>Game Over</p>}

      <main>
        <div className="nav">Score: {snake.length}</div>
        <div className="field">
          {MAP.map((r, ri) => (
            <div key={`r_${ri}`} className="row">
              {MAP[ri].map((c, ci) => (
                <div
                  key={`c_${ci}`}
                  className={`cell 
                  ${isSnake(ri, ci) ? ' snake' : ' '}
                  ${isSnakeHead(ri, ci) ? ' snakeHead' : ''} 
                  ${isFood(ri, ci) ? ' food' : ''}`}
                />
              ))}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
