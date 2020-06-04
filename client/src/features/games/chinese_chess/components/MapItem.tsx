import { TChineseChess } from '../../domain/models/ChineseChess';
import Chess from './Chess';

type MapItemProps = {
  chessInfo?: TChineseChess;
  onMapClick: () => void;
}

const MapItem = (props: MapItemProps) => {
  const {
    chessInfo,
    onMapClick,
  } = props;
  return (
    <div className="map-item" onClick={onMapClick}>
      {chessInfo && (
        <Chess
          name={chessInfo.name}
          side={chessInfo.side}
          isFlipped={chessInfo.isFlipped}
        />
      )}
    </div>
  )
};

export default MapItem;
