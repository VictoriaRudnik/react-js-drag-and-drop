import "./App.css";
import React, { useState } from "react";
import { FiguresField } from "./components/figuresLayout/FiguresLayout";
import { CanvasField } from "./components/canvasLayout/CanvasLayout";
import { ImportExport } from "./components/jsonLoader/JsonLoader";

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
      <ImportExport figures={figures} setFigures={setFigures} />
      <div className="App">
        <FiguresField dragStartHandler={dragStartHandler} />
        <CanvasField
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
