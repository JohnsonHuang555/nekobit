import React from 'react';
import AlertIcon from './icons/Alert';
import styles from 'styles/components/icon.module.scss';

export enum IconType {
  Alert = 'alert'
}

type IconProps = {
  type: IconType;
}

const iconList = {
  [IconType.Alert]: <AlertIcon />,
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
