import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Router from 'next/router';
import { faDoorOpen, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Layout from "src/components/Layout";
import GameScreen from 'src/features/main/room/components/GameScreen';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  TextField,
  Grid,
} from '@material-ui/core';
import { roomWebsocketSelector, userInfoSelector } from 'src/selectors';
import { ActionType as AppActionType } from 'src/reducers/appReducer';
import { ActionType as RoomActionType } from 'src/features/main/reducers/roomReducer';
import { SocketEvent, TSocket } from 'src/types/Socket';
import { RoomFactory } from 'src/features/main/domain/factories/RoomFactory';
import UserList from 'src/features/main/room/components/UserList';
import { UserFactory } from 'src/features/main/domain/factories/UserFactory';
import Chat from 'src/components/Chat';
import GameSettings from 'src/features/main/room/components/GameSettings';
import {
  roomInfoSelector,
  isYouMasterSelector,
  isPlayerReadySelector,
  showGameScreenSelector,
} from 'src/features/main/selectors';
import ConfirmModal from 'src/components/Modals/ConfirmModal';
import AlertModal from 'src/components/Modals/AlertModal';

const RoomContainer = () => {
  const dispatch = useDispatch();
  const ws = useSelector(roomWebsocketSelector);
  const userInfo = useSelector(userInfoSelector);
  const roomInfo = useSelector(roomInfoSelector);
  const isYouMaster = useSelector(isYouMasterSelector);
  const isPlayerReady = useSelector(isPlayerReadySelector);
  const showGameScreen = useSelector(showGameScreenSelector);

  const [showEditModal, setShowEditModal] = useState(false);
  const [editingPassword, setEditingPassword] = useState('');

  // leave room event
  const leaveRoomHandler = () => {
    dispatch({
      type: AppActionType.SEND_MESSAGE_ROOM,
      event: SocketEvent.LeaveRoom,
    });
    dispatch({
      type: AppActionType.SEND_MESSAGE_GAME,
      event: SocketEvent.GetRooms,
    });
  };

  // component did mount
  useEffect(() => {
    const id = location.search.substr(4);
    dispatch({ type: AppActionType.GET_USER_INFO });
    dispatch({
      type: AppActionType.CREATE_SOCKET,
      domain: id,
    });

    const leaveRoomConfirmHandler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      return e.returnValue = '';
    };

    window.addEventListener('beforeunload', leaveRoomConfirmHandler);
    window.addEventListener('unload', leaveRoomHandler);
    return () => {
      dispatch({ type: AppActionType.CLOSE_SOCKET_ROOM });
      window.removeEventListener('beforeunload', leaveRoomConfirmHandler);
      window.removeEventListener('unload', leaveRoomHandler);
    }
  }, []);

  useEffect(() => {
    console.log(ws)
    if (ws && userInfo && !showGameScreen) {
      let gameId = '';
      ws.onopen = () => {
        dispatch({
          type: AppActionType.SET_SHOW_TOAST,
          show: true,
          message: 'Join room',
        });
        dispatch({
          type: AppActionType.SEND_MESSAGE_ROOM,
          event: SocketEvent.JoinRoom,
          data: {
            userName: userInfo.name,
          }
        });
      };
      ws.onmessage = (webSocket: MessageEvent) => {
        const wsData: TSocket = JSON.parse(webSocket.data);
        switch (wsData.event) {
          case SocketEvent.JoinRoom: {
            const roomInfo = RoomFactory.createFromNet(wsData.data.roomInfo);
            setEditingPassword(roomInfo.password);
            dispatch({
              type: RoomActionType.INITIAL_ROOM_INFO,
              roomInfo,
            });
            gameId = roomInfo.gameId;
            break;
          }
          case SocketEvent.LeaveRoom:
          case SocketEvent.ReadyGame:{
            const roomUserList = UserFactory.createArrayFromNet(wsData.data.roomUserList);
            const user = roomUserList.find(u => u.id === userInfo.id);
            if (user) {
              dispatch({
                type: RoomActionType.UPDATE_ROOM_INFO,
                roomInfo: {
                  userList: roomUserList,
                },
              });
            } else {
              Router.push({
                pathname: '/game',
                query: { id: gameId }
              });
            }
            break;
          }
          case SocketEvent.StartGame: {
            const roomInfo = RoomFactory.createFromNet(wsData.data.roomInfo);
            console.log(roomInfo)
            dispatch({
              type: RoomActionType.UPDATE_ROOM_INFO,
              roomInfo,
            });
            dispatch({
              type: RoomActionType.SET_SHOW_GAME_SCREEN,
              show: true,
            });
            break;
          }
          case SocketEvent.ChangePassword: {
            const roomInfo = RoomFactory.createFromNet(wsData.data.roomInfo);
            dispatch({
              type: RoomActionType.UPDATE_ROOM_INFO,
              roomInfo,
            });
            break;
          }
        }
      };
    }
  }, [ws, userInfo, showGameScreen]);

  if (!roomInfo) { return null; }

  // methods
  const kickOutPlayer = (id: string) => {
    dispatch({
      type: AppActionType.SEND_MESSAGE_ROOM,
      userId: id,
      event: SocketEvent.LeaveRoom,
    });
  };

  const disabledStart = (): boolean => {
    const notReady = roomInfo.userList.filter(u => !u.isReady) || [];
    if (notReady.length) {
      return true;
    }
    return false;
  }

  const changePassword = () => {
    dispatch({
      type: AppActionType.SEND_MESSAGE_ROOM,
      event: SocketEvent.ChangePassword,
      data: {
        roomPassword: editingPassword,
      }
    })
    setShowEditModal(false);
  };

  return (
    <Layout>
      <ConfirmModal onConfirm={() => leaveRoomHandler()} />
      <AlertModal onConfirm={() =>
        dispatch({
          type: RoomActionType.SET_SHOW_GAME_SCREEN,
          show: false,
        })}
      />
      <div className="section-heading">
        <h2>{roomInfo.roomNumber}.{roomInfo.title}</h2>
        <Box marginBottom={1} display="flex">
          <Box marginRight={1}>
            <Button
              variant="contained"
              color="primary"
              startIcon={
                <FontAwesomeIcon icon={faEdit}/>
              }
              onClick={() => setShowEditModal(true)}
            >
              編輯
            </Button>
          </Box>
          <Button
            variant="contained"
            color="secondary"
            startIcon={
              <FontAwesomeIcon icon={faDoorOpen}/>
            }
            onClick={() => dispatch({
              type: AppActionType.SET_CONFIRM_MODAL,
              show: true,
              message: '確定要離開房間？'
            })}
          >
            離開
          </Button>
        </Box>
      </div>
      <Grid container spacing={3}>
        <Grid item xs={8}>
          <UserList
            isYouMaster={isYouMaster}
            userList={roomInfo.userList}
            onKickOutPlayer={(id) => kickOutPlayer(id)}
          />
          <Box className="block">
            <Chat
              onSubmit={() => {}}
            />
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box className="block">
            <GameSettings />
          </Box>
          {isYouMaster ? (
            <Button
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              onClick={() => dispatch({
                type: AppActionType.SEND_MESSAGE_ROOM,
                event: SocketEvent.StartGame,
                data: {
                  gameID: roomInfo.gameId,
                  roomMode: roomInfo.mode,
                }
              })}
              disabled={disabledStart()}
            >
              Start
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              onClick={() => dispatch({
                type: AppActionType.SEND_MESSAGE_ROOM,
                event: SocketEvent.ReadyGame,
              })}
            >
              {isPlayerReady}
            </Button>
          )}
        </Grid>
      </Grid>
      {showGameScreen && roomInfo.status === 1 && userInfo && (
        <GameScreen gameId={roomInfo.gameId} />
      )}
      <Dialog
        fullWidth
        open={showEditModal}
        onClose={() => setShowEditModal(false)}
      >
        <DialogTitle id="leave-room-modal">請輸入房間密碼</DialogTitle>
        <DialogContent>
          <Box marginBottom={3}>
            <TextField
              required
              fullWidth
              margin="dense"
              label="房間密碼"
              placeholder="請輸入房間密碼"
              variant="outlined"
              value={editingPassword}
              onChange={(e) => setEditingPassword(e.target.value)}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setShowEditModal(false)}
            color="primary"
          >
            Cancel
          </Button>
          <Button
            onClick={() => changePassword()}
            color="primary"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Layout>
  )
};

export default RoomContainer;
