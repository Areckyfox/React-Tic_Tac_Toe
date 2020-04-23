import React from 'react';
import Square from '../Board/Square/Square';
import { createArray } from '../../Helpers/helpers';

interface BoardProps {
  onClicked: (num: number) => void;
  squares: string[];
  toColor: number[] | null;
};

const Board: React.FC<BoardProps> = ({ toColor, squares, onClicked }) => {
  const renderSquare = (i: number) => {
    let toColorSquare = '';
    if (toColor && toColor.some((el: number) => el === i)) {
      toColorSquare = 'toColor';
    }
    return (
      <Square
        key={`square${i}`}
        value={squares[i]}
        onClicked={() => onClicked(i)}
        toColor={toColorSquare}
      />
    );
  };

  return(
    <>
     {createArray(3).map((i) => (
      <div key={`row${i}`} className='board-row'>
        {createArray(3).map((j, _, arr) => renderSquare(j + i * arr.length))}
      </div>
    ))}
    </>
  )    
};

export default Board;
