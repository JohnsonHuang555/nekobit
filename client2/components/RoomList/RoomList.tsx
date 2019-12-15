import React, { useEffect } from 'react';
import { TRoom } from '../../types/Room';

import '@styles/rooms/roomList.scss';

type RoomListProps = {
  rooms: TRoom[];
};

const RoomList = (props: RoomListProps) => {
  const {
    rooms,
  } = props;

  useEffect(() => {
    let ws: WebSocket = new WebSocket('ws://localhost:8080/ws/gamePage');
    ws.onopen = () => {
      console.log('Successfully Connected in game page');
    };

    ws.onclose = (e) => {
      console.log("Socket Closed Connection: ", e);
    };

    ws.onerror = (error) => {
      console.log("Socket Error: ", error);
      ws.close();
    };

    return () => {
      ws.close();
    }
  }, []);

  const roomList = rooms && rooms.map((room: TRoom) => {
    // const chooseRoom = () => {
    //   location.push(`/room/${room._id}`);
    // }
    return (
      // <Room
      //   _id={room._id}
      //   title={room.title}
      //   mode={room.mode}
      //   gameID={room.gameID}
      //   status={room.status}
      //   maxPlayers={room.maxPlayers}
      //   userList={room.userList}
      // />
      <div>111</div>
    );
  });
  return (
    <div className="room-list-flex">
      {roomList}
      <div>111</div>
    </div>
  );
};

export default RoomList;