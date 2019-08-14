import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Table } from 'reactstrap';

export const GET_USERS = gql`
  query {
        users
        {
            id
            name
            age
        }
    
  }
`;

export default () => (
  <Query query={GET_USERS} pollInterval={5000}>
    {({ loading, data,refetch }) => !loading && (
     
      <>
     
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          {     
            data.users && data.users.map((x,i)=>{
                return <tr key={i}>
                    <td>{x.name}</td>                    
                    <td>{x.age}</td>                    
                </tr>
            })
          }
        </tbody>
      </Table>
      <button onClick={() => refetch()}>Refetch!</button>
      <button>Change!</button>
      </>
    )}
  </Query>
);

