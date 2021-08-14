import React from "react";

import { useSelector, useDispatch } from "react-redux";

import { increment, decrement } from "actions";

function App() {
  const counter = useSelector((state) => state.counter);

  const dispatch = useDispatch();

  return (
    <div className="App">
      <h1>{counter}</h1>
      <button onClick={() => dispatch(increment())}> Increment</button>
      <button onClick={() => dispatch(decrement())}> Decrement</button>
    </div>
  );
}

export default App;
