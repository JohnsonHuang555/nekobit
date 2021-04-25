import { Room } from 'domain/models/Room';
import styles from 'styles/pages/room/playerList.module.scss';

type PlayerListProps = {
  selectedRoom: Room;
  isNowPlayer: (playerId: string) => boolean;
};

const PlayerList = (props: PlayerListProps) => {
  const { selectedRoom, isNowPlayer } = props;

  return (
    <div className={`${styles.block} ${styles.playerList}`}>
      <div className={styles.header}>
        <div className={styles.roomInfo}>
          <div className={styles.roomNumber}>001</div>
          <div className={styles.roomTitle}>{selectedRoom.title}</div>
        </div>
        {/* <Icon type={IconType.EditSquare} label="編輯" /> */}
      </div>
      <div className={styles.content}>
        {selectedRoom.playerList.map((player) => (
          <div
            key={player.id}
            className={`${styles.player} ${
              isNowPlayer(player.id) ? styles.nowPlayer : ''
            }`}
          >
            <div
              className={styles.picture}
              style={{
                backgroundImage:
                  "url('https://images.pexels.com/photos/3541389/pexels-photo-3541389.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260')",
              }}
            />
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
                  {/* <Icon
                    type={IconType.Crown}
                    label="房主"
                    size="lg"
                    color="dark-warning"
                  /> */}
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
