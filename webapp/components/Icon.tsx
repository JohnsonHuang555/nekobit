import React, { CSSProperties } from "react";
import AlertIcon from "./icons/Alert";
import FireIcon from "./icons/Fire";
import RocketIcon from "./icons/Rocket";
import TheaterMasksIcon from "./icons/TheaterMasks";
import ChessKnightIcon from "./icons/ChessKnight";
import UsersIcon from "./icons/Users";
import UserIcon from "./icons/User";
import ClockIcon from "./icons/Clock";
import KeyIcon from "./icons/Key";
import TwoUsersIcon from "./icons/TwoUsers";
import TimesIcon from "./icons/Times";
import EditSquareIcon from "./icons/EditSquare";
import CrownIcon from "./icons/Crown";
import styles from "styles/components/icon.module.scss";
import HandPointLeftIcon from "./icons/HandPointLeft";
import HandPointRightIcon from "./icons/HandPointRight";

// TODO: 客製化 大小 顏色

export enum IconType {
  Alert = "alert",
  Fire = "fire",
  Rocket = "rocket",
  TheaterMasks = "theater-masks",
  ChessKnight = "chess-knight",
  Users = "users",
  User = "user",
  Clock = "clock",
  Key = "key",
  TwoUsers = "two-users",
  Times = "times",
  EditSquare = "edit-square",
  Crown = "crown",
  HandPointRight = "hand-point-right",
  HandPointLeft = "hand-point-left",
}

type IconProps = {
  type: IconType;
  label?: string;
  style?: CSSProperties;
  size?: "xs" | "md" | "lg";
  color?: "primary" | "second" | "dark-warning";
  childern?: React.ReactNode;
};

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
  [IconType.Crown]: <CrownIcon />,
  [IconType.HandPointLeft]: <HandPointLeftIcon />,
  [IconType.HandPointRight]: <HandPointRightIcon />,
};

const Icon = (props: IconProps) => {
  const { type, label, style, size, color, childern } = props;

  const iconClasses = () => {
    if (!size) {
      return "";
    }
    switch (size) {
      case "xs":
        return styles.xs;
      case "md":
        return styles.md;
      case "lg":
        return styles.lg;
    }
  };

  const iconColor = () => {
    if (!color) {
      return "";
    }
    switch (color) {
      case "primary":
        return styles.primary;
      case "second":
        return styles.second;
      case "dark-warning":
        return styles.darkWarning;
    }
  };

  return (
    <div className={styles.content} style={style}>
      <div className={`${styles.icon} ${iconClasses()} ${iconColor()}`}>
        {iconList[type]}
      </div>
      {childern
        ? childern
        : label && (
            <span className={`${styles.label} ${iconClasses()}`}>{label}</span>
          )}
    </div>
  );
};

export default Icon;
