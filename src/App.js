import "./App.css";
import React, { useState } from "react";
import { FiguresLayout } from "./components/figuresLayout/FiguresLayout";
import { CanvasLayout } from "./components/canvasLayout/CanvasLayout";
import { JsonLoader } from "./components/jsonLoader/JsonLoader";

function App() {
  const [selectedFigure, setSelectedFigure] = useState();
  const [figures, setFigures] = useState([]);

  const dragStartHandler = (e, typeFigure, figure) => {
    e.dataTransfer.setData("type", typeFigure);
    e.dataTransfer.setData("figure", figure);
    if (figure !== undefined) {
      e.dataTransfer.setData("id", figure.id);
      e.target.style.border = "3px solid grey";
      setSelectedFigure(figure);
    } else setSelectedFigure(null);
  };

  return (
    <div className="container">
      <JsonLoader figures={figures} setFigures={setFigures} />
      <div className="App">
        <FiguresLayout dragStartHandler={dragStartHandler} />
        <CanvasLayout
          selectedFigure={selectedFigure}
          setSelectedFigure={setSelectedFigure}
          figures={figures}
          setFigures={setFigures}
          dragStartHandler={dragStartHandler}
        />
      </div>
    </div>
  );
}

export default App;
