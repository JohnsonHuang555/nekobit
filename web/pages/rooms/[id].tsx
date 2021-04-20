import { setSnackbar } from 'actions/AppAction';
import { checkJoinRoom } from 'actions/RoomAction';
import { wsConnect } from 'actions/WebSocketAction';
import Layout from 'components/Layout';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userInfoSelector } from 'selectors/AppSelector';
import { checkJoinSelector } from 'selectors/RoomSelector';
import { isConnectedSelector } from 'selectors/WebSocketSelector';

const Room = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const roomId = router.query.id;
  const checkJoin = useSelector(checkJoinSelector);
  const userInfo = useSelector(userInfoSelector);
  const isConnected = useSelector(isConnectedSelector);

  useEffect(() => {
    if (roomId) {
      const host = `ws://localhost:5000/ws/${roomId}`;
      dispatch(wsConnect(host));
    }
    // if (!userInfo) {
    //   dispatch(
    //     setSnackbar({
    //       show: true,
    //       message: '請先登入',
    //     })
    //   );
    // }
  }, [roomId]);

  useEffect(() => {
    console.log('tttttt');
  }, [isConnected]);

  // when room created then get roomId
  // useEffect(() => {
  //   // check join room
  //   dispatch(checkJoinRoom(String(roomId)));
  // }, [roomId]);

  // useEffect(() => {
  //   console.log(checkJoin);
  // }, [checkJoin]);

  return (
    <Layout>
      <div>123</div>
    </Layout>
  );
};

export default Room;
