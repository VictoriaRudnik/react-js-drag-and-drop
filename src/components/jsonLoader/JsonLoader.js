import React from "react";
import "./style.css";

export const JsonLoader = (props) => {
  const { figures, setFigures } = props;

  const hiddenFileInput = React.useRef(null);
  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  const handleChange = (e) => {
    if (e.target.files.length > 0) {
      const fileReader = new FileReader();
      fileReader.readAsText(e.target.files[0], "UTF-8");
      fileReader.onload = (e) => {
        setFigures(JSON.parse(e.target.result));
      };
    }
  };

  const downloadFile = async () => {
    const fileName = "canvasFigures";
    const json = JSON.stringify(figures);
    const blob = new Blob([json], { type: "application/json" });
    const href = await URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = href;
    link.download = fileName + ".json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <div className="import_container">
      <button className="button" onClick={handleClick}>
        Import
      </button>
      <input
        type="file"
        accept=".json"
        className="input_import"
        ref={hiddenFileInput}
        onChange={handleChange}
      ></input>
      <button className="button" onClick={downloadFile}>
        Export
      </button>
    </div>
  );
};
