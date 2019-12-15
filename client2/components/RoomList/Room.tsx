import React from 'react';
import { TRoomUser } from '../../../types/Room';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { LocationState } from 'history';
import '../../../assets/styles/rooms/roomList.scss';

type RoomListProps = {
  _id: string;
  title: string;
  mode: number;
  gameID: string;
  status: number;
  maxPlayers: number;
  userList: TRoomUser[];
};

const Room = (props: RoomListProps) => {
  const {
    _id,
    title,
    mode,
    gameID,
    status,
    maxPlayers,
    userList,
  } = props;

  return (
    <div className="room" key={_id}>
      <div className="title">{title}</div>
      <div className="info">
        <span className="mode mr-3">暗棋</span>
        {/* {isLock ? <FontAwesomeIcon className="mr-3" icon="lock" /> : null} */}
        <FontAwesomeIcon icon="user" className="mr-3" /> {userList.length} / {maxPlayers}
      </div>
    </div>
  )
};

export default Room;