export enum ROOM_ACCESS_ENUM {
  PRIVATE = 'PRIVATE',
  PUBLIC = 'PUBLIC',
}

export enum ROOM_TYPES_ENUM {
  SHARING_SCREEN = 'SHARING_SCREEN',
  YOU_TUBE = 'YOU_TUBE',
}

export type GRoom = {
  _id: string;
  access: ROOM_ACCESS_ENUM;
  createdAt: Date;
  currTime: number;
  deleted: boolean;
  isPause: boolean;
  members: [string];
  type: ROOM_TYPES_ENUM;
  videoUrl: string;
};
