import "./App.css";
import React, { useState, useEffect, useRef } from "react";

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

  const [canvasCoordinates, setCanvasCoordinates] = useState();
  const ref = useRef(null);
  useEffect(() => {
    const newCanvasCoordinates = ref.current.getBoundingClientRect();
    setCanvasCoordinates(newCanvasCoordinates);
  }, []);

  const [figures, setFigures] = useState([]);
  const [idFigure, setIdFigure] = useState(0);
  const [zIndex, setZIndex] = useState(0);

  const getStyleForFigure = (dataFigure, index) => {
    let { pageX, pageY, type, zIndex} = dataFigure;
    const figure = figuresList[type];

    if (pageX < canvasCoordinates.x) pageX = canvasCoordinates.x;
    if (pageY < canvasCoordinates.y) {
      pageY = canvasCoordinates.y;
    }
    if (pageX + figure.width > canvasCoordinates.x + canvasCoordinates.width) {
      pageX = canvasCoordinates.x + canvasCoordinates.width - figure.width;
    }
    if (
      pageY + figure.height >
      canvasCoordinates.y + canvasCoordinates.height
    ) {
      pageY = canvasCoordinates.y + canvasCoordinates.height - figure.height;
    }
    return {
      width: figure.width + "px",
      height: figure.height + "px",
      border: figure.border,
      backgroundColor: figure.color,
      borderRadius: figure.borderRadius,
      left: pageX,
      top: pageY,
      position: "absolute",
      zIndex: zIndex,
    };
  };

  const dragStartHandler = (e, typeFigure, idFigure) => {
    e.dataTransfer.setData("type", typeFigure);
    if (idFigure !== undefined) {
      e.dataTransfer.setData("id", idFigure);
      e.target.style.border = "1px solid yellow";
    }
    console.log("id", idFigure);
  };

  const dragOverHandler = (e) => {
    e.preventDefault();
  };

  const dragEndHandler = (e) => {
    e.target.style.border = "1px solid black";
  };

  const dragDropHandler = (e) => {
    const type = e.dataTransfer.getData("type");
    const id = e.dataTransfer.getData("id")
      ? e.dataTransfer.getData("id")
      : null;
    const figure = figuresList[type];

    console.log("id", id);
    let pageX = e.pageX;
    let pageY = e.pageY;
    console.log("event", e);

    const dataFigure = {
      id: idFigure,
      pageX: pageX, //- (figure.width / 2)
      pageY: pageY, //  - (figure.height / 2)
      type: type,
      zIndex: zIndex
    };
    if (id) {
      figures.forEach((item, index) => {
        if (item.id == id) {
          figures.splice(index, 1);
        }
      });
    }
    setFigures([...figures, dataFigure]);
    setIdFigure(idFigure + 1);
    setZIndex(zIndex + 1);
    console.log('zIndex', zIndex)
    console.log("figures", figures);
  };

  const clickHandler = (e) => {
    //e.target.style.border = "1px solid yellow";
    e.target.style.zIndex = zIndex;
    setZIndex(zIndex + 1);
  }

  const handleDelete = (e, idFigure) => {
      figures.filter((figure) => figure.id !== idFigure)
  }

  return (
    <div className="App">
      <div className="figures_container">
        <div className="figures_header">Figures</div>
        <div className="figures">
          <div
            className="circle"
            onDragStart={(e) => dragStartHandler(e, "circle")}
            draggable
            // ref={refCircle}
          ></div>
          <div
            className="rectangle"
            onDragStart={(e) => dragStartHandler(e, "rectangle")}
            draggable
            //ref={refRectangle}
          ></div>
        </div>
      </div>
      <div className="canvas_container">
        <div className="canvas_header">Canvas</div>

        <div
          className="canvas"
          ref={ref}
          onDragOver={(e) => dragOverHandler(e)}
          onDrop={(e) => dragDropHandler(e)}
        ></div>
      </div>
      {figures.map((figure, index) => {
        return (
          <div
            className="canvas"
            onDragOver={(e) => dragOverHandler(e)}
            onDrop={(e) => dragDropHandler(e)}
            key={index}
            style={getStyleForFigure(figure, index)}
            onDragStart={(e) => dragStartHandler(e, figure.type, figure.id)}
            onDragEnd={(e) => dragEndHandler(e)}
            onClick={(e) => clickHandler(e)}
            onDelete={(e) => handleDelete(e, figure.id)}
            draggable
          >
            
          </div>
        );
      })}
    </div>
  );
}

export default App;
