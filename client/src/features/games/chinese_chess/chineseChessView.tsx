import React from 'react';
import { ChineseChessContract } from "./chineseChessContract";
import { ChineseChessPresenter } from './chineseChessPresenter';
import { Injection } from './injection/injection';
import { TChineseChess } from '../domain/models/ChineseChess';

interface ChineseChessViewProps {
  chesses: TChineseChess[];
  updateChinessChess: (c: TChineseChess[]) => void;
}
interface ChineseChessViewState {}

class ChineseChessView extends React.Component<ChineseChessViewProps, ChineseChessViewState>
  implements ChineseChessContract.View {
  private presenter: ChineseChessContract.Presenter;
  constructor(props: ChineseChessViewProps) {
    super(props);

    this.presenter = new ChineseChessPresenter(
      this,
      Injection.provideUseCaseHandler(),
      Injection.provideGetSocketMessageUseCase(),
      Injection.provideMoveChessUseCase(),
      Injection.provideEatChessUseCase(),
      Injection.provideFlipChessUseCase(),
    )
  }

  nowLoading(): void {
  }
  finishLoading(): void {
  }

  setChesses(chesses: TChineseChess[]): void {
    // 透過事件向上傳遞更新 roomInfo's gameData
    this.props.updateChinessChess(chesses);
  }
}

export default ChineseChessView;
