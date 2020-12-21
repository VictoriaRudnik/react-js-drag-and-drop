import "./App.css";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { FiguresField } from "./components/FiguresField";
import { CanvasField } from "./components/CanvasField";

function App() {
  const [selectedFigure, setSelectedFigure] = useState();

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
    <div className="App">
      <FiguresField dragStartHandler={dragStartHandler} />
      <CanvasField
        selectedFigure={selectedFigure}
        setSelectedFigure={setSelectedFigure}
      />
    </div>
  );
}

export default App;
