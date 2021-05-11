type FieldProps = {
  map: Tile[][];
  snake: Snake;
  snakeHead: SnakeHead;
  food: Food;
};

const Field = ({ map, snake, snakeHead, food }: FieldProps) => {
  const isSnake = (r: number, c: number) =>
    snake.some((s) => s.r === r && s.c === c);
  const isSnakeHead = (r: number, c: number) =>
    snakeHead.c === c && snakeHead.r === r;

  const isFood = (r: number, c: number) => food.c === c && food.r === r;

  return (
    <div className="field">
      {map.map((r, ri) => (
        <div key={`r_${ri}`} className="row">
          {map[ri].map((c, ci) => (
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
  );
};

export default Field;
