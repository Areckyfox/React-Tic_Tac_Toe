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

const Board = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setxIsNext] = useState(true);

  
  const handleClick = (el) => {
    if (calculateWinner(squares) || squares[el]) {
      return;
    }
    const arraySquares = squares.slice();
    arraySquares[el] = xIsNext ? "X" : "Y";
    setSquares(arraySquares);
    setxIsNext(!xIsNext);
  }

  const renderSquare = (i) => {
    return <Square 
            value={squares[i]} 
            onClick = {()=> handleClick(i)}
           />;
  }

    const winner = calculateWinner(squares);
    let status = winner ? ("Win " + winner) : ("Next player: " + (xIsNext ? "X" : "Y"));
    
    return (
      <div>
        <div className="status">{status}</div>
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

  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
      <div className="game-info">
        <div>{/* status */}</div>
        <ol>{/* TODO */}</ol>
      </div>
    </div>
  );
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));
