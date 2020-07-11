import React from 'react';
import Room from 'src/features/main/game/components/Room';
import { TRoom } from '../../domain/models/Room';
import { GameMode } from '../../domain/models/Game';
import { Box, Grid, TextField, Button } from '@material-ui/core';
import styles from '@styles/components/roomList.module.scss';

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
          <Box className={styles.block}>
            <Grid container className={styles.rooms}>
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
          <Box className={styles.block}>
            <Box className={styles.chat}>
            </Box>
            <Box display="flex">
              <TextField
                label="想說點什麼嗎？..."
                variant="outlined"
                color="primary"
                size="small"
                fullWidth
              />
              <Button variant="contained" color="primary">
                送出
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={3}>
          <Box className={styles.block}>
            <Box className={styles.playerList}>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
    // <div id="room-list" className="row">
    //   <div className="col-md-9">
    //     <div className="block">
    //       <h2>Room List</h2>
    //       <div className="rooms">
    //         {rooms.map(room => (
    //           <Room
    //             key={room.id}
    //             roomInfo={room}
    //             maxPlayers={maxPlayers}
    //             gameMode={GameMode[gameId].find(g => g.value === room.mode)?.label}
    //             onChooseRoom={onChooseRoom}
    //           />
    //         ))}
    //       </div>
    //     </div>
    //     <div className="block chat">
    //       <h2>Chatting Room</h2>
    //       <div className="messages">
    //       </div>
    //       <div className="type-message">
    //         <input type="text" placeholder="想說點什麼嗎？..."/>
    //         <div className="submit">Submit</div>
    //       </div>
    //     </div>
    //   </div>
    //   <div className="col-md-3">
    //     <div className="block">
    //       <h2>Player List</h2>
    //       <div className="player-list">
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default RoomList;
