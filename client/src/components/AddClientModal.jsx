import { useState } from "react";
import { useMutation } from "@apollo/client";
import { FaUser} from "react-icons/fa";

export default function AddClientModal() {
  const [ name, setName] = useState("");
  const [ email, setEmail] = useState("");
  const [ phone, setPhone] = useState("");
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name, email, phone);
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
