import React from 'react';
import { ChineseChessContract } from "./chineseChessContract";
import { ChineseChessPresenter } from './chineseChessPresenter';
import { Injection } from './injection/injection';
import { TChineseChess } from '../domain/models/ChineseChess';
import Hidden from './components/Mode/Hidden';
import { TRoomUser, TRoom } from 'src/features/main/domain/models/Room';
import '@styles/games/chineseChess.scss';

interface ChineseChessViewProps {
  roomID: string;
  chesses: TChineseChess[];
  mode: number;
  yourTurn: boolean;
  updateChineseChess: (rf: Partial<TRoom>) => void;
  updateNowTurn: (rf: Partial<TRoom>) => void;
  updateUserList: (rf: Partial<TRoom>) => void;
}
interface ChineseChessViewState {
  selectedChess?: TChineseChess;
}

class ChineseChessView extends React.Component<ChineseChessViewProps, ChineseChessViewState>
  implements ChineseChessContract.View {
  private presenter: ChineseChessContract.Presenter;
  constructor(props: ChineseChessViewProps) {
    super(props);

    this.state = {
      selectedChess: undefined,
    }

    this.presenter = new ChineseChessPresenter(
      this,
      Injection.provideUseCaseHandler(),
      Injection.provideGetSocketMessageUseCase(),
      Injection.provideMoveChessUseCase(),
      Injection.provideEatChessUseCase(),
      Injection.provideFlipChessUseCase(),
    )

  }

  componentDidMount() {
    const {
      roomID,
      chesses,
    } = this.props;
    this.presenter.mount(roomID, chesses);
  }

  // 當 props 改變，更新 chesses
  componentDidUpdate() {
    this.presenter.updateChesses(this.props.chesses);
  }

  componentWillUnmount() {
    // TODO: disconnect socket
  }

  render() {
    return (
      <div className="chinese-chess-container">
        {this.renderMode()}
      </div>
    );
  }

  nowLoading(): void {
  }
  finishLoading(): void {
  }

  // 透過事件向上傳遞更新 roomInfo's gameData
  setChesses(gameData: TChineseChess[]): void {
    this.props.updateChineseChess({ gameData });
  }

  setSelectedChess(selectedChess: TChineseChess): void {
    this.setState({ selectedChess });
  }

  setNowTurn(nowTurn: string): void {
    this.props.updateNowTurn({ nowTurn });
  }

  setUserList(userList: TRoomUser[]): void {
    this.props.updateUserList({ userList });
  }

  private renderMode() {
    const {
      mode,
      chesses,
    } = this.props;
    switch (mode) {
      case 1:
        return <div>Standard</div>
      case 2:
        return (
          <Hidden
            chesses={chesses}
            onSelect={(id) => this.onSelect(id)}
            onMove={(id, tX, tY) => this.onMove(id, tX, tY)}
            onFlip={(id) => this.onFlip(id)}
            onEat={(id, tId) => this.onEat(id, tId)}
            yourTurn={this.props.yourTurn}
          />
        )
      default:
        return (
          <div>Game not found. Please report bug...</div>
        )
    }
  }

  private onSelect(id: number) {
    this.presenter.onSelect(id);
  }

  private onMove(id: number, targetX: number, targetY: number) {
    this.presenter.onMove(id, targetX, targetY);
  }

  private onFlip(id: number) {
    this.presenter.onFlip(id);
  }

  private onEat(id: number, targetId: number) {
    this.presenter.onEat(id, targetId);
  }
}

export default ChineseChessView;
