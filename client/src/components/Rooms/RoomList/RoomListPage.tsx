import React from 'react';
import RoomList from './RoomList';
import { TRoom } from '../../../types/Room';
import { LocationState } from 'history';
import '../../../assets/styles/rooms/roomList.scss';

type RoomListProps = {
  rooms: TRoom[];
  location: LocationState;
};

const RoomListPage = (props: RoomListProps) => {
  const {
    rooms,
    location,
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
              location={location}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomListPage;