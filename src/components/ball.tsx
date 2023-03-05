import { Color } from "../utils";

// a simple ball component
export default function Ball({
  color,
  selected = false,
  clickHandler = () => {},
}: {
  color: Color;
  selected?: boolean;
  clickHandler?: () => void;
}) {
  const classNames = `ball ball-color-${color} active-ball ${
    selected ? "ball-selected" : ""
  }`;
  return <div className={classNames} onClick={clickHandler}></div>;
}
