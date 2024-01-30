import { useState } from 'react'
import './App.css'
import confetti from "canvas-confetti"
import { Square } from './components/square.jsx'
import { TURNS} from './constants/constantes.js'
import { checkWinnerFrom, checkEndGame } from './logic/board.js'
import { WinnerModal } from './components/winnerModal.jsx'
import { launchConfetti  } from './constants/confettijc.js'
function App() {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    if (boardFromStorage) {
      return JSON.parse(boardFromStorage)
    }
    return Array(9).fill(null)
  }
  )
  
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage || TURNS.X
  }
  )
  const [winner, setWinner] = useState(null)
  
  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
  }
  const updateBoard = (index) => {
    
    if (board[index] || winner) return 
    const newBoard = [...board]
    newBoard [index] = turn
    setBoard(newBoard)

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    window.localStorage.setItem('board', JSON.stringify(newBoard))
    window.localStorage.setItem('turn', newTurn)
    const newWinner = checkWinnerFrom(newBoard)
    if (newWinner) {
      launchConfetti();
      setWinner(newWinner);
    } else if (checkEndGame(newBoard)) {
      setWinner(false);
    }
  }

    return (
      <main className='board'>
        <h1>TIC TAC TOE</h1>
        <button onClick={resetGame}>Reset del Juego</button>
        <section className='game'>
          {board.map((square, index) => {
            return (
              <Square 
              key={index}
              index={index}
              updateBoard={updateBoard}
              >
                {square}
              </Square>
            )
          })}
        </section>
        <section className='turn'>
          <Square isselect={turn === TURNS.X}>
            {TURNS.X}
          </Square>
          <Square isselect={turn === TURNS.O}>
            {TURNS.O}
          </Square>          
        </section>
        <WinnerModal resetGame={resetGame} winner={winner} />
        <footer>
          <h3>Juan Carlos Gutiérrez</h3>
          <h5><a href="https://github.com/JuanCarlosGP/TICTACTOE_React" target="_blank">GitHub</a></h5>
        </footer>
      </main>
    )
}

export default App
