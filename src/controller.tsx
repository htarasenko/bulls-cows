import { createContext, useContext, useReducer } from "react";
import { Color } from "./utils";

const MyContext = createContext({});

export function useMyContext() {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error("useCount must be used within a CountProvider");
  }
  return context;
}
export interface State {
  colors: Color[];
  secret: Color[];
  attemps: Color[][];
  secretLength: number;
  defaultColor: Color;
  attempsCount: number;
  activePosition: number[]; // [attempIndex, colorIndex]
}

const SECRET_LENGTH = 4;
const ATTEMPS_COUNT = 8;
const DEFAULT_COLOR: Color = "black";
const COLORS: Color[] = ["green", "yellow", "red", "blue", "white", "violet"];

const createSecret = (): Color[] =>
  new Array(SECRET_LENGTH)
    .fill(DEFAULT_COLOR)
    .map(() => COLORS[Math.floor(Math.random() * COLORS.length)]);

export const initialState: State = {
  colors: ["green", "yellow", "red", "blue", "white", "violet"],
  secret: createSecret(),
  attemps: [],
  secretLength: SECRET_LENGTH,
  defaultColor: DEFAULT_COLOR,
  attempsCount: ATTEMPS_COUNT,
  activePosition: [7, 0],
};

const getNextActive = (
  colors: Color[],
  colomn: number,
  length: number
): number => {
  let next = colomn + 1;
  while (colors[next] !== initialState.defaultColor && next !== colomn) {
    next = (next + 1) % length;
  }
  return next;
};

type Action =
  | { type: "SELECT"; payload: number }
  | { type: "SET_COLOR"; payload: Color }
  | { type: "CHECK" }
  | { type: "RESET" };

export function reducer(state: State, action: Action) {
  switch (action.type) {
    case "SELECT": {
      const newState = { ...state };
      const attempIndex = getAttempIndex(state.activePosition[0]);
      if (
        state.attemps[attempIndex] &&
        state.attemps[attempIndex][action.payload] !== state.defaultColor
      ) {
        const attemp = [...state.attemps[attempIndex]];
        attemp[action.payload] = state.defaultColor;
        newState.attemps = [...state.attemps];
        newState.attemps[attempIndex] = attemp;
      }

      newState.activePosition = [state.activePosition[0], action.payload];
      return newState;
    }
    case "SET_COLOR": {
      const [line, colomn] = state.activePosition;
      const attempIndex = getAttempIndex(line);
      if (!state.attemps[line]) {
        state.attemps.push(
          new Array(state.secretLength).fill(state.defaultColor)
        );
      }
      const colors = state.attemps[attempIndex];
      colors[colomn] = action.payload;
      const attemps = state.attemps.map((attemp, index) =>
        index === attempIndex ? colors : attemp
      );
      return {
        ...state,
        ...attemps,
        activePosition: [
          line,
          getNextActive(colors, colomn, state.secretLength),
        ],
      };
    }
    case "CHECK": {
      return { ...state, activePosition: [state.activePosition[0] - 1, 0] };
    }
    case "RESET": {
      const secret = new Array(state.secretLength)
        .fill(state.defaultColor)
        .map(
          () => state.colors[Math.floor(Math.random() * state.colors.length)]
        );
      return state;
    }
    default:
      return state;
  }
  function getAttempIndex(line: number) {
    return state.attempsCount - 1 - line;
  }
}

export function MyContextProvider(props: any) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <MyContext.Provider value={{ state, dispatch }}>
      {props.children}
    </MyContext.Provider>
  );
}
