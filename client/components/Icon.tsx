import React, { CSSProperties } from 'react';
import AlertIcon from './icons/Alert';
import FireIcon from './icons/Fire';
import RocketIcon from './icons/Rocket';
import TheaterMasksIcon from './icons/TheaterMasks';
import ChessKnightIcon from './icons/ChessKnight';
import UsersIcon from './icons/Users';
import UserIcon from './icons/User';
import ClockIcon from './icons/Clock';
import styles from 'styles/components/icon.module.scss';
import KeyIcon from './icons/Key';
import TwoUsersIcon from './icons/TwoUsers';

export enum IconType {
  Alert = 'alert',
  Fire = 'fire',
  Rocket = 'rocket',
  TheaterMasks = 'theater-masks',
  ChessKnight = 'chess-knight',
  Users = 'users',
  User = 'user',
  Clock = 'clock',
  Key = 'key',
  TwoUsers = 'two-users',
}

type IconProps = {
  type: IconType;
  label?: string;
  style?: CSSProperties;
}

const iconList = {
  [IconType.Alert]: <AlertIcon />,
  [IconType.Fire]: <FireIcon />,
  [IconType.Rocket]: <RocketIcon />,
  [IconType.TheaterMasks]: <TheaterMasksIcon />,
  [IconType.ChessKnight]: <ChessKnightIcon />,
  [IconType.Users]: <UsersIcon />,
  [IconType.User]: <UserIcon />,
  [IconType.Clock]: <ClockIcon />,
  [IconType.Key]: <KeyIcon />,
  [IconType.TwoUsers]: <TwoUsersIcon />,
};

const Icon = (props: IconProps) => {
  const { type, label, style } = props;
  return (
    <div className={styles.icon} style={style}>
      {iconList[type]}
      <span className={styles.label}>{label}</span>
    </div>
  );
};

export default Icon;
