import { GRoom, ROOM_TYPES_ENUM } from '../../types/Room';
import { GUser } from '../../types/User';

export type TRoomHeader = {
  videoUrl: string;
  selectorValue: string;
  updateRoomVideoUrl: (videoUrl: string) => void;
  updateRoomType: (type: ROOM_TYPES_ENUM) => Promise<void>;
};

export type TPlayer = {
  videoUrl: string;
  selectorValue: string;
  isPause: boolean;
  currTime: number;
  updateRoomPause: (isPause: boolean) => Promise<void>;
  updateRoomCurrTime: (currTime: number) => Promise<void>;
};

export type TRoom = {
  room: GRoom;
  user: GUser;
  updateRoomPause: (isPause: boolean) => Promise<void>;
  updateRoomVideoUrl: (videoUrl: string) => Promise<void>;
  updateRoomType: (type: ROOM_TYPES_ENUM) => Promise<void>;
  updateRoomCurrTime: (currTime: number) => Promise<void>;
  addRoomMember: (userId: string) => Promise<void>;
  removeRoomMember: (userId: string) => Promise<void>;
};

export type TActions = {
  members: GRoom['members'];
};

export type TUserItem = {
  userName: string;
};
