import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import './index.css'
import Game from './Containers/Game/Game'

const store = createStore()

ReactDOM.render(<Game />, document.getElementById('root'))
