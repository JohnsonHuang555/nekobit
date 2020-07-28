import { TChineseChess, GameModeCode } from '../../domain/models/ChineseChess';
import Chess from './Chess';
import { Grid } from '@material-ui/core';
import styles from '@styles/games/chineseChess.module.scss';

type MapItemProps = {
  chessInfo?: TChineseChess;
  isSelected: boolean;
  mode: GameModeCode;
  onMapClick: () => void; // Move chess 用
  onChessClick: () => void;
}

const MapItem = (props: MapItemProps) => {
  const {
    mode,
    chessInfo,
    isSelected,
    onMapClick,
    onChessClick,
  } = props;

  const className = [
    styles.mapItem,
    isSelected ? styles.isSelected : '',
    mode === GameModeCode.Standard ? styles.standard : '',
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
