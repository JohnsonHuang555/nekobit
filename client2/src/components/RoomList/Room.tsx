import React from 'react';
import { TRoomUser } from '../../types/Room';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@styles/components/rooms/roomList.scss';

type RoomListProps = {
  id: number;
  title: string;
  mode: number;
  status: number;
  userList: TRoomUser[];
  onChooseRoom: (id: number) => void;
};

const Room = (props: RoomListProps) => {
  const {
    id,
    title,
    mode,
    status,
    userList,
    onChooseRoom,
  } = props;

  return (
    <div className="room" key={id} onClick={() => onChooseRoom(id)}>
      <div className="title">{title}</div>
      <div className="info">
        <span className="mode mr-3">暗棋</span>
        {/* {isLock ? <FontAwesomeIcon className="mr-3" icon="lock" /> : null} */}
        <FontAwesomeIcon icon={faUser}/> {userList.length} / 2
      </div>
    </div>
  )
};

export default Room;