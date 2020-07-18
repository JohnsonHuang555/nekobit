import { TChineseChess } from '../../domain/models/ChineseChess';
import Chess from './Chess';
import { Grid } from '@material-ui/core';
import styles from '@styles/games/chineseChess.module.scss';

type MapItemProps = {
  chessInfo?: TChineseChess;
  isSelected: boolean;
  onMapClick: () => void; // Move chess 用
  onChessClick: () => void;
}

const MapItem = (props: MapItemProps) => {
  const {
    chessInfo,
    isSelected,
    onMapClick,
    onChessClick,
  } = props;
  return (
    <Grid
      item
      className={styles.mapItem + (isSelected ? ` ${styles.isSelected}` : '')}
      onClick={onMapClick}
    >
      {chessInfo && (
        <Chess
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
