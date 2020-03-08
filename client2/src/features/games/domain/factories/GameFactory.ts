import { TGame } from "src/features/games/domain/models/Game";
import { NetGame } from "src/features/games/domain/remote/NetGame";

export class GameFactory {
  static createArrayFromNet(netGames: NetGame[]): TGame[] {
    return netGames.map((netGame) => this.createFromNet(netGame));
  }

  static createFromNet(netGame: NetGame): TGame {
    return {
      id: netGame._id,
      imgURL: netGame.imgURL,
      name: netGame.name,
      brief: netGame.brief,
      description: netGame.description,
      createdDate: netGame.createdDate,
      rules: netGame.rules,
      maxPlayers: netGame.maxPlayers,
      estimateTime: netGame.estimateTime,
    }
  }
}
