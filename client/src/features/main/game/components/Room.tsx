import React from 'react';
import { faUser, faKey } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TRoom } from 'src/features/main/domain/models/Room';
import '@styles/components/rooms/roomList.scss';

type RoomListProps = {
  roomInfo: TRoom;
  maxPlayers: number;
  gameMode?: string;
  onChooseRoom: (id: string) => void;
};

const Room = (props: RoomListProps) => {
  const {
    roomInfo,
    maxPlayers,
    gameMode,
    onChooseRoom,
  } = props;

  const isFull = roomInfo.userList.length === maxPlayers;

  const onChoose = (id: string) => {
    if (isFull) {
      return;
    }
    onChooseRoom(id);
  }

  return (
    <div className="room">
      <div className="top">
        <div className="info">
          <span className="id">{roomInfo.roomNumber}.</span>
          <span className="title">{roomInfo.title}</span>
        </div>
        <div className="key">
          <FontAwesomeIcon icon={faKey}/>
          私密
        </div>
      </div>
      <div className="bottom">
        <span className="status">
          {isFull ? 'Playing' : 'Waiting'}...
        </span>
        <span className="mode">
          {gameMode}
        </span>
        <span className="players">
          <FontAwesomeIcon icon={faUser}/> {roomInfo.userList.length || 1} / {maxPlayers}
        </span>
        <span className={"btn-enter " + (isFull ? 'full' : 'remain')} onClick={() => onChoose(roomInfo.id)}>
          {isFull ? 'Full' : 'Enter'}
        </span>
      </div>
    </div>
  )
};

export default Room;
