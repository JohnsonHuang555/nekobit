import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TRoomUser } from '../types/Room';
import '../styles/room/user.scss'

type RoomUserProps = {
  user: TRoomUser
};

const RoomUser = (props: RoomUserProps) => {
  const {
    user
  } = props;
  return (
    <div className="user">
      <div className="name">{user.Name}</div>
      <FontAwesomeIcon icon="crown" />
    </div>
  )
}

export default RoomUser;
