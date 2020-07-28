import { ChessSide, GameModeCode } from "../../domain/models/ChineseChess";
import styles from '@styles/games/chineseChess.module.scss';

type ChessProps = {
  side: ChessSide;
  name: string;
  isFlipped: boolean;
  mode: GameModeCode;
  onChessClick: () => void;
}
const Chess = (props: ChessProps) => {
  const {
    side,
    name,
    mode,
    isFlipped,
    onChessClick,
  } = props;

  const className = [
    styles.chess,
    isFlipped ? styles.isFlipped : '',
    mode === GameModeCode.Standard ? styles.standardChess : '',
  ].join(' ');

  return (
    <div
      className={className}
      onClick={onChessClick}
    >
      {isFlipped && (
        <span className={side === ChessSide.Red ? ` ${styles.sideRed}` : ` ${styles.sideBlack}`}>
          {name}
        </span>
      )}
    </div>
  );
}

export default Chess;
