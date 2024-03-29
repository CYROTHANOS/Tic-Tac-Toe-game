import { useState } from 'react';
import './styles.scss';
import Board from './Components/Board';
import StatusMessage from './Components/StatusMessage';
import History from './Components/History';
import { calculateWinner } from './winner';

const NEW_GAME = [{ squares: Array(9).fill(null), isXNext: false }];
function App() {
  const [history, setHistory] = useState(NEW_GAME);
  const [currentMove, setCurrentMove] = useState(0);

  const gamingBoard = history[currentMove];

  const { winner, winningSquares } = calculateWinner(gamingBoard.squares);

  const handleSquareClick = position => {
    if (gamingBoard.squares[position] || winner) {
      return;
    }
    setHistory(currentHistory => {
      const isTraversing = currentMove + 1 !== currentHistory.length;
      const lastGamingState = isTraversing
        ? currentHistory[currentMove]
        : currentHistory[currentHistory.length - 1];
      const nextGamingState = lastGamingState.squares.map(
        (squareValue, pos) => {
          if (position === pos) {
            return lastGamingState.isXNext ? 'X' : 'O';
          }

          return squareValue;
        }
      );

      const base = isTraversing
        ? currentHistory.slice(0, currentHistory.indexOf(lastGamingState) + 1)
        : currentHistory;
      return base.concat({
        squares: nextGamingState,
        isXNext: !lastGamingState.isXNext,
      });
    });
    setCurrentMove(move => move + 1);
  };
  const moveTo = move => {
    setCurrentMove(move);
  };

  const onReset = () => {
    setHistory(NEW_GAME);
    setCurrentMove(0);
  };

  return (
    <div className="app">
      <h1>
        TIC <span className="text-orange">TAC</span> TOE
      </h1>
      <StatusMessage winner={winner} gamingBoard={gamingBoard} />
      <Board
        squares={gamingBoard.squares}
        handleSquareClick={handleSquareClick}
        winningSquares={winningSquares}
      />

      <button
        type="button"
        onClick={onReset}
        className={`btn-reset ${winner ? 'active' : ''}`}
      >
        Reset
      </button>

      <h2 style={{ fontWeight: 'normal' }}>Game History</h2>

      <History history={history} moveTo={moveTo} currentMove={currentMove} />
    </div>
  );
}

export default App;
