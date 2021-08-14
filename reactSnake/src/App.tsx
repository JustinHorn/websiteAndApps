import Field from 'component/Field';
import { MAP } from 'game/constants';

import useGameHook from 'hooks/useGameHook';
import './App.css';

function App() {
  const { gameOver, snake, snakeHead, food, restart } = useGameHook();
  return (
    <div className="App">
      <h1>Hello Player</h1>
      {gameOver && (
        <p>
          Game Over <button onClick={restart}>Restart</button>
        </p>
      )}

      <main>
        <div className="nav">Score: {snake.length}</div>
        <Field map={MAP} snake={snake} snakeHead={snakeHead} food={food} />
      </main>
    </div>
  );
}

export default App;
