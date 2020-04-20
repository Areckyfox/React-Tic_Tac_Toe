import React, { useState } from "react";
import { calculateWinner, coordinates } from "../../Helpers/helpers";
import Board from '../../Components/Board/Board';

const Game:React.FC= () => {
  const [history, setHistory] = useState([{squareNumber: 0, table: Array(9).fill(null)}]);
  const [xIsNext, setxIsNext] = useState(true);
  const [stepNumber, setStepNumber] = useState(0);
  const [reverseList, setReverseList] = useState(false);
  
  const handleClick = (el: number) => {
    const updateHistory = history.slice(0, stepNumber + 1)
    const current = updateHistory[updateHistory.length - 1].table;
    const arraySquares = current.slice();

    if (calculateWinner(arraySquares) || arraySquares[el]) {
      return;
    }
    arraySquares[el] = xIsNext ? "X" : "Y";
    
    setHistory(updateHistory.concat({squareNumber: el, table: arraySquares}));
    setStepNumber(updateHistory.length);
    setxIsNext(!xIsNext);   
  };
  
  const jumpTo = (step: number) => {
    setStepNumber(step);
    setxIsNext((step % 2) === 0);
  }
  const reverseListHandler = () => {
    setReverseList(!reverseList)
  }

  let current = history[stepNumber].table;
  const winner = calculateWinner(current);
  const moves = history.map((step, i) => {
    
    const newCoordinates = coordinates(history[i].squareNumber);
    const desc = i
      ? "Go to move #" +
        i +
        " | " +
        "line: " + newCoordinates.x +
        " / " +
        "column: " + newCoordinates.y
      : "Go to start";
      const classLi = stepNumber === i ? "li-bold" : "";
      
    return (
      <li key={i}>
        <button className={classLi} 
        onClick={() => jumpTo(i)}
        >
        {desc}
        </button>
      </li>
    );
  });
  const squeareToColor = calculateWinner(current) ? calculateWinner(current)!.winLine: null;

  let status = winner
    ? "Winner " + winner.winner
    : history.length === 10 ? "Draw" : "Next player: " + (xIsNext ? "X" : "Y");
  const classReverseList = reverseList ? "reverse-list" : "";  

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={current}
          onClicked={(i) => handleClick(i)}
          toColor={squeareToColor}
        />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <button onClick={() => reverseListHandler()}>Reverse list</button>
        <ul className={classReverseList}>{moves}</ul>
      </div>
    </div>
  );
}

export default Game; 