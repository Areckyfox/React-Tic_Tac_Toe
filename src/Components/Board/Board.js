import React from 'react';
import Square from '../Board/Square/Square';
import {createArray} from '../../Helpers/helpers';

const Board = ({ toColor, squares, onClick }) => {

  const renderSquare = (i) => {
    let toColorSquare = "";
    if (toColor && toColor.some((el) => el === i)) {
      toColorSquare = "toColor";
    }
    return (
      <Square
        key = {`square${i}`}
        value={squares[i]}
        onClick={() => onClick(i)}
        toColor={toColorSquare}
      />
    );
  };
  
  return createArray(3).map(i => (
      <div key={`row${i}`} className="board-row">
          {createArray(3).map((j,index, arr) => renderSquare(j +(i * arr.length)))}
      </div>    
  ))
};

export default Board;