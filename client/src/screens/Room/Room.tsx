import React, { FC, useEffect, useMemo } from 'react';
import RoomHeader from './components/RoomHeader/RoomHeader';
import Actions from './components/Actions/Actions';
import Player from './components/Player/Player';
import { ActionsBlock, ChatBlock, PlayerBlock, RoomContainer } from './Room.styles';
import { TRoom } from './Room.types';
import { ChatContainer } from './components/Chat/ChatContainer';
import './Room.css';

const Room: FC<TRoom> = ({
  room: { isPause, members, type, videoUrl, currTime },
  user,
  updateRoomPause,
  updateRoomVideoUrl,
  updateRoomType,
  updateRoomCurrTime,
  addRoomMember,
  removeRoomMember,
}) => {
  useEffect(() => {
    if (user) {
      (async () => addRoomMember(user._id))();
    }
  }, [addRoomMember, user]);

  useEffect(() => {
    return () => {
      if (user) {
        (async () => removeRoomMember(user._id))();
      }
    };
  }, [removeRoomMember, user]);

  // for handle closing tab and browser
  useEffect(() => {
    const handleTabClose = (event: BeforeUnloadEvent) => {
      event.preventDefault();

      if (user) {
        (async () => removeRoomMember(user._id))();
      }
    };

    window.addEventListener('beforeunload', handleTabClose);

    return () => {
      window.removeEventListener('beforeunload', handleTabClose);
    };
  }, [removeRoomMember, user]);

  const renderPlayer = useMemo(() => {
    return (
      <Player
        videoUrl={videoUrl}
        selectorValue={type}
        isPause={isPause}
        currTime={currTime}
        updateRoomPause={updateRoomPause}
        updateRoomCurrTime={updateRoomCurrTime}
      />
    );
  }, [videoUrl, type, isPause, currTime, updateRoomPause, updateRoomCurrTime]);

  const renderHeader = useMemo(() => {
    return (
      <RoomHeader
        videoUrl={videoUrl}
        selectorValue={type}
        updateRoomVideoUrl={updateRoomVideoUrl}
        updateRoomType={updateRoomType}
      />
    );
  }, [videoUrl, type, updateRoomVideoUrl, updateRoomType]);

  return (
    <>
      {renderHeader}
      <RoomContainer>
        <ActionsBlock>
          <Actions members={members} />
        </ActionsBlock>

        <PlayerBlock>{renderPlayer}</PlayerBlock>

        <ChatBlock>
          <ChatContainer />
        </ChatBlock>
      </RoomContainer>
    </>
  );
};

export default Room;
