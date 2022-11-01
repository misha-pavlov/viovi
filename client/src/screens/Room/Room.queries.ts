import { gql } from '@apollo/client';

export const GET_ROOM_BY_ID = gql`
  query getRoomById($roomId: ObjectId!) {
    getRoomById(roomId: $roomId) {
      _id
      type
      access
      videoUrl
      currTime
      isPause
      members
    }
  }
`;

export const GET_USERS_BY_IDS = gql`
  query userByIds($ids: [ObjectId!]!) {
    usersByIds(ids: $ids) {
      _id
      email
      username
    }
  }
`;
