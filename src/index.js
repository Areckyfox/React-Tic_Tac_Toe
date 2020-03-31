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
console.log(props);

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

  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [xIsNext, setxIsNext] = useState(true);
  
  const handleClick = el => {
    console.log(history);
    
    const current = history[history.length -1];
    const arraySquares = current.slice();
    if (calculateWinner(arraySquares) || arraySquares[el]) {
      return;
    }
    arraySquares[el] = xIsNext ? "X" : "Y";

    setHistory(history.concat(arraySquares));
    setxIsNext(!xIsNext);
  };
  const current = history[history.length - 1];
   const winner = calculateWinner(current);
   let status = winner
     ? "Win " + winner
     : "Next player: " + (xIsNext ? "X" : "Y");

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares = {current} 
          onClick={(i) => handleClick(i)}
        />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{/* TODO */}</ol>
      </div>
    </div>
  );
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));
