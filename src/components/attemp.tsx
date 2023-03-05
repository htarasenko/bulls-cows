import Ball from "./ball";
import { Color } from "../utils";
import { useMyContext } from "../controller";

export default function Attemp({
  colors,
  isActive,
  selectedIndex,
}: {
  colors: Color[];
  isActive: boolean;
  selectedIndex: number;
}) {
  const { dispatch } = useMyContext() as any;
  return (
    <>
      {colors.map((color, index) => (
        <Ball
          key={`ball-${index}`}
          color={color}
          selected={isActive && index === selectedIndex}
          clickHandler={
            isActive
              ? () => dispatch({ type: "SELECT", payload: index })
              : undefined
          }
        ></Ball>
      ))}
    </>
  );
}
