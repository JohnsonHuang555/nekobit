import _ from 'lodash';
import { NetGame } from 'domain/remote/NetGame';
import { EnhanceGame, Game } from 'domain/models/Game';
import { OptionType } from 'domain/models/OptionType';

export class GameFactory {
  static createArrayFromNet(netGames: NetGame[]): Game[] {
    return netGames.map((netGame) => this.createFromNet(netGame));
  }

  static createFromNet(netGame: NetGame): Game {
    const modes = EnhanceGame[netGame.game_pack];
    const options: OptionType[] = netGame.modes.map((m) => ({
      label: modes[m],
      value: m,
    }));
    return {
      id: netGame.id,
      name: netGame.name,
      modes: options,
      gamePack: netGame.game_pack,
      minPlayers: netGame.min_players,
      maxPlayers: netGame.max_players,
      brief: netGame.brief,
      description: netGame.description,
      imgUrl: netGame.img_url,
      estimateTime: netGame.estimate_time,
      createAt: netGame.created_at,
      updateAt: netGame.updated_at,
    };
  }
}
