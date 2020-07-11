import React, { useEffect, useState } from 'react';
import Router from 'next/router';
import Layout from 'src/components/Layout';
import RoomList from 'src/features/main/game/components/RoomList';
import GameDetail from 'src/features/main/game/components/GameDetail';
import { GameMode } from 'src/features/main/domain/models/Game';
import { TRoom } from 'src/features/main/domain/models/Room';
import {
  Box,
  TextField,
  MenuItem,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  IconButton
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { useDispatch, useSelector } from 'react-redux';
import { gameInfoSelector, roomsSelector, createRoomDataSelector, createdRoomIdSelector } from 'src/features/main/selectors';
import { userInfoSelector, websocketSelector, showToastSelector } from 'src/selectors';
import { ActionType as GameActionType, ActionType } from 'src/features/main/reducers/gameReducer';
import { ActionType as AppActionType } from 'src/reducers/appReducer';
import { TSocket, SocketEvent } from 'src/types/Socket';
import { RoomFactory } from 'src/features/main/domain/factories/RoomFactory';

const GameContainer = () => {
  const dispatch = useDispatch();
  const showToast = useSelector(showToastSelector);
  const gameInfo = useSelector(gameInfoSelector);
  const rooms = useSelector(roomsSelector);
  const userInfo = useSelector(userInfoSelector);
  const ws = useSelector(websocketSelector);
  const createRoomData = useSelector(createRoomDataSelector);
  const createdRoomId = useSelector(createdRoomIdSelector);

  const [showRoomList, setShowRoomList] = useState(false);
  const [showCreateRoomModal, setShowCreateRoomModal] = useState(false);
  const [showEnterPasswordModal, setShowEnterPasswordModal] = useState(false);
  const [editingPassword, setEditingPassword] = useState('');
  const [selectedRoomId, setSelectedRoomId] = useState('');

  useEffect(() => {
    const gameId = location.search.substr(4);
    dispatch({ type: AppActionType.GET_USER_INFO,});
    dispatch({
      type: AppActionType.CREATE_SOCKET,
      domain: 'game_page',
    });
    dispatch({
      type: GameActionType.GET_GAME_INFO,
      id: gameId,
    });
    return () => {
      dispatch({ type: AppActionType.CLOSE_SOCKET });
    }
  }, []);

  useEffect(() => {
    if (ws && userInfo) {
      ws.onopen = () => {
        dispatch({
          type: AppActionType.SET_SHOW_TOAST,
          show: true,
          message: 'Connect successfully',
        });
        const socketData: TSocket = {
          userID: userInfo.id,
          event: SocketEvent.GetRooms,
        }
        ws.send(JSON.stringify(socketData));
      }
      ws.onerror = () => {
        console.log('connect failed');
      }
      ws.onmessage = (webSocket: MessageEvent) => {
        const wsData: TSocket = JSON.parse(webSocket.data);
        switch (wsData.event) {
          case SocketEvent.GetRooms: {
            const rooms: TRoom[] = RoomFactory.createArrayFromNet(wsData.data.rooms || []);
            if (rooms.length) {
              dispatch({
                type: GameActionType.GET_ROOMS,
                rooms,
              });
            }
          }
        }
      }
    }
  }, [ws, userInfo]);

  useEffect(() => {
    if (createdRoomId && userInfo && ws) {
      const socketData: TSocket = {
        userID: userInfo.id,
        event: SocketEvent.GetRooms,
      }
      ws.send(JSON.stringify(socketData));
    }
  }, [createdRoomId]);

  // methods
  const onChooseRoom = (id: string) => {
    const roomInfo = rooms.find(r => r.id === id);
    if (!roomInfo) { return; }
    setSelectedRoomId(id);

    if (roomInfo.password && editingPassword) {
      if (roomInfo.password === editingPassword) {
        redirectToRoomPage(id);
      } else {
        alert('Wrong password');
      }
      setEditingPassword('');
    } else if (roomInfo.password) {
      setShowEnterPasswordModal(true);
    } else {
      redirectToRoomPage(id);
    }
  }

  const redirectToRoomPage = (id: string) => {
    if (id) {
      Router.push({
        pathname: '/room',
        query: { id }
      });
    }
  }

  if (!gameInfo) { return null; }

  return (
    <Layout>
      <Dialog
        fullWidth
        open={showCreateRoomModal}
        onClose={() => setShowCreateRoomModal(false)}
        aria-labelledby="create-room-modal"
      >
        <DialogTitle id="create-room-modal">創建房間</DialogTitle>
        <DialogContent>
          <Box marginBottom={2}>
            <TextField
              required
              fullWidth
              label="房間名稱"
              placeholder="請輸入房間名稱"
              variant="outlined"
              onChange={(e) => dispatch({
                type: ActionType.CREATING_ROOM,
                createRoomData: { title: e.target.value }
              })}
            />
          </Box>
          <Box marginBottom={2}>
            <TextField
              required
              fullWidth
              label="房間密碼"
              placeholder="請輸入房間密碼"
              type="password"
              variant="outlined"
              onChange={(e) => dispatch({
                type: ActionType.CREATING_ROOM,
                createRoomData: { password: e.target.value }
              })}
            />
          </Box>
          <Box marginBottom={2}>
            {gameInfo && (
              <TextField
                fullWidth
                select
                label="遊戲模式"
                value={createRoomData.mode}
                variant="outlined"
                onChange={(e) => dispatch({
                  type: ActionType.CREATING_ROOM,
                  createRoomData: { mode: Number(e.target.value) }
                })}
              >
                {GameMode[gameInfo.id].map((m, i) => (
                  <MenuItem key={i} value={m.value}>
                    {m.label}
                  </MenuItem >
                ))}
              </TextField>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setShowCreateRoomModal(false)}
            color="primary"
          >
            Cancel
          </Button>
          <Button
            onClick={() => dispatch({
              type: ActionType.CREATE_ROOM,
              createRoomData,
            })}
            color="primary"
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={showEnterPasswordModal}
        onClose={() => setShowEnterPasswordModal(false)}
      >
        <DialogTitle id="enter-password">請輸入房間密碼</DialogTitle>
        <DialogContent>
          <Box marginBottom={3}>
            <TextField
              required
              fullWidth
              margin="dense"
              label="房間密碼"
              placeholder="請輸入房間密碼"
              type="password"
              variant="outlined"
              value={editingPassword}
              onChange={(e) => setEditingPassword(e.target.value)}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowEnterPasswordModal(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={() => onChooseRoom(selectedRoomId)} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      <Box>
        {showRoomList ? (
          <RoomList
            rooms={rooms}
            gameId={gameInfo.id}
            maxPlayers={gameInfo.maxPlayers}
            onChooseRoom={(id) => onChooseRoom(id)}
          />
        ): (
          <GameDetail
            gameInfo={gameInfo}
            roomsCount={rooms.length}
            onShowModal={() => setShowCreateRoomModal(true)}
            playNow={() => setShowRoomList(true)}
          />
        )}
      </Box>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        open={showToast.show}
        autoHideDuration={4000}
        onClose={() => dispatch({
          type: AppActionType.SET_SHOW_TOAST,
          show: false,
        })}
        message={showToast.message}
        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={() => dispatch({
                type: AppActionType.SET_SHOW_TOAST,
                show: false,
              })}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </Layout>
  )
};

export default GameContainer;
