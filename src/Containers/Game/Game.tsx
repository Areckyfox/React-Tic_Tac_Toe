import React, { useState } from 'react'
import { useSelector } from 'react-redux'

// import { connect } from 'react-redux'
import Board from '../../Components/Board/Board'
import Moves from '../Moves/Moves'
import { calculateWinner } from '../../Helpers/helpers'

export interface IHistory {
  squareNumber: number
  table: any[]
}

const Game: React.FC = () => {
  const [history, setHistory] = useState<IHistory[]>([
    { squareNumber: 0, table: Array(9).fill(null) },
  ])
  const [xIsNext, setxIsNext] = useState(true)
  const [stepNumber, setStepNumber] = useState(0)
  const [reverseList, setReverseList] = useState(false)

  const current = history[stepNumber].table
  const winner = calculateWinner(current)
  const squeareToColor = winner ? winner.winLine : null
  const classReverseList = reverseList ? 'reverse-list' : ''
  const player = xIsNext ? 'X' : 'Y'

  const status = winner
    ? 'Winner ' + winner.winner
    : history.length === 10
    ? 'Draw'
    : 'Next player: ' + player

  const handleClick = (el: number) => {
    const updateHistory = history.slice(0, stepNumber + 1)
    const current = updateHistory[updateHistory.length - 1].table
    const arraySquares = current.slice()

    if (calculateWinner(arraySquares) || arraySquares[el]) {
      return
    }

    arraySquares[el] = player

    setHistory(updateHistory.concat({ squareNumber: el, table: arraySquares }))
    setStepNumber(updateHistory.length)
    setxIsNext(!xIsNext)
  }

  const jumpTo = (step: number) => {
    setStepNumber(step)
    setxIsNext(step % 2 === 0)
  }

  const reverseListHandler = () => {
    setReverseList(!reverseList)
  }
  const numberSquare = useSelector((state: IHistory[]) => state[0].squareNumber)

  return (
    <div className='game'>
      <div>{JSON.stringify(numberSquare)}</div>
      <Board
        squares={current}
        onClicked={handleClick}
        toColor={squeareToColor}
      />
      <div className='game-info'>
        <div>{status}</div>
        <button onClick={reverseListHandler}>Reverse list</button>
        <ul className={classReverseList}>
          <Moves history={history} step={stepNumber} jumpTo={jumpTo} />
        </ul>
      </div>
    </div>
  )
}

// const mapSTateToProps = (state: any[]) => {
//   return { iHistory: state[0].squareNumber }
// }

export default Game
// export default connect(mapSTateToProps)(Game)
