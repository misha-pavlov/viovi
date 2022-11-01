export type TVioviYouTube = {
  videoUrl: string;
  isPause: boolean;
  currTime: number;
  updateRoomPause: (isPause: boolean) => Promise<void>;
  updateRoomCurrTime: (currTime: number) => Promise<void>;
};
