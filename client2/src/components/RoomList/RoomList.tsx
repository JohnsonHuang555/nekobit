import React from 'react';
import Room from './Room';
import { TRoom } from '../../types/Room';

import '@styles/components/rooms/roomList.scss';

type RoomListProps = {
  rooms: TRoom[];
};

const RoomList = (props: RoomListProps) => {
  const {
    rooms,
  } = props;

  const roomList = rooms && rooms.map((room: TRoom) => {
    // const chooseRoom = () => {
    //   location.push(`/room/${room._id}`);
    // }
    return (
      <Room
        key={room.id}
        id={room.id}
        title={room.title}
        mode={room.mode}
        status={room.status}
        userList={room.userList}
      />
    );
  });
  return (
    <div className="room-list-flex">
      {roomList}
    </div>
  );
};

export default RoomList;