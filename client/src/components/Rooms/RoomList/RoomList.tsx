import React from 'react';
import Room from './Room';
import { TRoom } from '../../../types/Room';
import { LocationState } from 'history';

import '../../../assets/styles/rooms/roomList.scss';

type RoomListProps = {
  rooms: TRoom[];
  location: LocationState;
};

const RoomList = (props: RoomListProps) => {
  const {
    rooms,
    location,
  } = props;
  const roomList = rooms && rooms.map((room: TRoom) => {
    // const chooseRoom = () => {
    //   location.push(`/room/${room._id}`);
    // }
    return (
      <Room
        _id={room._id}
        title={room.title}
        mode={room.mode}
        gameID={room.gameID}
        status={room.status}
        maxPlayers={room.maxPlayers}
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