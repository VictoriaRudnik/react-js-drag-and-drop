import "./App.css";
import React, { useState } from "react";
import { FiguresField } from "./components/figuresField/FiguresField";
import { CanvasField } from "./components/canvasField/CanvasField";
import { ImportExport } from "./components/importExportFile/ImportExport";

function App() {
  const [selectedFigure, setSelectedFigure] = useState();
  const [figures, setFigures] = useState([]);

  const dragStartHandler = (e, typeFigure, figure) => {
    e.dataTransfer.setData("type", typeFigure);
    e.dataTransfer.setData("figure", figure);
    if (figure !== undefined) {
      e.dataTransfer.setData("id", figure.id);
      e.target.style.border = "3px solid grey";
    }
    console.log("figure  sel", figure);
    setSelectedFigure(null);
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
        />
      </div>
    </div>
  );
}

export default App;
