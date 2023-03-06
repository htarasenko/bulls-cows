import { Color } from "../utils";
import { useMyContext, State } from "../controller";

export default function Monitor({ index }: { index: number }) {
  const { state, dispatch } = useMyContext() as { state: State; dispatch: any };

  const isActive = index === state.activePosition[0];
  const colors = state.attemps[state.attempsCount - 1 - index];
  const everyColor =
    colors && colors.every((color) => color !== state.defaultColor);
  const classNames = `ball ${
    everyColor
      ? "enabled-text ball-color-green"
      : "disabled-text ball-color-gray"
  }`;
  const check = everyColor ? () => dispatch({ type: "CHECK" }) : () => {};
  const isPast = !isActive && everyColor;
  const { bulls, cows, none } = getBullsAndCows(state.secret, colors);

  return isPast ? (
    <Dots bulls={bulls} cows={cows} none={none} />
  ) : (
    <div className={classNames} onClick={check}>
      GO
    </div>
  );
}

function Dots({
  bulls,
  cows,
  none,
}: {
  bulls: number;
  cows: number;
  none: number;
}) {
  return (
    <div className="monitor-container">
      {new Array(bulls).fill(true).map((_, i) => (
        <div
          key={`monitor-dot-${i}`}
          className="monitor-dot monitor-dot-good"
        />
      ))}
      {new Array(cows).fill(true).map((_, i) => (
        <div key={`monitor-dot-${i}`} className="monitor-dot monitor-dot-bad" />
      ))}
      {new Array(none).fill(true).map((_, i) => (
        <div
          key={`monitor-dot-${i}`}
          className="monitor-dot monitor-dot-null"
        />
      ))}
    </div>
  );
}

function getBullsAndCows(
  secret: Color[],
  colors: Color[]
): { bulls: number; cows: number; none: number } {
  if (!colors) return { bulls: 0, cows: 0, none: secret.length };
  const colorsLeft: Color[] = [];
  const secretsUsed: [Color, boolean][] = [];
  const bulls = colors.filter((color, index) => {
    if (color === secret[index]) {
      return true;
    }
    colorsLeft.push(color);
    secretsUsed.push([secret[index], false]);
    return false;
  }).length;

  const cows = colorsLeft.filter((color) => {
    const index = secretsUsed.findIndex(
      (secret) => secret[0] === color && !secret[1]
    );
    if (index !== -1) {
      secretsUsed[index][1] = true;
      return true;
    }
    return false;
  }).length;

  const none = secret.length - bulls - cows;
  return { bulls, cows, none };
}
