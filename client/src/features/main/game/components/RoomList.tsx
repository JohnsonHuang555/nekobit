import React from 'react';
import Room from 'src/features/main/game/components/Room';
import { TRoom } from 'src/features/main/domain/models/Room';
import { GameMode, TGame } from 'src/features/main/domain/models/Game';
import { Box, Grid, Button } from '@material-ui/core';
import Chat from 'src/components/Chat';
import { faRedo, faDoorOpen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from '@styles/components/roomList.module.scss';

type RoomListProps = {
  rooms: TRoom[];
  gameInfo: TGame;
  onChooseRoom: (id: string) => void;
  onRefreshRooms: () => void;
  onShowCreateRoomModal: () => void;
};

const RoomList = (props: RoomListProps) => {
  const {
    rooms,
    gameInfo,
    onChooseRoom,
    onRefreshRooms,
    onShowCreateRoomModal,
  } = props;

  return (
    <Box className={styles.roomList} mt="20px">
      {/* <Box mb={2} display="flex">
        <Box mr={2}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={onRefreshRooms}
            startIcon={
              <FontAwesomeIcon icon={faRedo} />
            }
          >
            刷新房間
          </Button>
        </Box>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={onShowCreateRoomModal}
          startIcon={
            <FontAwesomeIcon icon={faDoorOpen} />
          }
        >
          新建房間
        </Button>
      </Box> */}
      <Grid container spacing={3}>
        <Grid item xs={9}>
          <Box className="block">
            <Box className={styles['header']}>
              <Box>
                {gameInfo.name}
              </Box>
              <Box className={styles['controls']}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={onRefreshRooms}
                  startIcon={
                    <FontAwesomeIcon icon={faRedo} />
                  }
                >
                  刷新房間
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={onShowCreateRoomModal}
                  startIcon={
                    <FontAwesomeIcon icon={faDoorOpen} />
                  }
                >
                  新建房間
                </Button>
              </Box>
            </Box>
            <Grid container className={styles.rooms} spacing={1} alignContent="flex-start">
              {rooms.map(room => (
                <Grid item xs={6} key={room.id}>
                  <Room
                    roomInfo={room}
                    maxPlayers={gameInfo.maxPlayers}
                    gameMode={GameMode[gameInfo.id].find(g => g.value === room.mode)?.label}
                    onChooseRoom={onChooseRoom}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
          <Box className="block">
            <Chat
              onSubmit={() => {}}
            />
          </Box>
        </Grid>
        <Grid item xs={3}>
          <Box className="block">
            <Box className={styles.playerList}>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RoomList;
