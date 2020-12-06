import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { selectShowModal, selectUserInfo } from 'selectors/appSelector';
import Modal from './Modal';
import Input from './Input';
import Button from './Button';
import { setShowModal, setUserInfo } from 'slices/appSlice';
import { v4 as uuidv4 } from 'uuid';
import styles from 'styles/components/header.module.scss';
import { User } from 'domain/models/User';

const Header = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector(selectUserInfo);
  const { showModal } = useSelector(selectShowModal);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const user = localStorage.getItem('userInfo');
    if (user) {
      const uiObj: User = JSON.parse(user);
      dispatch(setUserInfo(uiObj));
    }
  }, [dispatch])

  const onLogin = () => {
    const user: User = {
      id: uuidv4(),
      name: userName,
    };
    localStorage.setItem('userInfo', JSON.stringify(user));
    dispatch(setUserInfo(user));
    dispatch(setShowModal(false));
  };

  return (
    <>
      <Modal show={showModal} title="LogIn" >
        <Input
          type="text"
          placeholder="請輸入玩家暱稱"
          label="玩家暱稱"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          customStyles={{ marginBottom: '20px' }}
        />
        <Button
          title="確認"
          color="secondary"
          onClick={() => onLogin()}
        />
      </Modal>
      <header className={styles.header}>
        <Link href="/">
          <a className={styles.logo}>LOGO</a>
        </Link>
        <ul>
          <li>
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          <li>
            <Link href="/games">
              <a>Games</a>
            </Link>
          </li>
          <li>
            <Link href="/">
              <a>About</a>
            </Link>
          </li>
        </ul>
        {userInfo ?
          <>
            {/* beta 版不做 */}
            {/* <div className={styles.alert}>
              <Icon type={IconType.Alert} />
            </div> */}
            <div className={styles.userInfo}>
              <img
                src="https://images.pexels.com/photos/4297820/pexels-photo-4297820.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                alt="user-avator"
                width={46}
                height={46}
              />
              <div className={styles.detail}>
                <span className={styles.userName}>{userInfo.name}</span>
                <span className={styles.userLevel}>Lv. 100</span>
              </div>
            </div>
          </> :
          <ul className={styles.notLogin}>
            <li>
              <div className={styles.logIn}>Log In</div>
            </li>
            <li>
              <div
                className={styles.getStart}
                onClick={() => dispatch(setShowModal(true))}
              >
                Get Start
              </div>
            </li>
          </ul>
        }
      </header>
    </>
  );
};

export default Header;
