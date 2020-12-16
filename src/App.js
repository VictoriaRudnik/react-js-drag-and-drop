import "./App.css";
import React, { useState } from "react";

function App() {
  const figuresList = {
    circle: {
      color: "red",
      borderRadius: "50%",
      width: 60,
      height: 60,
      border: "1px solid black",
    },
    rectangle: {
      color: "blueviolet",
      borderRadius: "0%",
      width: 90,
      height: 50,
      border: "1px solid black",
    },
  };

  const [figures, setFigures] = useState([]);

  const getStyleForFigure = (dataFigure, index) => {
    const { pageX, pageY, type } = dataFigure;
    console.log("pagex", pageY);
    const figure = figuresList[type];
    console.log("figure", figure);
    return {
      width: figure.width + 'px',
      height: figure.height + 'px',
      border: figure.border,
      backgroundColor: figure.color,
      borderRadius: figure.borderRadius,
      left: pageX,
      top: pageY,
      position: "absolute",
      zIndex: index,
    };
  };

  const dragStartHandler = (e, typeFigure) => {
    e.dataTransfer.setData("type", typeFigure);
    console.log("drag", typeFigure);
  };

  const dragOverHandler = (e) => {
    e.preventDefault();
  };

  const dragDropHandler = (e) => {
    const type = e.dataTransfer.getData("type");
    const figure = figuresList[type]
    const pageX = e.pageX;
    const pageY = e.pageY;
    console.log("width", e);
    const dataFigure = {
      pageX: pageX - (figure.width / 2), //
      pageY: pageY - (figure.height / 2),// 
      type: type,
    };
    setFigures([...figures, dataFigure]);
    console.log("type", figures);
  };

  // const dragLeavetHandler = (e) => {

  // }

  return (
    <div className="App">
      <div className="figures_container">
        <div className="figures_header">Figures</div>
        <div className="figures">
          <div
            className="circle"
            onDragStart={(e) => dragStartHandler(e, "circle")}
            draggable
          ></div>
          <div
            className="rectangle"
            onDragStart={(e) => dragStartHandler(e, "rectangle")}
            draggable
          ></div>
        </div>
      </div>
      <div className="canvas_container">
        <div className="canvas_header">Canvas</div>

        <div
          className="canvas"
          onDragOver={(e) => dragOverHandler(e)}
          onDrop={(e) => dragDropHandler(e)}
        ></div>
      </div>
      {figures.map((figure, index) => {
        return (
          <div
            key={index}
            style={getStyleForFigure(figure, index)}
            onDragOver={(e) => dragOverHandler(e)}
            onDrop={(e) => dragDropHandler(e)}
          />
        );
      })}
    </div>
  );
}

export default App;
