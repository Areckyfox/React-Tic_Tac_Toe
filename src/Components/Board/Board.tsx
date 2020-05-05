import React from "react";
import Square from "../Board/Square/Square";
import { createArray } from "../../Helpers/helpers";

interface BoardProps {
  onClicked: (num: number) => void;
  squares: string[];
  toColor: number[] | null;
}

const Board: React.FC<BoardProps> = ({ toColor, squares, onClicked }) => {
  const renderSquare = (i: number) => {
    const shouldColorSquare = toColor && toColor.some((el: number) => el === i);
    const toColorSquare = shouldColorSquare ? "toColor" : "";

    return (
      <Square
        key={`square${i}`}
        value={squares[i]}
        onClicked={() => onClicked(i)}
        toColor={toColorSquare}
      />
    );
  };

  const array = createArray(3);

  const renderCol = (i: number) => (j: number, _: any, arr: number[]) =>
    renderSquare(j + i * arr.length);

  const renderRow = (i: number) => (
    <div key={`row${i}`} className="board-row">
      {array.map(renderCol(i))}
    </div>
  );

  const renderBoard = array.map(renderRow);

  return <div className="game-board">{renderBoard}</div>;
};

export default Board;
