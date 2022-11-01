import React, { FC, useMemo } from 'react';
import { ChatItemBlock, ChatText } from './ChatItem.styles';
import { TChatItem } from './ChatItem.types';
import { FlexBlock } from '../../../../Room.styles';
import UserAvatar from '../../../../../../components/UserAvatar/UserAvatar';

const ChatItem: FC<TChatItem> = ({ text, isMyMessage, from }) => {
  const renderItem = useMemo(() => {
    if (isMyMessage) {
      return <ChatText>{text}</ChatText>;
    }

    return (
      <FlexBlock withAlignItems>
        <UserAvatar url={from.image} size={25} />
        <ChatText>{text}</ChatText>
      </FlexBlock>
    );
  }, [from.image, isMyMessage, text]);

  return <ChatItemBlock isMyMessage={isMyMessage}>{renderItem}</ChatItemBlock>;
};

export default ChatItem;
