import { gql } from '@apollo/client';

export const CREATE_ROOM = gql`
  mutation createRoom {
    createRoom {
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
