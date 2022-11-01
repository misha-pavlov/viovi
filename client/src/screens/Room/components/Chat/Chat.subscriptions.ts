import { gql } from '@apollo/client';

export const MESSAGE_ADDED = gql`
  subscription messageAdded {
    messageAdded {
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
