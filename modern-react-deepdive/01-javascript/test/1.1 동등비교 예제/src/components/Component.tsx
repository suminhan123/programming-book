import { memo, useEffect } from "react";

type Props = { counter: number };

const Component = memo((props: Props) => {
  useEffect(() => {
    console.log("Component has been rendered");
  });
  return <h1>{props.counter}</h1>;
});
export default Component;
