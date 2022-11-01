import React, { useReducer, createContext } from 'react';
import Reducer from './Reducer';
import { TContext } from './store.types';
import { constants } from '../config/constants';

const initialState = {
  isUserLoggedIn: !!localStorage.getItem(constants.localStorageKeys.authToken),
};

const Store = ({ children }: { children: JSX.Element }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);

  return <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>;
};

export const Context = createContext<TContext>({
  state: initialState,
  dispatch: () => null,
});

export default Store;
