import React from 'react';
import Link from 'next/link';
import Icon, { IconType } from './Icon';
import { useDispatch, useSelector } from 'react-redux';
import { selectShowModal, selectUserInfo } from 'selectors/appSelector';
import Modal from './Modal';
import styles from 'styles/components/header.module.scss';
import Input from './Input';
import Button from './Button';
import { setShowModal } from 'slices/appSlice';

const Header = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector(selectUserInfo);
  const { showModal } = useSelector(selectShowModal);

  return (
    <>
      <Modal show={showModal} title="LogIn" >
        <Input
          type="text"
          placeholder="請輸入玩家暱稱"
          label="玩家暱稱"
          value=""
          onChange={() => {}}
          customStyles={{ marginBottom: '20px' }}
        />
        <Button title="確認" color="secondary" />
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
            <div className={styles.alert}>
              <Icon type={IconType.Alert} />
            </div>
            <div className={styles.userInfo}>
              <img
                src="https://images.pexels.com/photos/3541389/pexels-photo-3541389.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                alt="user-avator"
                width={46}
                height={46}
              />
              <div className={styles.detail}>
                <span className={styles.userName}>瑪姬阿米是誰</span>
                <span className={styles.userLevel}>Lv. 100</span>
              </div>
            </div>
          </> :
          <ul className={styles.notLogin}>
            <li>
              <div className={styles.logIn}>Log In</div>
            </li>
            <li>
              <div className={styles.getStart} onClick={() => dispatch(setShowModal(true))}>Get Start</div>
            </li>
          </ul>
        }
      </header>
    </>
  );
};

export default Header;
