import Attemp from "./attemp";
import Monitor from "./monitor";
import { useMyContext, State } from "../controller";

export default function Attemps() {
  const { state } = useMyContext() as { state: State };
  const attemps: State["attemps"] = [];
  for (let i = 0; i < state.attempsCount; i++) {
    attemps.unshift(
      state.attemps[i] || new Array(state.secretLength).fill(state.defaultColor)
    );
  }
  return (
    <>
      {attemps.map((attemp, index) => (
        <div key={`attemp-line-${index}`} className="attemp">
          <Monitor index={index} />
          <Attemp
            colors={attemp}
            isActive={index === state.activePosition[0]}
            selectedIndex={state.activePosition[1]}
          />
        </div>
      ))}
    </>
  );
}
