import { useState } from "react";
import { ADD_CLIENT } from "../mutations/clientMutations";
import { useMutation } from "@apollo/client";
import { FaUser} from "react-icons/fa";
import { GET_CLIENTS } from "../queries/clientQuery";



export default function AddClientModal() {
  const [ name, setName] = useState("");
  const [ email, setEmail] = useState("");
  const [ phone, setPhone] = useState("");
  const [ addClient ] = useMutation( ADD_CLIENT, {
    variables: {
      name,
      email,
      phone
    },
    // refetchQueries: [{query: GET_CLIENTS}]
    update(cache, { data: { addClient } }) {
      const { clients } = cache.readQuery( { query: GET_CLIENTS});
      cache.writeQuery({
        query: GET_CLIENTS,
        data: {
          clients: [...clients, addClient],
        }
      })
    }
  })
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name, email, phone);
    if (!name || !email || !phone) {
      return alert("Please fill in all fields!")
    }
    addClient();
  }

  return (
    <>
      <button type="button" className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#addClientModal">
        <div className="d-flex align-items-center">
          <FaUser className="icon" />
          <div>Add Client</div>
        </div>
      </button>

      <div className="modal fade" id="addClientModal" aria-labelledby="addClientModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addClientModalLabel">Add Client</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label" htmlFor="name">Name</label>
                  <input 
                  className="form-control" 
                  type="text" 
                  id="name" 
                  value={name}
                  onChange={e => setName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="email">Email</label>
                  <input 
                  className="form-control" 
                  type="text" 
                  id="email" 
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="phone">Phone</label>
                  <input 
                  className="form-control" 
                  type="text" 
                  id="phone" 
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  />
                </div>
                <button 
                type="submit" 
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
