import React from 'react';
import AlertIcon from './icons/Alert';
import FireIcon from './icons/Fire';
import styles from 'styles/components/icon.module.scss';
import RocketIcon from './icons/Rocket';
import TheaterMasksIcon from './icons/TheaterMasks';
import ChessKnightIcon from './icons/ChessKnight';
import UsersIcon from './icons/Users';

export enum IconType {
  Alert = 'alert',
  Fire = 'fire',
  Rocket = 'rocket',
  TheaterMasks = 'theater-masks',
  ChessKnight = 'chess-knight',
  Users = 'users',
}

type IconProps = {
  type: IconType;
}

const iconList = {
  [IconType.Alert]: <AlertIcon />,
  [IconType.Fire]: <FireIcon />,
  [IconType.Rocket]: <RocketIcon />,
  [IconType.TheaterMasks]: <TheaterMasksIcon />,
  [IconType.ChessKnight]: <ChessKnightIcon />,
  [IconType.Users]: <UsersIcon />,
};

const Icon = (props: IconProps) => {
  const { type } = props;
  return (
    <div className={styles.icon}>
      {iconList[type]}
    </div>
  );
};

export default Icon;
