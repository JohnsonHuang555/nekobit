import { TChineseChess, GameModeCode, ChessSide } from '../../domain/models/ChineseChess';
import Chess from './Chess';
import { Grid } from '@material-ui/core';
import styles from '@styles/games/chineseChess.module.scss';

type MapItemProps = {
  chessInfo?: TChineseChess;
  isSelected: boolean;
  mode: GameModeCode;
  playerSide: ChessSide;
  onMapClick: () => void; // Move chess 用
  onChessClick: () => void;
}

const MapItem = (props: MapItemProps) => {
  const {
    mode,
    chessInfo,
    isSelected,
    playerSide,
    onMapClick,
    onChessClick,
  } = props;

  const className = [
    styles.mapItem,
    isSelected ? styles.isSelected : '',
    mode === GameModeCode.Standard ? styles.standard : '',
    mode === GameModeCode.Standard && playerSide === ChessSide.Black ? styles.rotate_180 : '',
  ].join(' ');

  return (
    <Grid
      item
      className={className}
      onClick={onMapClick}
    >
      {chessInfo && (
        <Chess
          mode={mode}
          name={chessInfo.name}
          side={chessInfo.side}
          isFlipped={chessInfo.isFlipped}
          onChessClick={onChessClick}
        />
      )}
    </Grid>
  )
};

export default MapItem;
