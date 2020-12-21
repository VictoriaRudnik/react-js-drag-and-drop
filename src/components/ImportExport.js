import React, {useRef} from "react";

export const ImportExport = (props) => {

  const {figures, setFigures } = props;

  const hiddenFileInput = React.useRef(null);
  // const handleClick = (event) => {
  //   (hiddenFileInput.current).click();
  // };

 const clickHandler = (e) => {
  if (e.target.files.length > 0) {
    console.log('e.target.files[0]', e.target)
    setFigures(JSON.parse(e.target.result));
  }
} 

const downloadFile = async () => {
 
  console.log('figures', figures)
  const fileName = "file";
  const json = JSON.stringify(figures)
  const blob = new Blob([json],{type:'application/json'});
  const href = await URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = href;
  link.download = fileName + ".json";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
  return(
    <div className="import_container">
       <button className="button" >Import</button>
        <input  type="file" accept=".json"  ref={hiddenFileInput} onChange={clickHandler}></input>
        <button className="button" onClick={downloadFile}>export</button>
      </div>
  )
}