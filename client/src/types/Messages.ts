import { GUser } from './User';

export type GMessages = {
  _id: string;
  from: GUser;
  message: string;
  roomId: string;
  createdDate: Date;
};
