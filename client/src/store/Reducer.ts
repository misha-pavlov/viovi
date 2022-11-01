import { actionCases } from './actionCases';
import { TStore } from './store.types';

const Reducer = (state: TStore['state'], action: TStore['action']): TStore['state'] => {
  switch (action.type) {
    case actionCases.IS_USER_LOGGED_IN:
      return {
        ...state,
        isUserLoggedIn: action.payload,
      };

    default:
      return {
        ...state,
        isUserLoggedIn: false,
      };
  }
};

export default Reducer;
