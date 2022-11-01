import React, { FC, useCallback, useContext } from 'react';
import { compose } from 'compose-react';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { CircularProgress } from '@mui/material';
import { v4 as uuid } from 'uuid';
// components
import Room from './Room';
// queries
import { GET_ROOM_BY_ID } from './Room.queries';
// types
import { TRoom } from './Room.types';
import { ApolloFetchPolicy } from '../../types/Apollo';
import { ROOM_TYPES_ENUM } from '../../types/Room';
// styles
import { LoadingBlock } from './Room.styles';
// mutations
import {
  ADD_ROOM_MEMBER,
  REMOVE_ROOM_MEMBER,
  UPDATE_ROOM_CURR_TIME,
  UPDATE_ROOM_PAUSE,
  UPDATE_ROOM_TYPE,
  UPDATE_ROOM_VIDEO_URL,
} from './Room.mutations';
import { SIGN_UP } from '../Main/components/Forms/Forms.mutations';
// hooks
import useGetUser from '../../hooks/useGetUser';
// constants
import { constants } from '../../config/constants';
// store
import { actionCases } from '../../store/actionCases';
import { Context } from '../../store/Store';

const withGetRoom = (Component: FC<TRoom>) => {
  return (props: TRoom): JSX.Element => {
    const params = useParams();
    const { data, loading } = useQuery(GET_ROOM_BY_ID, {
      variables: { roomId: params.roomId },
      // this pollInterval for handle real time room fields
      pollInterval: 100,
      fetchPolicy: ApolloFetchPolicy.CacheAndNetwork,
    });

    return !loading ? (
      <Component {...props} room={data?.getRoomById} />
    ) : (
      <LoadingBlock>
        <CircularProgress color="inherit" />
      </LoadingBlock>
    );
  };
};

const withGetUser = (Component: FC<TRoom>) => {
  return (props: TRoom): JSX.Element => {
    const { data: userData, loading: userLoading } = useGetUser();

    return !userLoading ? (
      <Component {...props} user={userData} />
    ) : (
      <LoadingBlock>
        <CircularProgress color="inherit" />
      </LoadingBlock>
    );
  };
};

const withUpdateRoomPause = (Component: FC<TRoom>) => {
  return (props: TRoom): JSX.Element => {
    const params = useParams();
    const [mutate] = useMutation(UPDATE_ROOM_PAUSE, {
      refetchQueries: [{ query: GET_ROOM_BY_ID, variables: { roomId: params.roomId } }],
    });

    const updateRoomPause = useCallback(
      async (isPause: boolean) => {
        await mutate({
          variables: {
            roomId: params.roomId,
            isPause,
          },
        });
      },
      [mutate, params.roomId]
    );

    return <Component {...props} updateRoomPause={updateRoomPause} />;
  };
};

const withUpdateRoomVideoUrl = (Component: FC<TRoom>) => {
  return (props: TRoom): JSX.Element => {
    const params = useParams();
    const [mutate] = useMutation(UPDATE_ROOM_VIDEO_URL, {
      refetchQueries: [{ query: GET_ROOM_BY_ID, variables: { roomId: params.roomId } }],
    });

    const updateRoomVideoUrl = useCallback(
      async (videoUrl: string) => {
        await mutate({
          variables: {
            roomId: params.roomId,
            videoUrl,
          },
        });
      },
      [mutate, params.roomId]
    );

    return <Component {...props} updateRoomVideoUrl={updateRoomVideoUrl} />;
  };
};

const withUpdateRoomType = (Component: FC<TRoom>) => {
  return (props: TRoom): JSX.Element => {
    const params = useParams();
    const [mutate] = useMutation(UPDATE_ROOM_TYPE, {
      refetchQueries: [{ query: GET_ROOM_BY_ID, variables: { roomId: params.roomId } }],
    });

    const updateRoomType = useCallback(
      async (type: ROOM_TYPES_ENUM) => {
        await mutate({
          variables: {
            roomId: params.roomId,
            type,
          },
        });
      },
      [mutate, params.roomId]
    );

    return <Component {...props} updateRoomType={updateRoomType} />;
  };
};

const withUpdateRoomCurrTime = (Component: FC<TRoom>) => {
  return (props: TRoom): JSX.Element => {
    const params = useParams();
    const [mutate] = useMutation(UPDATE_ROOM_CURR_TIME, {
      refetchQueries: [{ query: GET_ROOM_BY_ID, variables: { roomId: params.roomId } }],
    });

    const updateRoomCurrTime = useCallback(
      async (currTime: number) => {
        await mutate({
          variables: {
            roomId: params.roomId,
            currTime,
          },
        });
      },
      [mutate, params.roomId]
    );

    return <Component {...props} updateRoomCurrTime={updateRoomCurrTime} />;
  };
};

const withAddRoomMember = (Component: FC<TRoom>) => {
  return (props: TRoom): JSX.Element => {
    const params = useParams();
    const [mutate] = useMutation(ADD_ROOM_MEMBER, {
      refetchQueries: [{ query: GET_ROOM_BY_ID, variables: { roomId: params.roomId } }],
    });

    const addRoomMember = useCallback(
      async (userId: string) => {
        await mutate({
          variables: {
            roomId: params.roomId,
            userId,
          },
        });
      },
      [mutate, params.roomId]
    );

    return <Component {...props} addRoomMember={addRoomMember} />;
  };
};

const withRemoveRoomMember = (Component: FC<TRoom>) => {
  return (props: TRoom): JSX.Element => {
    const params = useParams();
    const [mutate] = useMutation(REMOVE_ROOM_MEMBER, {
      refetchQueries: [{ query: GET_ROOM_BY_ID, variables: { roomId: params.roomId } }],
    });

    const removeRoomMember = useCallback(
      async (userId: string) => {
        await mutate({
          variables: {
            roomId: params.roomId,
            userId,
          },
        });
      },
      [mutate, params.roomId]
    );

    return <Component {...props} removeRoomMember={removeRoomMember} />;
  };
};

// for users who open room and wasn't sign in
const withTemporaryUser = (Component: FC<TRoom>) => {
  return (props: TRoom): JSX.Element => {
    const { dispatch, state } = useContext(Context);

    const onComplete = useCallback(
      (token: string) => {
        dispatch({ type: actionCases.IS_USER_LOGGED_IN, payload: true });
        localStorage.setItem(constants.localStorageKeys.authToken, token);
      },
      [dispatch]
    );

    const [mutate] = useMutation(SIGN_UP, {
      onCompleted: e => onComplete(e.SignUp.token),
    });

    if (!state.isUserLoggedIn) {
      (async () => {
        await mutate({
          variables: {
            input: {
              email: `temporary${uuid()}@member.io`,
              username: `temporaryUser-${uuid()}`.substring(0, 19).trim(),
              password: uuid(),
            },
          },
        });
      })();
    }

    return <Component {...props} />;
  };
};

export const RoomContainer = compose(
  withGetRoom,
  withGetUser,
  withUpdateRoomPause,
  withUpdateRoomVideoUrl,
  withUpdateRoomType,
  withUpdateRoomCurrTime,
  withAddRoomMember,
  withRemoveRoomMember,
  withTemporaryUser
)(Room);
