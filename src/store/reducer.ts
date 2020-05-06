import { IHistory } from '../Containers/Game/Game'

const initialState: IHistory[] = [
  { squareNumber: 0, table: Array(9).fill(null) },
]

const reducer = (state: IHistory[] = initialState, action: any) => {
  return state
}

export default reducer
