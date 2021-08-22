import produce from 'immer';
import { ActionType } from '../action-types';
import { Action } from '../actions';

interface BundlesState {
  [key: string]:
    | {
        loading: boolean;
        code: string;
        err: string;
      }
    | undefined;
}

const initialState: BundlesState = {};

const reducer = produce(
  (state: BundlesState = initialState, action: Action) => {
    switch (action.type) {
      case ActionType.BUNDLE_START:
        state[action.payload.cellId] = {
          loading: true,
          code: '',
          err: '',
        };
        return;
      case ActionType.BUNDLE_COMPLETE:
        const { code, err } = action.payload.bundle;

        state[action.payload.cellId] = {
          loading: false,
          code,
          err,
        };
        return;
      default:
        return;
    }
  },
  initialState
);

export default reducer;
