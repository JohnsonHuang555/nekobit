import React from "react";
import Layout from "components/Layout";
import Icon, { IconType } from "components/Icon";
import { Game } from "domain/models/Game";
import { useRouter } from "next/router";
import styles from "styles/pages/games.module.scss";
import { GamePack } from "domain/models/Room";

const categoryList = [
  {
    id: 1,
    icon: IconType.Fire,
    title: "最受歡迎遊戲",
    checked: false,
  },
  {
    id: 2,
    icon: IconType.Rocket,
    title: "最新上架遊戲",
    checked: false,
  },
  {
    id: 3,
    icon: IconType.TheaterMasks,
    title: "陣營心機",
    checked: false,
  },
  {
    id: 4,
    icon: IconType.Users,
    title: "派對多人遊玩",
    checked: false,
  },
  {
    id: 5,
    icon: IconType.ChessKnight,
    title: "經典棋盤",
    checked: false,
  },
];

const testData: Game[] = [
  {
    id: "123-555",
    name: "象棋",
    minPlayers: 2,
    maxPlayers: 2,
    brief: "對弈",
    description: "PKPK",
    imgUrl: "/img/chinese-chess",
    estimateTime: 30,
    modes: [],
    gamePack: GamePack.ChineseChess,
    createAt: "",
    updateAt: "",
  },
  {
    id: "888-555",
    name: "西洋棋",
    minPlayers: 2,
    maxPlayers: 2,
    brief: "對弈",
    description: "PKPK",
    imgUrl: "/img/chess",
    estimateTime: 30,
    modes: [],
    gamePack: GamePack.ChineseChess,
    createAt: "",
    updateAt: "",
  },
  {
    id: "dfgfd-555",
    name: "西洋棋",
    minPlayers: 2,
    maxPlayers: 2,
    brief: "對弈",
    description: "PKPK",
    imgUrl: "/img/chess",
    modes: [],
    gamePack: GamePack.ChineseChess,
    estimateTime: 30,
    createAt: "",
    updateAt: "",
  },
  {
    id: "888-dfg",
    name: "西洋棋",
    minPlayers: 2,
    maxPlayers: 2,
    brief: "對弈",
    description: "PKPK",
    imgUrl: "/img/chess",
    modes: [],
    gamePack: GamePack.ChineseChess,
    estimateTime: 30,
    createAt: "",
    updateAt: "",
  },
  {
    id: "888-sddd",
    name: "西洋棋",
    minPlayers: 2,
    maxPlayers: 2,
    brief: "對弈",
    description: "PKPK",
    imgUrl: "/img/chess",
    modes: [],
    gamePack: GamePack.ChineseChess,
    estimateTime: 30,
    createAt: "",
    updateAt: "",
  },
  {
    id: "ssdfg-555",
    name: "西洋棋",
    minPlayers: 2,
    maxPlayers: 2,
    brief: "對弈",
    description: "PKPK",
    imgUrl: "/img/chess",
    modes: [],
    gamePack: GamePack.ChineseChess,
    estimateTime: 30,
    createAt: "",
    updateAt: "",
  },
  {
    id: "www-555",
    name: "西洋棋",
    minPlayers: 2,
    maxPlayers: 2,
    brief: "對弈",
    description: "PKPK",
    imgUrl: "/img/chess",
    modes: [],
    gamePack: GamePack.ChineseChess,
    estimateTime: 30,
    createAt: "",
    updateAt: "",
  },
];

const Games = () => {
  const router = useRouter();

  return (
    <Layout>
      <div className="header">
        <h2 className="page-title">遊戲列表</h2>
        <div className={styles.filters}></div>
      </div>
      <div className={styles.row}>
        <div className={styles.categories}>
          <div className={styles.title}>主題分類</div>
          {categoryList.map((category) => (
            <div key={category.id} className={styles.categoryRow}>
              <Icon type={category.icon} label={category.title} />
            </div>
          ))}
        </div>
        <div className={styles.games}>
          {testData.map((game) => (
            <div
              key={game.id}
              className={styles.game}
              style={{ backgroundImage: `url(${game.imgUrl}/game.png)` }}
            >
              <div
                className={styles.gameInfo}
                onClick={() => router.push(`/games/${game.id}`)}
              >
                <div className={styles.gameName}>{game.name}</div>
                <div className={styles.gameBrief}>{game.brief}</div>
                <div className={styles.icons}>
                  {/* FIXME: */}
                  <Icon
                    type={IconType.User}
                    label="2-4"
                    style={{
                      marginBottom: "10px",
                    }}
                  />
                  <Icon
                    type={IconType.Clock}
                    label={String(game.estimateTime)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Games;
