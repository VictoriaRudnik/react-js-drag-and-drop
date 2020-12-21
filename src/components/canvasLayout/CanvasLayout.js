import React, { useState, useEffect, useRef, useCallback } from "react";
import "./style.css";

export const CanvasLayout = (props) => {
  const {
    selectedFigure,
    setSelectedFigure,
    figures,
    setFigures,
    dragStartHandler,
  } = props;

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

  const [idFigure, setIdFigure] = useState(0);
  const [zIndex, setZIndex] = useState(0);
  const [canvasCoordinates, setCanvasCoordinates] = useState();

  const canvasLayoutRef = useRef(null);

  useEffect(() => {
    const newCanvasCoordinates = canvasLayoutRef.current.getBoundingClientRect();
    setCanvasCoordinates(newCanvasCoordinates);
    setFigures(JSON.parse(localStorage.getItem("figures")));
    setIdFigure(JSON.parse(localStorage.getItem("idFigure")));
    setZIndex(JSON.parse(localStorage.getItem("zIndex")));
  }, [setCanvasCoordinates, setFigures, setIdFigure, setZIndex]);

  useEffect(() => {
    localStorage.setItem("figures", JSON.stringify(figures));
    localStorage.setItem("idFigure", JSON.stringify(idFigure));
    localStorage.setItem("zIndex", JSON.stringify(zIndex));
  }, [figures, idFigure, zIndex]);

  const getStyleForFigure = (dataFigure, index) => {
    let { pageX, pageY, type, zIndex } = dataFigure;
    const { x, y, height, width } = canvasCoordinates;
    const figure = figuresList[type];

    if (pageX < x) pageX = x;
    if (pageY < y) {
      pageY = y;
    }
    if (pageX + figure.width > x + width) {
      pageX = x + width - figure.width;
    }
    if (pageY + figure.height > y + height) {
      pageY = y + height - figure.height - 1;
    }
    let border = figure.border;
    if (selectedFigure) {
      border =
        dataFigure.id === selectedFigure.id ? "3px solid grey" : figure.border;
    }
    return {
      width: figure.width + "px",
      height: figure.height + "px",
      border: border,
      backgroundColor: figure.color,
      borderRadius: figure.borderRadius,
      left: pageX,
      top: pageY,
      position: "absolute",
      zIndex: zIndex,
      outline: "none",
    };
  };

  const dragOverHandler = (e) => {
    e.preventDefault();
  };

  const dragLeaveHandler = (e) => {
    deleteFigure(e);
  };

  const dragDropHandler = (e) => {
    const type = e.dataTransfer.getData("type");
    const figure = figuresList[type];
    let pageX = e.pageX;
    let pageY = e.pageY;

    const dataFigure = {
      id: idFigure,
      pageX: pageX - figure.width / 3,
      pageY: pageY - figure.height / 3,
      type: type,
      zIndex: zIndex,
    };
    if (selectedFigure) {
      figures.forEach((item, index) => {
        if (item.id === selectedFigure.id) {
          figures.splice(index, 1);
        }
      });
    }
    setFigures([...figures, dataFigure]);
    setIdFigure(idFigure + 1);
    setZIndex(zIndex + 1);
    setSelectedFigure(null);
  };

  const clickHandler = (e, figure) => {
    e.target.style.zIndex = zIndex;
    figures.forEach((item) => {
      if (item === figure) {
        item.zIndex = zIndex;
      }
    });
    setZIndex(zIndex + 1);
    localStorage.setItem("zIndex", JSON.stringify(zIndex));
    setSelectedFigure(figure);
  };

  const deleteFigure = useCallback(
    (event) => {
      if (selectedFigure) {
        const idSelectedFigure = selectedFigure.id;
        if (event.keyCode === 46 || event.type === "dragleave") {
          setFigures(
            figures.filter((figure) => figure.id !== idSelectedFigure)
          );
          localStorage.setItem("figures", JSON.stringify(figures));
        }
      }
    },
    [selectedFigure, figures, setFigures]
  );

  return (
    <>
      <div className="canvas_container">
        <div className="canvas_header">Canvas</div>

        <div
          className="canvas"
          ref={canvasLayoutRef}
          onDragOver={dragOverHandler}
          onDrop={dragDropHandler}
          onDragLeave={dragLeaveHandler}
        ></div>
      </div>
      {figures.map((figure, index) => {
        return (
          <div
            className="figure"
            onDragOver={dragOverHandler}
            onDrop={dragDropHandler}
            key={index}
            style={getStyleForFigure(figure, index)}
            onDragStart={(e) => dragStartHandler(e, figure.type, figure)}
            onClick={(e) => clickHandler(e, figure)}
            onKeyDown={deleteFigure}
            tabIndex="0"
            draggable
          ></div>
        );
      })}
    </>
  );
};
