import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import LoginModal from 'components/modals/LoginModal';
import { useEffect, useState } from 'react';
import { User } from 'domain/models/User';
import { v4 as uuidv4 } from 'uuid';
import { loadUserInfo } from 'actions/AppAction';
import { userInfoSelector } from 'selectors/AppSelector';

const Header = () => {
  const dispatch = useDispatch();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const userInfo = useSelector(userInfoSelector);

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      const obj: User = JSON.parse(userInfo);
      dispatch(loadUserInfo(obj));
    }
  }, [dispatch]);

  const onConfirm = (name: string) => {
    const userInfo: User = {
      name,
      id: uuidv4(),
    };
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
    dispatch(loadUserInfo(userInfo));
    setShowLoginModal(false);
  };

  return (
    <>
      <LoginModal
        show={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onConfirm={onConfirm}
      />
      <AppBar position="static">
        <Toolbar>
          {/* TODO: LOGO */}
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            nekobit
          </Typography>
          <div>
            {userInfo ? (
              <Typography variant="h6">歡迎！{userInfo.name}</Typography>
            ) : (
              <Button color="inherit" onClick={() => setShowLoginModal(true)}>
                Get Start
              </Button>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
