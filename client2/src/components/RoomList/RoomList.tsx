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
    });
  }

  const roomList = rooms && rooms.map(({ id, title, mode, status, userList }: TRoom) => (
    <Room
      key={id}
      id={id}
      title={title}
      mode={mode}
      status={status}
      userList={userList}
      onChooseRoom={onChooseRoom}
    />
  ));

  return (
    <div id="room-list" className="row">
      <div className="col-md-9">
        <div className="block">
          <h2>Room List</h2>
          <div className="rooms">
            {roomList}
          </div>
        </div>
        <div className="block chat">
          <h2>Chatting Room</h2>
          <div className="messages">
          </div>
          <div className="type-message">
            <input type="text" placeholder="想說點什麼嗎？..."/>
            <div className="submit">Submit</div>
          </div>
        </div>
      </div>
      <div className="col-md-3">
        <div className="block">
          <h2>Player List</h2>
          <div className="player-list">
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomList;
