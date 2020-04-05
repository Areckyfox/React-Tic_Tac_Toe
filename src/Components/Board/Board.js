import React from 'react';
import Square from '../Board/Square/Square';

const Board = (props) => {

  const renderSquare = (i) => {
    let toColorSquare = "";
    if (props.toColor && props.toColor.some((el) => el === i)) {
      toColorSquare = "toColor";
    }
    return (
      <Square
        value={props.squares[i]}
        onClick={() => props.onClick(i)}
        toColor={toColorSquare}
      />
    );
  };
  
 return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
};

export default Board;