import { gql } from '@apollo/client';

export const INSERT_MESSAGE = gql`
  mutation insertMessage($roomId: ObjectId!, $message: String!, $from: UserPayloadInput!) {
    insertMessage(roomId: $roomId, message: $message, from: $from) {
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
  }
`;
