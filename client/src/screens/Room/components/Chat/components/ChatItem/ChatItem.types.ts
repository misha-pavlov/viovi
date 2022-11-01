import { GUser } from '../../../../../../types/User';

export type TChatItem = {
  text: string;
  isMyMessage: boolean;
  from: GUser;
};
