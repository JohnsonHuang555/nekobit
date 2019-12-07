import React from 'react';
import { TRoom } from '../types/Room';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { LocationState } from 'history';
import '../assets/styles/rooms/roomList.scss';

type RoomListProps = {
  rooms: TRoom[];
  location: LocationState;
};

const Room = (props: RoomListProps) => {
  const {
    rooms,
    location,
  } = props;

  const roomList = rooms && rooms.map((room: TRoom) => {
    const chooseRoom = () => {
      location.push(`/room/${room._id}`);
    }
    return (
      <div className="room-info" key={room._id}>
        <div className="title">{room.title}</div>
        <div className="info">
          <span className="mode mr-3">暗棋</span>
          {/* {room.isLock ? <FontAwesomeIcon className="mr-3" icon="lock" /> : null} */}
          <FontAwesomeIcon icon="user" className="mr-3" /> {room.userList.length} / {room.maxPlayers}
        </div>
      </div>
    )
  });
  return (
    <>
      {roomList}
    </>
  );
};

export default Room;