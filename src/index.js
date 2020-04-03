import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {calculateWinner, coordinates} from './Helpers/helpers';

const Square = (props) => {
    const {onClick, value} = props;
    
    return (
    <button 
      className="square"
      onClick={onClick} 
    >
      {value}
    </button>
    )
}

const Board = (props) => {

  const renderSquare = (i) => {
    return <Square 
            value={props.squares[i]} 
            onClick = {()=> props.onClick(i)}
           />;
  }    

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
}

const Game = () => {
  const [history, setHistory] = useState([{squareNumber: 0, table: Array(9).fill(null)}]);
  const [xIsNext, setxIsNext] = useState(true);
  const [stepNumber, setStepNumber] = useState(0);
  const [reverseList, setReverseList] = useState(false);
  
  const handleClick = el => {
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
  
  const jumpTo = (step) => {
    setStepNumber(step);
    setxIsNext((step % 2) === 0);
  }
  const reverseListHandle = () => {
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

  let status = winner
    ? "Winner " + winner
    : history.length === 10 ? "Draw" : "Next player: " + (xIsNext ? "X" : "Y");
  const classReverseList = reverseList ? "reverse-list" : "";  

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares = {current} 
          onClick = {(i) => handleClick(i)}
        />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <button
        onClick = {()=> reverseListHandle()}
        >
        Reverse list  
        </button>
        <ul className ={classReverseList}>{moves}</ul>
      </div>
    </div>
  );
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));
