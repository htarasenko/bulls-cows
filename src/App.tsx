import "./App.css";
import Selector from "./components/selector";
import { MyContextProvider } from "./controller";
import Attemps from "./components/attemps";

function App() {
  return (
    <div className="App">
      <MyContextProvider>
        <Attemps />
        <Selector />
      </MyContextProvider>
    </div>
  );
}

export default App;
