import { UseCaseHandler } from '../../../domain/usecases/base/UseCaseHandler';
import { RoomContract } from "./roomContract";

export class RoomPresenter implements RoomContract.Presenter {

  private readonly view: RoomContract.View;
  private readonly useCaseHandler: UseCaseHandler;

  constructor(
    view: RoomContract.View,
    useCaseHandler: UseCaseHandler,
  ) {
    this.view = view;
    this.useCaseHandler = useCaseHandler
  }

  mount(): void {

  }

  joinRoom(): void {
    throw new Error("Method not implemented.");
  }
  leaveRoom(): void {
    throw new Error("Method not implemented.");
  }
  readyGame(): void {
    throw new Error("Method not implemented.");
  }
  startGame(): void {
    throw new Error("Method not implemented.");
  }
}
