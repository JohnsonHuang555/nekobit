import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@material-ui/core';
import React, { useState } from 'react';

type LoginModalProps = {
  show: boolean;
  onClose: () => void;
  onSubmit: (name: string) => void;
};

const LoginModal = (props: LoginModalProps) => {
  const { show, onClose, onSubmit } = props;
  const [userName, setUserName] = useState('');

  const onOK = () => {
    if (!userName) {
      return;
    }
    onSubmit(userName);
  };

  return (
    <Dialog
      open={show}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Your Name</DialogTitle>
      <DialogContent>
        <TextField
          onChange={(e) => setUserName(e.target.value)}
          id="outlined-basic"
          label="Outlined"
          variant="outlined"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onOK} color="secondary" autoFocus>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LoginModal;
