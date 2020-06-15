import React from 'react';
import { faUser, faKey } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@styles/components/rooms/roomList.scss';
import { TRoomUser } from '../../domain/models/Room';

type RoomListProps = {
  id: string;
  title: string;
  mode: number;
  status: number;
  userList: TRoomUser[];
  roomNumber: number;
  onChooseRoom: (id: string) => void;
};

const Room = (props: RoomListProps) => {
  const {
    id,
    title,
    mode,
    status,
    userList,
    roomNumber,
    onChooseRoom,
  } = props;

  const onChoose = (id: string) => {
    if (userList.length === 2) {
      return;
    }
    onChooseRoom(id);
  }

  return (
    <div className="room">
      <div className="top">
        <div className="info">
          <span className="id">{roomNumber}.</span>
          <span className="title">{title}</span>
        </div>
        <div className="key">
          <FontAwesomeIcon icon={faKey}/>
          私密
        </div>
      </div>
      <div className="bottom">
        <span className="status">
          {/* FIXME: 2 該為變數 */}
          {userList.length < 2 ? 'Waiting' : 'Playing'}...
        </span>
        <span className="mode">
          {/* FIXME: 必須判斷模式 */}
          小盤
        </span>
        <span className="players">
          {/* FIXME: 2 該為變數 */}
          <FontAwesomeIcon icon={faUser}/> {userList.length || 1} / 2
        </span>
        <span className={"btn-enter " + (userList.length === 2 ? 'full' : 'remain')} onClick={() => onChoose(id)}>
          {/* FIXME: 2 該為變數 */}
          {userList.length === 2 ? 'Full' : 'Enter'}
        </span>
      </div>
    </div>
  )
};

export default Room;
