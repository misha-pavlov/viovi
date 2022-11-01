import React, { FC, memo, useCallback, useEffect, useMemo, useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import CommentIcon from '@mui/icons-material/Comment';
import CommentsDisabledIcon from '@mui/icons-material/CommentsDisabled';
import { CircularProgress, IconButton } from '@mui/material';
import { useParams } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import {
  ChatBlock,
  ChatIconBlock,
  InputBlock,
  LoadingWrapper,
  ScrollableBlock,
} from './Chat.styles';
import ChatItem from './components/ChatItem/ChatItem';
import { FlexBlock, LoadingBlock, VioviInput } from '../../Room.styles';
import { messages as messagesConstant } from '../../../../config/messages';
import { TChat } from './Chat.types';
import useGetUser from '../../../../hooks/useGetUser';

const Chat: FC<TChat> = ({ messages, insertMessage, onLoadMore, hasMore }) => {
  const { roomId } = useParams();
  const { data: currentUser } = useGetUser();
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState('');

  const showChat = useCallback(() => setShow(!show), [show]);

  const chatIcon = useMemo(() => {
    return !show ? (
      <IconButton>
        <CommentIcon fontSize="large" onClick={showChat} />
      </IconButton>
    ) : (
      <ChatIconBlock>
        <IconButton>
          <CommentsDisabledIcon fontSize="large" onClick={showChat} />
        </IconButton>
      </ChatIconBlock>
    );
  }, [show, showChat]);

  const onSendMessage = useCallback(() => {
    if (roomId) {
      insertMessage(roomId, message, {
        _id: currentUser._id,
        email: currentUser.email,
        image: currentUser.image,
        password: currentUser.password,
        username: currentUser.username,
      });
      setMessage('');
    }
  }, [currentUser, insertMessage, message, roomId]);

  const renderMessages = useMemo(() => {
    return messages.map(message => {
      return (
        <ChatItem
          key={message._id}
          text={message.message}
          from={message.from}
          isMyMessage={message.from._id === currentUser?._id}
        />
      );
    });
  }, [currentUser?._id, messages]);

  const renderScrollableMessages = useMemo(
    () => (
      <ScrollableBlock id="scrollableDiv">
        <InfiniteScroll
          hasMore={hasMore}
          next={onLoadMore}
          children={renderMessages}
          dataLength={messages.length}
          scrollableTarget="scrollableDiv"
          loader={
            <LoadingWrapper>
              <LoadingBlock isChat>
                <CircularProgress color="inherit" />
              </LoadingBlock>
            </LoadingWrapper>
          }
        />
      </ScrollableBlock>
    ),
    [hasMore, messages.length, onLoadMore, renderMessages]
  );

  // handle enter press
  useEffect(() => {
    const listener = (event: { code: string; preventDefault: () => void }) => {
      if (event.code === 'Enter' || event.code === 'NumpadEnter') {
        event.preventDefault();
        onSendMessage();
      }
    };
    document.addEventListener('keydown', listener);
    return () => {
      document.removeEventListener('keydown', listener);
    };
  }, [onSendMessage]);

  return useMemo(() => {
    if (!show) {
      return chatIcon;
    }

    return (
      <>
        {chatIcon}
        <ChatBlock>
          {renderScrollableMessages}

          <InputBlock>
            <FlexBlock withAlignItems>
              <VioviInput
                width={243}
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder={messagesConstant.inputPlaceholders.chat}
              />
              <IconButton onClick={onSendMessage}>
                <SendIcon fontSize="small" />
              </IconButton>
            </FlexBlock>
          </InputBlock>
        </ChatBlock>
      </>
    );
  }, [chatIcon, message, onSendMessage, renderScrollableMessages, show]);
};

export default memo(Chat);
