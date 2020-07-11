import React from 'react';
import Room from 'src/features/main/game/components/Room';
import { TRoom } from '../../domain/models/Room';
import { GameMode } from '../../domain/models/Game';
// import '@styles/components/rooms/roomList.scss';

type RoomListProps = {
  rooms: TRoom[];
  gameId: string;
  maxPlayers: number;
  onChooseRoom: (id: string) => void;
};

const RoomList = (props: RoomListProps) => {
  const {
    rooms,
    gameId,
    maxPlayers,
    onChooseRoom,
  } = props;

  return (
    <div id="room-list" className="row">
      <div className="col-md-9">
        <div className="block">
          <h2>Room List</h2>
          <div className="rooms">
            {rooms.map(room => (
              <Room
                key={room.id}
                roomInfo={room}
                maxPlayers={maxPlayers}
                gameMode={GameMode[gameId].find(g => g.value === room.mode)?.label}
                onChooseRoom={onChooseRoom}
              />
            ))}
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
