import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="figures_container">
        <div className="figures_header">Figures</div>
        <div className="figures">
          <div className="circle"></div>
          <div className="rectangle"></div>
        </div>
      </div>
      <div className="canvas_container">
        <div className="canvas_header">Canvas</div>
        <div className="canvas"></div>
      </div>
    </div>
  );
}

export default App;
