import { Direction, MOVE_TIME } from 'game/constants';
import { getLeftDirection, getRightDirection, moveSnake } from 'game/functions';
import { useEffect, useState } from 'react';

const useGameHook = () => {
  const [gameOver, setGameOver] = useState(false);
  const [snake, setSnake] = useState([{ r: 1, c: 0 }]);
  const [snakeDirection, setSnakeDirection] = useState(Direction.W);
  const [food, setFood] = useState({ r: 2, c: 2 });

  const snakeHead = snake[0];

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
    nextRound.gameOver && setGameOver(nextRound.gameOver);
  };

  useEffect(() => {
    !gameOver && window.addEventListener('keypress', changeDirection);
    return () => window.removeEventListener('keypress', changeDirection);
  }, [changeDirection, gameOver]);

  useEffect(() => {
    if (!gameOver) {
      interval = setInterval(
        () => {
          const nextRound = moveSnake(snakeHead, food, snakeDirection, snake);
          setSnake(nextRound.newSnake);
          setFood(nextRound.newFood);

          nextRound.gameOver && setGameOver(nextRound.gameOver);
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

  return { snake, gameOver, snakeHead, food };
};

export default useGameHook;
