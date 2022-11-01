import { compose } from 'compose-react';
import { useMutation, useQuery, useSubscription } from '@apollo/client';
import React, { FC, useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import Chat from './Chat';
import { TChat } from './Chat.types';
import { GUser } from '../../../../types/User';
import { INSERT_MESSAGE } from './Chat.mutations';
import { GET_MESSAGES_BY_ROOM_ID } from './Chat.queries';
import { MESSAGE_ADDED } from './Chat.subscriptions';
import { GMessages } from '../../../../types/Messages';
import { ApolloFetchPolicy } from '../../../../types/Apollo';

const withGetMessagesByRoomId = (Component: FC<TChat>) => {
  return (props: TChat): JSX.Element => {
    const { roomId } = useParams();
    const [limit, setLimit] = useState(15);
    const [isFetchingMore, setIsFetchingMore] = useState(false);
    const { data, fetchMore, previousData } = useQuery(GET_MESSAGES_BY_ROOM_ID, {
      variables: { roomId, limit },
      pollInterval: 3000,
      fetchPolicy: ApolloFetchPolicy.CacheAndNetwork,
      nextFetchPolicy: ApolloFetchPolicy.CacheFirst,
    });

    const messages = data?.getMessagesByRoomId.messages
      .map((messages: GMessages) => messages)
      .reverse();
    const previousMessages = previousData?.getMessagesByRoomId.messages
      .map((messages: GMessages) => messages)
      .reverse();
    const hasMore = data?.getMessagesByRoomId.hasMore;

    const onLoadMore = useCallback(async () => {
      setIsFetchingMore(true);
      setLimit(limit + 15);
      await fetchMore({
        variables: {
          variables: { roomId, limit },
        },
      }).then(() => setIsFetchingMore(false));
    }, [fetchMore, limit, roomId]);

    return (
      <Component
        {...props}
        hasMore={hasMore}
        onLoadMore={onLoadMore}
        messages={(isFetchingMore ? previousMessages : messages) || []}
      />
    );
  };
};

const withMessageAdded = (Component: FC<TChat>) => {
  return (props: TChat): JSX.Element => {
    useSubscription(MESSAGE_ADDED);
    return <Component {...props} />;
  };
};

const withInsertMessage = (Component: FC<TChat>) => {
  return (props: TChat): JSX.Element => {
    const { roomId } = useParams();
    const [mutate] = useMutation(INSERT_MESSAGE, {
      refetchQueries: [{ query: GET_MESSAGES_BY_ROOM_ID, variables: { roomId } }],
      onError: error => console.log('Insert message error: ', error),
    });

    const insertMessage = useCallback(
      async (roomId: string, message: string, from: GUser) => {
        await mutate({
          variables: {
            roomId,
            message,
            from,
          },
        });
      },
      [mutate]
    );

    return <Component {...props} insertMessage={insertMessage} />;
  };
};

export const ChatContainer = compose(
  withGetMessagesByRoomId,
  withMessageAdded,
  withInsertMessage
)(Chat);
