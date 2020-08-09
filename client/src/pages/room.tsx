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
import { ActionType as AppActionType } from 'src/reducers/appReducer';
import { ActionType as RoomActionType } from 'src/features/main/reducers/roomReducer';
import { AppSocketEvent, TSocket } from 'src/types/Socket';
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
  roomSocketSelector,
} from 'src/features/main/selectors';
import { userInfoSelector } from 'src/selectors';
import ConfirmModal from 'src/components/Modals/ConfirmModal';
import AlertModal from 'src/components/Modals/AlertModal';

const RoomContainer = () => {
  const dispatch = useDispatch();
  const ws = useSelector(roomSocketSelector);
  const userInfo = useSelector(userInfoSelector);
  const roomInfo = useSelector(roomInfoSelector);
  const isYouMaster = useSelector(isYouMasterSelector);
  const isPlayerReady = useSelector(isPlayerReadySelector);
  const showGameScreen = useSelector(showGameScreenSelector);

  const [showEditModal, setShowEditModal] = useState(false);
  const [editingPassword, setEditingPassword] = useState('');
  const [leavingRoute, setLeavingRoute] = useState('');

  // leave room event
  const leaveRoomHandler = () => {
    dispatch({
      type: RoomActionType.SEND_MESSAGE_ROOM,
      event: AppSocketEvent.LeaveRoom,
      userId: userInfo?.id,
    });
  };

  const aa = (url: string) => {
    console.log(url, 'url')
    console.log(leavingRoute, 'leavvvvv')
    if (!leavingRoute) {
      setLeavingRoute(url)
      dispatch({
        type: AppActionType.SET_CONFIRM_MODAL,
        show: true,
        message: '確定要離開房間？'
      });
      throw 'route changing';
    }
    if (!url && leavingRoute) {
      leaveRoomHandler();
      Router.push(leavingRoute);
    }
  };

  // component did mount
  useEffect(() => {
    const id = location.search.substr(4);
    dispatch({ type: AppActionType.GET_USER_INFO });
    dispatch({
      type: RoomActionType.CREATE_SOCKET_ROOM,
      domain: id,
    });

    const leaveRoomConfirmHandler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      return e.returnValue = '';
    };

    // window.addEventListener('beforeunload', leaveRoomConfirmHandler);
    // window.addEventListener('unload', leaveRoomHandler);
    Router.events.on('routeChangeStart', aa);
    return () => {
      // window.removeEventListener('beforeunload', leaveRoomConfirmHandler);
      // window.removeEventListener('unload', leaveRoomHandler);
      Router.events.off('routeChangeStart', aa)
    }
  }, []);

  useEffect(() => {
    if (ws && userInfo && !showGameScreen) {
      let gameId = '';
      ws.onopen = () => {
        dispatch({
          type: AppActionType.SET_SHOW_TOAST,
          show: true,
          message: 'Join room',
        });
        dispatch({
          type: RoomActionType.SEND_MESSAGE_ROOM,
          event: AppSocketEvent.JoinRoom,
          userId: userInfo.id,
          data: {
            userName: userInfo.name,
          }
        });
      };
      ws.onmessage = (webSocket: MessageEvent) => {
        const wsData: TSocket = JSON.parse(webSocket.data);
        switch (wsData.event) {
          case AppSocketEvent.JoinRoom: {
            const roomInfo = RoomFactory.createFromNet(wsData.data.roomInfo);
            setEditingPassword(roomInfo.password);
            dispatch({
              type: RoomActionType.INITIAL_ROOM_INFO,
              roomInfo,
            });
            gameId = roomInfo.gameId;
            break;
          }
          case AppSocketEvent.LeaveRoom:
          case AppSocketEvent.ReadyGame: {
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
          case AppSocketEvent.StartGame: {
            const roomInfo = RoomFactory.createFromNet(wsData.data.roomInfo);
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
          case AppSocketEvent.ChangePassword: {
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
      type: RoomActionType.SEND_MESSAGE_ROOM,
      userId: id,
      event: AppSocketEvent.LeaveRoom,
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
      type: RoomActionType.SEND_MESSAGE_ROOM,
      event: AppSocketEvent.ChangePassword,
      data: {
        roomPassword: editingPassword,
      }
    })
    setShowEditModal(false);
  };

  return (
    <Layout>
      <ConfirmModal onConfirm={() => aa('')} />
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
            onClick={() => Router.push({
              pathname: '/game',
              query: { id: roomInfo.gameId }
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
                type: RoomActionType.SEND_MESSAGE_ROOM,
                event: AppSocketEvent.StartGame,
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
                type: RoomActionType.SEND_MESSAGE_ROOM,
                event: AppSocketEvent.ReadyGame,
                userId: userInfo?.id,
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
