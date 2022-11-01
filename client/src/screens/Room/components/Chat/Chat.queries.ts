import { gql } from '@apollo/client';

export const GET_MESSAGES_BY_ROOM_ID = gql`
  query getMessagesByRoomId($roomId: ObjectId!, $limit: Float! = 15) {
    getMessagesByRoomId(roomId: $roomId, limit: $limit) {
      messages {
        _id
        from {
          _id
          email
          image
          username
          password
        }
        roomId
        message
        createdDate
      }
      hasMore
    }
  }
`;
