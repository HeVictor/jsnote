import { Dispatch } from 'redux';
import { Action } from '../actions';
import { ActionType } from '../action-types';
import { saveCells } from '../action-creators';
import { RootState } from '../reducers';

export const persistMiddleware = ({
  dispatch,
  getState,
}: {
  dispatch: Dispatch<Action>;
  getState: () => RootState;
}) => {
  let timer: any;

  return (next: (action: Action) => void) => {
    return (action: Action) => {
      next(action);

      switch (action.type) {
        case ActionType.MOVE_CELL:
        case ActionType.UPDATE_CELL:
        case ActionType.INSERT_CELL_AFTER:
        case ActionType.DELETE_CELL:
          if (timer) {
            clearTimeout(timer);
          }
          timer = setTimeout(() => {
            saveCells()(dispatch, getState);
          }, 250);
          break;
        default:
          break;
      }
    };
  };
};
