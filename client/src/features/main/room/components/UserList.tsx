import { Box, Grid, IconButton } from '@material-ui/core';
import { TRoomUser } from 'src/features/main/domain/models/Room';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrown, faUserTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import styles from '@styles/components/userList.module.scss'

type UserListProps = {
  isYouMaster: boolean;
  userList: TRoomUser[];
  onKickOutPlayer: (id: string) => void;
}

const UserList = (props: UserListProps) => {
  const {
    isYouMaster,
    userList,
    onKickOutPlayer,
  } = props;

  return (
    <Box className="block">
      <Grid container className={styles.userList} alignContent="flex-start" spacing={1}>
        {userList.map(user => (
          <Grid item xs={6} key={user.id}>
            <Box display="flex" className={styles.user} alignItems="center">
              <img src="https://images.pexels.com/photos/3393375/pexels-photo-3393375.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"/>
              <Box flex="1" className={styles.info}>
                <Box className={styles.name}>{user.name}</Box>
                <IconButton aria-label="info" size="small">
                  <FontAwesomeIcon icon={faInfoCircle} />
                </IconButton>
                {isYouMaster && !user.isMaster && (
                  <IconButton aria-label="kickout" size="small" onClick={() => onKickOutPlayer(user.id)}>
                    <FontAwesomeIcon icon={faUserTimes} />
                  </IconButton>
                )}
              </Box>
              <Box flex="1" className={styles.status}>
                {user.isMaster ? (
                  <Box className={styles.master}>
                    <FontAwesomeIcon icon={faCrown} />
                    <span className={styles.text}>房主</span>
                  </Box>
                ) : (
                  <Box className={styles.isReady}>
                    <Box className={user.isReady ? `${styles.ready}` : `${styles.notReady}`}>Ready</Box>
                  </Box>
                )}
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
};

export default UserList;
