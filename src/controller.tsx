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
}

export const initialState: State = {
  colors: ["green", "yellow", "red", "blue", "white", "violet"],
  secret: ["green", "yellow", "red", "blue"],
  attemps: [],
  secretLength: 4,
  defaultColor: "black",
  attempsCount: 8,
};

export function reducer(state: any, action: any) {
  switch (action.type) {
    case "INCREMENT":
      return { ...state, count: state.count + 1 };
    case "DECREMENT":
      return { ...state, count: state.count - 1 };
    default:
      return state;
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
