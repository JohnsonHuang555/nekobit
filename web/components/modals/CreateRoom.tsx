import { Game } from 'domain/models/Game';
import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  MenuItem,
} from '@material-ui/core';
import Select from '@material-ui/core/Select';
import { useDispatch } from 'react-redux';
import { setSnackbar } from 'actions/AppAction';
import { CreateRoomParams } from 'domain/models/Room';

type CreateRoomProps = {
  show: boolean;
  selectedGame: Game;
  onCreateRoom: (params: CreateRoomParams) => void;
  onClose: () => void;
};

const CreateRoom = (props: CreateRoomProps) => {
  const dispatch = useDispatch();
  const { show, selectedGame, onCreateRoom, onClose } = props;
  const [roomName, setRoomName] = useState('');
  const [selectedMode, setSelectedMode] = useState('');

  const onConfirm = () => {
    if (!roomName) {
      dispatch(
        setSnackbar({
          show: true,
          message: '請輸入房間名稱',
        })
      );
      return;
    }
    if (!selectedMode) {
      dispatch(
        setSnackbar({
          show: true,
          message: '請輸入房間模式',
        })
      );
      return;
    }
    onCreateRoom({
      name: roomName,
      mode: selectedMode,
    });
  };

  return (
    <Dialog
      open={show}
      onClose={onClose}
      aria-labelledby="create-room-dialog-title"
      fullWidth
    >
      <DialogTitle id="create-room-dialog-title">Create Room</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="room-name"
          label="Room name"
          type="text"
          fullWidth
          variant="outlined"
          onChange={(e) => setRoomName(e.target.value)}
          style={{ marginBottom: '20px' }}
        />
        <Select
          labelId="create-room-select-placeholder-label-label"
          id="create-room-select-placeholder-label"
          value={selectedMode}
          onChange={(e) => setSelectedMode(String(e.target.value))}
          displayEmpty
          fullWidth
          variant="outlined"
        >
          <MenuItem value="">
            <em>請選擇</em>
          </MenuItem>
          {selectedGame.modes.map((mode) => (
            <MenuItem key={mode.value} value={mode.value}>
              {mode.label}
            </MenuItem>
          ))}
        </Select>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>取消</Button>
        <Button onClick={() => onConfirm()}>建立</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateRoom;
