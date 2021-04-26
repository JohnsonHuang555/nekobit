import { Room } from 'domain/models/Room';
import Icon from 'components/Icon';
import { Stars, AccountCircle } from '@material-ui/icons';
import styles from 'styles/pages/room/playerList.module.scss';

type PlayerListProps = {
  roomInfo: Room;
  isNowPlayer: (playerId: string) => boolean;
};

const PlayerList = (props: PlayerListProps) => {
  const { roomInfo, isNowPlayer } = props;

  return (
    <div className={`${styles.block} ${styles.playerList}`}>
      <div className={styles.header}>
        <div className={styles.roomInfo}>
          <div className={styles.roomNumber}>001</div>
          <div className={styles.roomTitle}>{roomInfo.title}</div>
        </div>
        {/* <Icon type={IconType.EditSquare} label="編輯" /> */}
      </div>
      <div className={styles.content}>
        {roomInfo.playerList.map((player) => (
          <div
            key={player.id}
            className={`${styles.player} ${
              isNowPlayer(player.id) ? styles.nowPlayer : ''
            }`}
          >
            <Icon customStyles={{ width: '50px', height: '50px' }}>
              <AccountCircle
                htmlColor="#cccccc"
                style={{ width: '100%', height: '100%' }}
              />
            </Icon>
            <div className={styles.info}>
              <div
                className={`${styles.playerName} ${
                  isNowPlayer(player.id) ? styles.nowPlayerName : ''
                }`}
              >
                {player.name}
              </div>
              {!player.isMaster ? (
                <div
                  className={`${
                    player.isReady ? styles.ready : styles.notReady
                  }`}
                >
                  Ready
                </div>
              ) : (
                <div className={styles.master}>
                  <Icon title="房主" customStyles={{ fontSize: '28px' }}>
                    <Stars htmlColor="#e2c138" />
                  </Icon>
                </div>
              )}
            </div>
            {/* TODO: 踢人 */}
            {/* {player.isMaster && isNowPlayer(player.id) &&
              <div className={styles.delete}>
                <Icon type={IconType.Times} />
              </div>
            } */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayerList;
