import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation saveBook($user: User!, $input: SaveBookInput!) {
    saveBook(input: $input) {
        user {
            _id
            username
        }
        savedBooks {
            bookId
          authors
          description
          title
          image
          link
      }
    }
  }
`;

export const REMOVE_BOOK = gql`
mutation removeBook($user: User!, $bookId: ID!) {
    removeBook(user: $user, bookId: $bookId ) {
        user {
            _id
            username
        }
        bookId
    }
}

`