import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TRoomUser } from '../types/Room';
import '../assets/styles/rooms/user.scss'

type RoomUserProps = {
  user: TRoomUser
};

const RoomUser = (props: RoomUserProps) => {
  const {
    user
  } = props;
  return (
    <div className="user">
      <div className="name">{user.name}</div>
      {
        user.isMaster ?
        <FontAwesomeIcon icon="crown" /> :
        null
      }
    </div>
  )
}

export default RoomUser;
