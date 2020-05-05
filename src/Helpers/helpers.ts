const calculateWinner = (squares: number[]) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {winner:squares[a], winLine:[a,b,c]}
    }
  }
  return null
}

const coordinates = (num: number) => {
  const line = Math.floor(num / 3) + 1
  const col = (num % 3) + 1

  return {x: line, y: col}
}

const createArray = (length: number) => Array.from(Array(length), (_, i) => i)


export {calculateWinner, coordinates, createArray}