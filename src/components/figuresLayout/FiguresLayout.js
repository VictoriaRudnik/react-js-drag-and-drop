import React from "react";
import "./style.css";

export const FiguresLayout = (props) => {
  const { dragStartHandler } = props;
  return (
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
  );
};
