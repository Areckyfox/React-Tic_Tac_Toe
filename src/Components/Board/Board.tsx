import React from 'react';
import Square from '../Board/Square/Square';
import { createArray } from '../../Helpers/helpers';

interface BoardProps {
  onClicked: (num: number) => void;
  squares: string | null[];
  toColor: any;
}

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
        onClick={() => onClicked(i)}
        toColor={toColorSquare}
      />
    );
  };

  return createArray(3).map((i) => (
    <div key={`row${i}`} className='board-row'>
      {createArray(3).map((j, index, arr) => renderSquare(j + i * arr.length))}
    </div>
  ));
};

export default Board;
