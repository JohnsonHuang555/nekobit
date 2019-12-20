import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrown } from '@fortawesome/free-solid-svg-icons';
import { TRoomUser } from '../../types/Room';
import '@styles/components/rooms/user.scss'

type RoomUserProps = {
  user: TRoomUser
}

const RoomUser = (props: RoomUserProps) => {
  const {
    user
  } = props;

  return (
    <div className="user">
      <div className="name">{user.name}</div>
      {
        user.isMaster ?
        <FontAwesomeIcon icon={faCrown} /> :
        null
      }
    </div>
  )
}

export default RoomUser;
