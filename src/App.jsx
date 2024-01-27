import { useState } from 'react'
import './App.css'
import confetti from "canvas-confetti"
import { Square } from './components/square.jsx'
import { TURNS} from './constants/constantes.js'
import { checkWinnerFrom } from './logic/board.js'
import { WinnerModal } from './components/winnerModal.jsx'
function App() {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [turn, setTurn] = useState(TURNS.X)
  const [winner, setWinner] = useState(null)
  
  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }

  const checkEndGame = (newBoard) => {
    return newBoard.every((square) => square !== null)
  }
  const updateBoard = (index) => {
    
    if (board[index] || winner) return 
    const newBoard = [...board]
    newBoard [index] = turn
    setBoard(newBoard)

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    const newWinner = checkWinnerFrom(newBoard)
    if (newWinner) {
      confetti()
      setWinner(newWinner)
    } else if(checkEndGame(newBoard)) {
      setWinner(false)
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
      </main>
    )
}

export default App
