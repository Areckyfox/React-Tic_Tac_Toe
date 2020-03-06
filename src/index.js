import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Board from './Board/Board';
import {calculateWinner} from './Helpers/helpers';

class Game extends React.Component {
    state = {
        history: [
            {
                squares: Array(9).fill(null)
            }
        ],
        xIsNext: true,
        stepNumber: 0,
    };

    handleClick(i) {
        const history = this.state.history.slice(0,this.state.stepNumber +1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        if(calculateWinner(squares) || squares[i]) {
            return;
        }

        squares[i] = this.state.xIsNext ? "X" : "O";
        this.setState({
            history:history.concat([{
                squares: squares,
            }]),
            stepNumber:history.length,
            xIsNext: !this.state.xIsNext,
        });
    }
    jumpTo(step) {
        this.setState ({
            stepNumber:step,
            xIsNext: (step % 2) === 0,
        })
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        
        const winner = calculateWinner(current.squares);
        const moves = history.map((step, move) => {
            const desc = move ? 'Przejdź do ruchu #' + move : 'Przejdź na początek gry';
            return (
            <li key={move}>
                <button onClick={()=> this.jumpTo(move)}>{desc}</button>
            </li>
            );
        });
        let status;

        if (winner) {
            status = "Wygrywa: " + winner;
        } else {
            status = "Następny gracz: " + (this.state.xIsNext ? "X" : "O");
        }
        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={i => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));
