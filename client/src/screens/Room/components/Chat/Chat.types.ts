import { GUser } from '../../../../types/User';
import { GMessages } from '../../../../types/Messages';

export type TChat = {
  messages: Array<GMessages>;
  hasMore: boolean;
  onLoadMore: () => Promise<void>;
  insertMessage: (roomId: string, message: string, from: GUser) => void;
};
