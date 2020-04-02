import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {calculateWinner} from './Helpers/helpers';

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

  const [history, setHistory] = useState([{table: Array(9).fill(null)}]);
  const [xIsNext, setxIsNext] = useState(true);
  const [stepNumber, setStepNumber] = useState(0);
  const updateHistory = el => {
    
  }
  const handleClick = el => {
    const updateHistory = history.slice(0, stepNumber + 1)
    const current = updateHistory[updateHistory.length - 1].table;
    const arraySquares = current.slice();
    if (calculateWinner(arraySquares) || arraySquares[el]) {
      return;
    }
    arraySquares[el] = xIsNext ? "X" : "Y";
    
    setHistory(updateHistory.concat({table: arraySquares}));
    setStepNumber(updateHistory.length);
    setxIsNext(!xIsNext);
    
  };
  

  const jumpTo = (step) => {
    setStepNumber(step);
    setxIsNext((step % 2) === 0);
  }

  let current = history[stepNumber].table;
  const winner = calculateWinner(current);

  const moves = history.map((step, i) => {
    const desc = i ? "Przejdź do ruchu #" + i : "Przejdź na początek gry";
    return (
      <li key={i}>
        <button onClick={() => jumpTo(i)}>{desc}</button>
      </li>
    );
  });



  let status = winner
    ? "Winner " + winner
    : "Next player: " + (xIsNext ? "X" : "Y");

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares = {current} 
          onClick = {(i) => handleClick(i)}
          onClickHistory = {(i) => updateHistory(i)}
        />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));
