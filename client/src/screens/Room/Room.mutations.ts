import { gql } from '@apollo/client';

export const UPDATE_ROOM_PAUSE = gql`
  mutation updateRoomPause($roomId: ObjectId!, $isPause: Boolean!) {
    updateRoomPause(roomId: $roomId, isPause: $isPause) {
      isPause
    }
  }
`;

export const UPDATE_ROOM_VIDEO_URL = gql`
  mutation updateRoomVideoUrl($roomId: ObjectId!, $videoUrl: String!) {
    updateRoomVideoUrl(roomId: $roomId, videoUrl: $videoUrl) {
      videoUrl
    }
  }
`;

export const UPDATE_ROOM_TYPE = gql`
  mutation updateRoomType($roomId: ObjectId!, $type: String!) {
    updateRoomType(roomId: $roomId, type: $type) {
      type
    }
  }
`;

export const UPDATE_ROOM_CURR_TIME = gql`
  mutation updateRoomCurrTime($roomId: ObjectId!, $currTime: Float!) {
    updateRoomCurrTime(roomId: $roomId, currTime: $currTime) {
      currTime
    }
  }
`;

export const ADD_ROOM_MEMBER = gql`
  mutation addRoomMember($roomId: ObjectId!, $userId: String!) {
    addRoomMember(roomId: $roomId, userId: $userId) {
      members
    }
  }
`;

export const REMOVE_ROOM_MEMBER = gql`
  mutation removeRoomMember($roomId: ObjectId!, $userId: String!) {
    removeRoomMember(roomId: $roomId, userId: $userId) {
      members
    }
  }
`;
