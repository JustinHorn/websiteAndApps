import { Direction, MOVE_TIME, MAP } from 'game/constants';
import { getLeftDirection, getRightDirection, moveSnake } from 'game/functions';
import React, { useEffect, useState } from 'react';
import './App.css';

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

  let interval: NodeJS.Timeout;

  const changeDirection = (event: KeyboardEvent) => {
    clearInterval(interval);

    const code = event.code;
    let nextDirection = snakeDirection;
    if (code === 'KeyA' || code === 'ArrowLeft') {
      nextDirection = getLeftDirection(snakeDirection);
    } else if (code === 'KeyD' || code === 'ArrowRight') {
      nextDirection = getRightDirection(snakeDirection);
    }

    const nextRound = moveSnake(snakeHead, food, nextDirection, snake);
    setSnake(nextRound.newSnake);
    setFood(nextRound.newFood);
    setSnakeDirection(nextDirection);
    setGameOver(nextRound.gameOver);
  };

  useEffect(() => {
    window.addEventListener('keypress', changeDirection);
    return () => window.removeEventListener('keypress', changeDirection);
  }, [changeDirection]);

  useEffect(() => {
    if (!gameOver) {
      interval = setInterval(
        () => {
          const nextRound = moveSnake(snakeHead, food, snakeDirection, snake);
          setSnake(nextRound.newSnake);
          setFood(nextRound.newFood);

          setGameOver(nextRound.gameOver);
        },

        MOVE_TIME
      );
      return () => clearInterval(interval);
    }
  }, [snakeDirection, snakeHead, food, snake]);

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
