import Ball from "./ball";
import { Color } from "../utils";

export default function Attemp({ colors }: { colors: Color[] }) {
  return (
    <>
      {colors.map((color, index) => (
        <Ball key={`ball-${index}`} color={color}></Ball>
      ))}
    </>
  );
}
