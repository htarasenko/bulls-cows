import { Color } from "../utils";
import Ball from "./ball";
import { useMyContext } from "../controller";

interface SelectorProps {
  colors?: Color[];
}

export default function Selector({}: SelectorProps) {
  const { state, dispatch } = useMyContext() as any;
  return (
    <div className="selector">
      {state.colors.map((color: Color) => (
        <Ball
          key={`selector-${color}`}
          color={color}
          clickHandler={() => dispatch({ type: "SET_COLOR", payload: color })}
        ></Ball>
      ))}
    </div>
  );
}
