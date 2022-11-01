import React, { FC, useMemo } from 'react';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { IconButton } from '@mui/material';
import { PlayerContainer } from './Player.styles';
import { TPlayer } from '../../Room.types';
import VioviYouTube from './components/VioviYouTube/VioviYouTube';
import { ROOM_TYPES_ENUM } from '../../../../types/Room';

const Player: FC<TPlayer> = ({
  videoUrl,
  selectorValue,
  isPause,
  currTime,
  updateRoomPause,
  updateRoomCurrTime,
}) => {
  const renderContent = useMemo(() => {
    if (selectorValue === ROOM_TYPES_ENUM.YOU_TUBE) {
      return (
        <VioviYouTube
          videoUrl={videoUrl}
          isPause={isPause}
          currTime={currTime}
          updateRoomPause={updateRoomPause}
          updateRoomCurrTime={updateRoomCurrTime}
        />
      );
    }

    return (
      <IconButton>
        <PlayCircleOutlineIcon fontSize="large" />
      </IconButton>
    );
  }, [selectorValue, videoUrl, isPause, currTime, updateRoomPause, updateRoomCurrTime]);

  return <PlayerContainer>{renderContent}</PlayerContainer>;
};

export default Player;
