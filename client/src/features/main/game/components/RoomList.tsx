import React from 'react';
import Room from 'src/features/main/game/components/Room';
import { TRoom } from '../../domain/models/Room';
import { GameMode } from '../../domain/models/Game';
import { Box, Grid, TextField, Button } from '@material-ui/core';
import styles from '@styles/components/roomList.module.scss';
import Chat from 'src/components/Chat';

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
    <Box className={styles.roomList}>
      <div className="section-heading">
        <h2>房間列表</h2>
      </div>
      <Grid container spacing={3}>
        <Grid item xs={9}>
          <Box className="block">
            <Grid container className={styles.rooms} spacing={1} alignContent="flex-start">
              {rooms.map(room => (
                <Grid item xs={6} key={room.id}>
                  <Room
                    roomInfo={room}
                    maxPlayers={maxPlayers}
                    gameMode={GameMode[gameId].find(g => g.value === room.mode)?.label}
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
