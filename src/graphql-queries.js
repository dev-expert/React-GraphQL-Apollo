
import gql from 'graphql-tag';

export const createUser = gql`
  mutation createUser($name: String!,$age: Number!) {
    createUser(name:$name,age:$age) {
      id
      name
      age
    }
  }`;
