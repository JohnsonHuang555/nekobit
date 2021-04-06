import { AppBar, Button, Toolbar, Typography } from '@material-ui/core';

const Header = () => {
  const changeRoute = (url: string) => {
    // router.push(url);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        {/* TODO: LOGO */}
        <Typography variant="h6" style={{ marginRight: '15px' }}>
          nekobit
        </Typography>
        <div style={{ flexGrow: 1 }}>
          <Button color="inherit" onClick={() => changeRoute('/')}>
            Home
          </Button>
          <Button color="inherit" onClick={() => changeRoute('/games')}>
            Games
          </Button>
          <Button color="inherit" onClick={() => changeRoute('/')}>
            About
          </Button>
        </div>
        {/* {userInfo ? (
            <>
              <Typography variant="h6">歡迎！{userInfo.name}</Typography>
            </>
          ) : (
            <>
              <Button color="inherit" onClick={() => setShowLoginModal(true)}>
                Login
              </Button>
              <Button color="inherit">Get Start</Button>
            </>
          )} */}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
