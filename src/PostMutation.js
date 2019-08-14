import React,{ useMutation } from 'react';
import gql from 'graphql-tag';


const ADD_USER = gql`
  mutation user($type: Number!) {
    addUser(type: $type,) {
      id
      name
      age
    }
  }
`;



function PostMutation() {
  let input;
  const [addUser, { data }] = useMutation(ADD_USER);

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          addUser({ variables: { type: input.value } });
          input.value = '';
        }}
      >
        <input
          ref={node => {
            input = node;
          }}
        />
        <button type="submit">Add Todo</button>
      </form>
    </div>
  );
}
export default PostMutation;