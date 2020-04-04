import React, { useState } from 'react';
import {
  faUserCircle,
  faTimes
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@styles/components/modals/modal.scss';
import '@styles/components/modals/loginModal.scss';

type LoginModalProps = {
  show: boolean;
  login: (name: string) => void;
  onCloseLogin?: () => void;
}

const LoginModal = (props: LoginModalProps) => {
  const {
    show,
    login,
    onCloseLogin,
  } = props;

  const [name, setName] = useState('');

  return (
    <>
      { show &&
        <div id="login-modal">
          <div className="modal-shadow" />
          <div className="app-modal">
            <div className="app-modal-dialog">
              <div className="exit" onClick={onCloseLogin}>
                <FontAwesomeIcon icon={faTimes} />
              </div>
              <div className="guest">
                <h2>Quick Start</h2>
                <div className="icon">
                  <FontAwesomeIcon icon={faUserCircle} />
                </div>
                <input placeholder="User Nickname" type="text" onChange={(e) => setName(e.target.value)}/>
                <button onClick={() => login(name)}>Start</button>
              </div>
              <div className="or">
                <span>OR</span>
              </div>
              <div className="account-login">
                <h2>Login</h2>
                <input placeholder="User Nickname" type="text" />
                <input placeholder="Password" type="password" />
                <button>Submit</button>
                <p>創立一個霸氣屬於自己的帳號<a href="javacript: void(0);">立即註冊</a></p>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default LoginModal;
