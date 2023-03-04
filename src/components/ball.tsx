import { Color } from "../utils";

// a simple ball component
export default function Ball({ color }: { color: Color }) {
  const classNames = `ball ball-color-${color}`;
  return <div className={classNames}></div>;
}
