const square = ({ value, onClick, isWinningSquare }) => {
  const colorClassName = value === 'X' ? 'text-green' : 'text-orange';
  const WinningClassName = isWinningSquare ? 'winning' : '';
  return (
    <button
      type="button"
      className={`square ${colorClassName} ${WinningClassName}`}
      onClick={onClick}
    >
      {value}
    </button>
  );
};

export default square;
