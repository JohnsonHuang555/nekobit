import React, { useState } from 'react';
import '../assets/styles/modal.scss';

type ModalProps = {
  show: boolean;
  onLogin: (name: string) => void;
}

const LoginModal = (props: ModalProps) => {
  const {
    show,
    onLogin,
  } = props;

  const [name, setName] = useState('');

  return (
    <>
      { show ?
        <>
          <div className="modal-shadow" />
          <div className="app-modal">
            <div className="app-modal-dialog">
              <div className="app-modal-content">
                <h2>Login</h2>
                <input type="text" onChange={(e) => setName(e.target.value)}/>
                <button onClick={() => onLogin(name)}>Login</button>
              </div>
            </div>
          </div>
        </> : null}
    </>
  );
};

export default LoginModal;
