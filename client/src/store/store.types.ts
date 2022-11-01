import { Dispatch } from 'react';

export type TStore = {
  state: {
    isUserLoggedIn: boolean;
  };

  action: {
    type: string;
    payload: boolean;
  };
};

export type TContext = {
  state: TStore['state'];
  dispatch: Dispatch<{ type: string; payload: boolean }>;
};
