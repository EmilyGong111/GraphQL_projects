import { useMutation } from "@apollo/client";
import { FaTrash } from "react-icons/fa";
import { DELETE_CLIENT } from "../mutations/clientMutations";
import { GET_CLIENTS } from "../queries/clientQuery";

export default function ClientRow({client}) {
  const [deleteClient] = useMutation(DELETE_CLIENT, {
    variables: {id: client.id},
    // Show the newest data by query server to get the newest data.
    // refetchQueries: [{query: GET_CLIENTS}]
    // Show the newest info by update cache, in this way need to define a custom merge function, check out in App.js line 6-23.
    update(cache, { data: { deleteClient } }) {
      const { clients } = cache.readQuery({ query: GET_CLIENTS });
      cache.writeQuery({
        query: GET_CLIENTS,
        data: {
          clients: clients.filter(client => client.id !== deleteClient.id),
        }
      })
    }
  })
  return (
    <tr>
      <td>{client.name}</td>
      <td>{client.email}</td>
      <td>{client.phone}</td>
      <td>
        <button className="btn btn-danger btn-sm" onClick={deleteClient}>
          <FaTrash />
        </button>
      </td>
    </tr>
  )
}
