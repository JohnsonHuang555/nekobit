import React from 'react';
import Router from 'next/router';
import Room from 'src/components/RoomList/Room';
import { TRoom } from 'src/types/Room';

import '@styles/components/rooms/roomList.scss';

type RoomListProps = {
  rooms: TRoom[];
};

const RoomList = (props: RoomListProps) => {
  const {
    rooms,
  } = props;

  const onChooseRoom = (id: number) => {
    Router.push({
      pathname: '/room',
      query: {
        id
      }
    })
  }

  const roomList = rooms && rooms.map((room: TRoom) => {
    return (
      <Room
        key={room.id}
        id={room.id}
        title={room.title}
        mode={room.mode}
        status={room.status}
        userList={room.userList}
        onChooseRoom={onChooseRoom}
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