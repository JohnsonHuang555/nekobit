import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrown } from '@fortawesome/free-solid-svg-icons';
import { TRoomUser } from 'src/features/main/domain/models/Room';
import { Button, Box } from '@material-ui/core';

type RoomUserProps = {
  user: TRoomUser;
  isMaster: boolean;
  onKickOutPlayer: () => void;
}

const RoomUser = (props: RoomUserProps) => {
  const {
    user,
    isMaster,
    onKickOutPlayer,
  } = props;

  return (
    <Box>

    </Box>
    // <div className="user">
    //   {user.isMaster && <FontAwesomeIcon icon={faCrown} />}
    //   <img src="https://images.pexels.com/photos/3393375/pexels-photo-3393375.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"/>
    //   <div className="info">
    //     <div className="name">{user.name}</div>
    //   </div>
    //   {isMaster && !user.isMaster && (
    //     <Button
    //       disableElevation
    //       variant="contained"
    //       color="secondary"
    //       onClick={() => onKickOutPlayer()}
    //     >
    //       踢除
    //     </Button>
    //   )}
    // </div>
  )
}

export default RoomUser;
