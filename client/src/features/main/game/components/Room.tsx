import React from 'react';
import { faUser, faKey } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TRoom } from 'src/features/main/domain/models/Room';
import { Box, Button } from '@material-ui/core';
import styles from '@styles/components/room.module.scss';

type RoomListProps = {
  roomInfo: TRoom;
  maxPlayers: number;
  gameMode?: string;
  onChooseRoom: (id: string) => void;
};

const Room = (props: RoomListProps) => {
  const {
    roomInfo,
    maxPlayers,
    gameMode,
    onChooseRoom,
  } = props;

  const isFull = roomInfo.userList.length === maxPlayers;

  const onChoose = (id: string) => {
    if (isFull) {
      return;
    }
    onChooseRoom(id);
  }

  return (
    <Box className={styles.room}>
      <Box display="flex" className={styles.top}>
        <Box
          display="flex"
          alignItems="center"
          className={styles.info}
        >
          <Box>{roomInfo.roomNumber}.</Box>
          <Box>{roomInfo.title}</Box>
        </Box>
        {roomInfo.password && (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="flex-end"
            width="100%"
          >
            <FontAwesomeIcon icon={faKey} className={styles.key}/>
            <Box marginLeft={1}>私密</Box>
          </Box>
        )}
      </Box>
      <Box
        display="flex"
        className={styles.bottom}
      >
        <Box className={styles.status}>
          {isFull ? 'Playing' : 'Waiting'}
        </Box>
        <Box className={styles.mode}>
          {gameMode}
        </Box>
        <Box className={styles.players}>
          <FontAwesomeIcon icon={faUser}/>
          <Box marginLeft={1}>
            {roomInfo.userList.length || 1} / {maxPlayers}
          </Box>
        </Box>
        <Button
          variant="contained"
          color="primary"
          onClick={() => onChoose(roomInfo.id)}
          disabled={isFull}
        >
          {isFull ? 'Full' : 'Enter'}
        </Button>
      </Box>
    </Box>
  )
};

export default Room;
