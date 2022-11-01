import React, { FC, useCallback, useRef } from 'react';
import ReactPlayer from 'react-player';
import { TVioviYouTube } from './VioviYouTube.types';
import { PleaseEnterLink } from './VioviYouTube.styles';

const VioviYouTube: FC<TVioviYouTube> = ({
  videoUrl,
  isPause,
  currTime,
  updateRoomPause,
  updateRoomCurrTime,
}) => {
  const playerRef = useRef<ReactPlayer>(null);
  const onReady = useCallback(
    (player: ReactPlayer) => {
      if (currTime !== 0) {
        player.seekTo(currTime, 'seconds');
      }
    },
    [currTime]
  );

  if (!ReactPlayer.canPlay(videoUrl)) {
    return <PleaseEnterLink>Please enter link</PleaseEnterLink>;
  }

  return (
    <ReactPlayer
      ref={playerRef}
      url={videoUrl}
      width={'100%'}
      height={'100%'}
      playing={!isPause}
      onReady={onReady}
      onPause={() => updateRoomPause(true)}
      onPlay={() => updateRoomPause(false)}
      config={{
        youtube: {
          playerVars: { showinfo: 1, controls: 1 },
        },
      }}
      onProgress={({ playedSeconds }) => updateRoomCurrTime(playedSeconds)}
      // temporary doesn't work via react-player package
      onSeek={seconds => updateRoomCurrTime(seconds)}
    />
  );
};

export default VioviYouTube;
