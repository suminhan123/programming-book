import { memo, useEffect } from "react";

type DeeperProps = {
  counter: {
    counter: number;
  };
};
const DeeperComponent = memo((props: DeeperProps) => {
  useEffect(() => {
    console.log("DeeperComponent has been rendered");
  });
  return <h1>{props.counter.counter}</h1>;
});
export default DeeperComponent;
