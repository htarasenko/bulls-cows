import { Color } from "../utils";
import Ball from "./ball";
import { useMyContext } from "../controller";

interface SelectorProps {
  colors?: Color[];
}

export default function Selector({}: SelectorProps) {
  const { state } = useMyContext() as any;
  console.log(state.colors);
  return (
    <div className="selector">
      {state.colors.map((color: Color) => (
        <Ball key={`selector-${color}`} color={color}></Ball>
      ))}
    </div>
  );
}
