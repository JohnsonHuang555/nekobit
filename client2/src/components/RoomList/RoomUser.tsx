import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrown } from '@fortawesome/free-solid-svg-icons';
import { TRoomUser } from 'src/types/Room';

type RoomUserProps = {
  user: TRoomUser;
}

const RoomUser = (props: RoomUserProps) => {
  const {
    user
  } = props;

  return (
    <div className="user">
      {user.isMaster && <FontAwesomeIcon icon={faCrown} />}
      <img src="https://images.pexels.com/photos/3393375/pexels-photo-3393375.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"/>
      <div className="info">
        <div className="name">{user.name}</div>
      </div>
    </div>
  )
}

export default RoomUser;
