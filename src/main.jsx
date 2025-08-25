import React from 'react'
import ReactDOM from 'react-dom/client'
import Game2048 from './Game2048.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Game2048 />
  </React.StrictMode>,
)