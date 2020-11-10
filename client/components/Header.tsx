import React from 'react';
import Link from 'next/link';
import Icon, { IconType } from './Icon';
import styles from 'styles/components/header.module.scss';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>LOGO</div>
      <ul>
        <li>
          <Link href="/">
            <a>Home</a>
          </Link>
        </li>
        <li>
          <Link href="/">
            <a>Games</a>
          </Link>
        </li>
        <li>
          <Link href="/">
            <a>About</a>
          </Link>
        </li>
      </ul>
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
    </header>
  );
};

export default Header;
