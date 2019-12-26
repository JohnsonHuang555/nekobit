import React from 'react';
import RoomList from 'src/components/RoomList/RoomList';
import { TRoom } from 'src/types/Room';
import '@styles/components/rooms/roomList.scss';

type RoomListProps = {
  rooms: TRoom[];
};

const RoomListPage = (props: RoomListProps) => {
  const {
    rooms,
  } = props;
  return (
    <div className="container">
      <div className="col-9">
        <div id="roomList" className="roomListBlocks">
          <div className="block-head">
            <h2>Room List</h2>
          </div>
          <div className="block-content">
            <RoomList
              rooms={rooms}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomListPage;