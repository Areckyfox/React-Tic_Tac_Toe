import { IHistory } from '../Game/Game'
import React from 'react'
import { coordinates } from '../../Helpers/helpers'

interface IMoveProps {
  history: IHistory[]
  step: number
  jumpTo: (step: number) => void
}

const Moves: React.FC<IMoveProps> = ({history, step, jumpTo}) => {
  const moves = history.map((_, i) => {
    const {x, y} = coordinates(history[i].squareNumber)
    const desc = i
    ? `Go to move # ${i} | line ${x} / column ${y}`
    : "Go to start"

    const classLi = step === i ? "li-bold" : ""

    return (
      <li key={i}>
        <button
          className={classLi}
          onClick={() => jumpTo(i)}
        >
          {desc}
        </button>
      </li>
    )
  })

  return (
    <>
      {moves}
    </>
  )
}

export default Moves
