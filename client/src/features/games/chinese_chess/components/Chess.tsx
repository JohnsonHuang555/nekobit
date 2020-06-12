import { ChessSide } from "../../domain/models/ChineseChess";

type ChessProps = {
  side: ChessSide;
  name: string;
  isFlipped: boolean;
  onChessClick: () => void;
}
const Chess = (props: ChessProps) => {
  const {
    side,
    name,
    isFlipped,
    onChessClick,
  } = props;
  return (
    <div
      className={`chess ${isFlipped ? 'is-flipped' : ''}`}
      onClick={onChessClick}
    >
      {isFlipped && (
        <span className={side === ChessSide.Red ? ' side-red' : ' side-black'}>{name}</span>
      )}
    </div>
  );
}

export default Chess;
