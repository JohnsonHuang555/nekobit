
export enum ActionType {
  FAILURE = 'FAILURE',
}

export function failure(error: Error) {
  return {
    type: ActionType.FAILURE,
    error,
  }
}
