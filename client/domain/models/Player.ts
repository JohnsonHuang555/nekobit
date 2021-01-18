// 玩家資訊
export type Player = {
  id: string;
  name: string;
  isMaster: boolean;
  isReady: boolean;
  playOrder: number;
  group: number;
  characterId?: number;
};
