import { useState } from 'react';
import './styles.scss';
import Board from './Components/Board';
import StatusMessage from './Components/StatusMessage';
import { calculateWinner } from './winner';

function App() {
  const [squares, setsquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(false);

  const winner = calculateWinner(squares);

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
      <StatusMessage winner={winner} isXNext={isXNext} squares={squares} />
      <Board squares={squares} handleSquareClick={handleSquareClick} />
    </div>
  );
}

export default App;
