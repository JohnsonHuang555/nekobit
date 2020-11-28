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
import TimesIcon from './icons/Times';
import EditSquareIcon from './icons/EditSquare';

// TODO: 客製化 大小 顏色

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
  Times = 'times',
  EditSquare = 'edit-square',
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
  [IconType.Times]: <TimesIcon />,
  [IconType.EditSquare]: <EditSquareIcon />,
};

const Icon = (props: IconProps) => {
  const { type, label, style } = props;
  return (
    <div className={styles.icon} style={style}>
      {iconList[type]}
      {label && <span className={styles.label}>{label}</span>}
    </div>
  );
};

export default Icon;
