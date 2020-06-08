import { TChineseChess } from '../../domain/models/ChineseChess';
import Chess from './Chess';

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
    <div className={'map-item' + (isSelected ? 'is-selected' : '')} onClick={onMapClick}>
      {chessInfo && (
        <Chess
          name={chessInfo.name}
          side={chessInfo.side}
          isFlipped={chessInfo.isFlipped}
          onChessClick={onChessClick}
        />
      )}
    </div>
  )
};

export default MapItem;
