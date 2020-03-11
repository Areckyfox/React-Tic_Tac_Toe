import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Square = (props) => {
    console.log(props);
    const { handleClick, value } = props;
    
    return (
    <button 
        className="square"
        onClick={() => {
            console.debug("onClick", handleClick);
            handleClick();
        }}
    >
        {value}
    </button>
    )
}

const Board = () => {
  const [squares, setSquares] = useState(Array(9).fill(1));


  const handleClick = (el) => (evt) => {
      const squaresNext = squares.slice()
      squaresNext[el] = "X"
      setSquares(squaresNext)
  }
  
  const renderSquare = (i) => {
    return <Square 
            value={squares[i]} 
            handleClick = {handleClick(i)}
           />;
  }

  
  useEffect(() => {
      console.warn("squares", squares)
  })

  const handleClickBtn = () => () => {
      setSquares(["1", "2", "3", "4", "5", "6", "7", "8", "9"])
  }

    const status = "Next player: X";

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
        <button onClick={handleClickBtn}>Test</button>
      </div>
    );
  
}

class Game extends React.Component {
  render() {
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
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));
