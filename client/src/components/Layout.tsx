import React from 'react';
import dynamic from 'next/dynamic'
import Meta from 'src/components/Meta';
import { Container, Snackbar, IconButton } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { showToastSelector } from 'src/selectors';
import CloseIcon from '@material-ui/icons/Close';
import { ActionType as AppActionType } from 'src/reducers/appReducer';
// import Footer from 'src/components/Footer';

const Header = dynamic(
  () => import('./Header'),
  { ssr: false }
)

type LayoutProps = {
  children: React.ReactNode;
  meta?: any;
};

const Layout = (props: LayoutProps) => {
  const showToast = useSelector(showToastSelector);
  const dispatch = useDispatch();

  const {
    children,
    meta,
  } = props;

  return (
    <>
      <Meta {...meta} />
      <Header />
      <Container>
        {children}
      </Container>
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
      {/* <Footer /> */}
    </>
  )
};

export default Layout;
