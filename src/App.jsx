import { useState } from 'react';
import './styles.scss';
import Board from './Components/Board';
import { calculateWinner } from './winner';

function App() {
  const [squares, setsquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(false);

  const winner = calculateWinner(squares);
  const nextPlayer = isXNext ? 'Leander' : 'Madhuri';

  const win = winner ? `Winner is ${winner}` : `Next Player is ${nextPlayer}`;

  const handleSquareClick = position => {
    if (squares[position] || winner) {
      return;
    }
    setsquares(currentSquare => {
      return currentSquare.map((squareValue, pos) => {
        if (position === pos) {
          return isXNext ? 'X' : 'O';
        }

        return squareValue;
      });
    });
    setIsXNext(prev => !prev);
  };

  return (
    <div className="app">
      <h2>{win}</h2>
      <Board squares={squares} handleSquareClick={handleSquareClick} />
    </div>
  );
}

export default App;
