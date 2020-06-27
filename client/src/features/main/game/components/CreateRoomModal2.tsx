import React, { useState } from 'react';
import { Button, Modal, Fade, Backdrop } from '@material-ui/core';
import { faTimes, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@styles/components/modals/modal.scss';
import '@styles/components/modals/createRoomModal.scss';

type modeProps = {
  label: string;
  value: number;
};

export type TCreateRoom = {
  roomTitle: string;
  roomMode: number;
  roomPassword: string;
};

type CreateRoomModalProps = {
  show: boolean;
  mode?: modeProps[];
  onCreate: (data: TCreateRoom) => void;
  onCloseLogin?: () => void;
}

const CreateRoomModal = (props: CreateRoomModalProps) => {
  const {
    show,
    mode = [],
    onCreate,
    onCloseLogin,
  } = props;
  const [roomTitle, setRoomTitle] = useState('');
  const [roomPassword, setRoomPassword] = useState('');
  const [roomMode, setRoomMode] = useState(0); // default none

  const onSubmit = () => {
    if (!roomTitle || !roomMode) {
      return;
    }
    onCreate({
      roomTitle,
      roomPassword,
      roomMode
    });
  }

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className="gp-modal"
      open={show}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={show}>
        <div className="">
          <h2 id="transition-modal-title">Transition modal</h2>
          <p id="transition-modal-description">react-transition-group animates me.</p>
        </div>
      </Fade>
    </Modal>
      {/* {show && (
        <div id="create-room-modal">
          <div className="modal-shadow" />
          <div className="app-modal">
            <div className="app-modal-dialog">
              <div className="exit" onClick={onCloseLogin}>
                <FontAwesomeIcon icon={faTimes} />
              </div>
              <h2>Create Room</h2>
              <div className="group">
                <label>房間名稱</label>
                <input
                  id="room-name"
                  type="text"
                  placeholder="Room name"
                  onChange={(e) => setRoomTitle(e.target.value)}
                />
              </div>
              {mode && (
                <div className="group">
                  <label>遊戲模式</label>
                  <div className="room_mode_group">
                    <select id="room-mode" onChange={(e) => setRoomMode(Number(e.target.value))}>
                      <option value="0">請選擇模式</option>
                      {mode.map((m, i) => (
                        <option key={i} value={m.value}>{m.label}</option>
                      ))}
                    </select>
                    <FontAwesomeIcon icon={faChevronDown} />
                  </div>
                </div>
              )}
              <div className="group">
                <input id="room-password" type="checkbox" />
                <label htmlFor="room-password">私人房間</label>
                <input
                  type="password"
                  placeholder="Password"
                  disabled={true}
                  onChange={(e) => setRoomPassword(e.target.value)}
                />
              </div>
              <Button
                className="create"
                onClick={onSubmit}
              >
                Create
              </Button>
            </div>
          </div>
        </div>
      )} */}
    // </>
  )
}

export default CreateRoomModal;
