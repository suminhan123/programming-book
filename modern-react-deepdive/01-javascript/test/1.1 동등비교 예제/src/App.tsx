import { useState } from "react";
import Component from "./components/Component";
import DeeperComponent from "./components/DeeperComponent";

function App() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setCount] = useState(0);

  const handleClick = () => {
    setCount((prev) => prev + 1);
  };
  return (
    <>
      <Component counter={100} />
      <DeeperComponent counter={{ counter: 100 }} />
      <button onClick={handleClick}>+</button>
    </>
  );
}

export default App;
