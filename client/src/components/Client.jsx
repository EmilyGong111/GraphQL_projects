import { gql, useQuery } from "@apollo/client";

const GET_CLIENTS = gql`
  query getClients {
    clients {
      id
      name
      email
      phone
    }
  }
`;

export default function Client() {
  const {loading, error, data} = useQuery(GET_CLIENTS);

  if(loading) return <p>Loading...</p>
  if(error) return <p>Something Wrong!</p>
  return (
    <>
    {!loading && !error && <div>Client</div>}
    </>
    
  )
}
