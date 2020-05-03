import Swiper from 'react-id-swiper';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { TGame } from 'src/features/main/domain/models/Game';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export type GameListProps = {
  games: TGame[];
  onChooseGame: (id: string) => void;
}

const GameList = (props: GameListProps) => {
  const {
    games,
    onChooseGame,
  } = props;

  const swiperParams = {
    slidesPerView: 4,
    spaceBetween: 30,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      dynamicBullets: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
  };

  return (
    <Box className="lobby-box">
      <Swiper {...swiperParams} shouldSwiperUpdate>
        {games.map((game: TGame) => (
          <Box key={game.id}>
            <Box className="game-card">
              <img
                className="game-image"
                src={`${game.imgUrl}/home.png`}
                alt={game.name}
                width="100%"
                height="100%"
              />
              <Box className="game-block">
                <Box className="center">
                  <h2>{game.name}</h2>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => onChooseGame(game.id)}
                  >
                    Enter
                  </Button>
                  <Box className="rates">
                    <Box className="stars">
                      <FontAwesomeIcon icon={faStar} />
                      <b>9.5 分</b>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        ))}
      </Swiper>
    </Box>
  );
};

export default GameList;
