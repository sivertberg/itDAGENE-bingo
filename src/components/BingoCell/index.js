import React from "react";
import "./bingo-cell.css";

const BingoCell = ({ id, content, clicked, handleCellChange }) => {
  return (
    <div
      className={clicked ? "cell cell-selected" : "cell"}
      onClick={() => handleCellChange(id)}
    >
      <div className={"cell-full " + (clicked ? "cell-full-selected" : "")}>
        <p>{content}</p>
      </div>
    </div>
  );
};

export default BingoCell;
