import { ChessSide } from "../../domain/models/ChineseChess";

type ChessProps = {
  side: ChessSide;
  name: string;
  isFlipped: boolean;
}
const Chess = (props: ChessProps) => {
  const {
    side,
    name,
    isFlipped,
  } = props;
  return (
    <div className={`chess ${isFlipped ? 'is-flipped' : ''}`}>
      {isFlipped && (
        <span className={side === ChessSide.Red ? ' side-red' : ' side-black'}>{name}</span>
      )}
    </div>
  );
}

export default Chess;
