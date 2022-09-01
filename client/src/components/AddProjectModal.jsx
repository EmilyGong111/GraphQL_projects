import { useQuery } from "@apollo/client";
import { useState } from "react";
import { ADD_PROJECT } from "../mutations/projectMutations";
import { useMutation } from "@apollo/client";
import { FaList} from "react-icons/fa";
import { GET_CLIENTS } from "../queries/clientQuery";
import { GET_PROJECTS } from "../queries/projectQuery";



export default function AddProjectModal() {
  const [ name, setName] = useState("");
  const [ description, setDescription] = useState("");
  const [ clientId, setClientId] = useState("");
  const [ status, setStatus] = useState('new');
  const [ addProject ] = useMutation( ADD_PROJECT, {
    variables: {
      name,
      description,
      clientId,
      status
    },
    // refetchQueries: [{query: GET_CLIENTS}]
    update(cache, { data: { addProject } }) {
      const { projects } = cache.readQuery( { query: GET_PROJECTS });
      cache.writeQuery({
        query: GET_PROJECTS,
        data: {
          projects: [...projects, addProject],
        }
      })
    }
  })
  const { loading, error, data } = useQuery(GET_CLIENTS);

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(name, description, status);
    if (!name || !description || !clientId) {
      return alert("Please fill in all fields!")
    }
    addProject();
    setName("");
    setDescription("");
    setStatus("new");
    setClientId("")
  }

  if (loading) return null;
  if (error) return <p>Something Went Wrong!</p>;
  return (
    <>
      {!loading && !error && (
        <>
        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addProjectModal">
        <div className="d-flex align-items-center">
          <FaList className="icon" />
          <div>New Project</div>
        </div>
      </button>

      <div className="modal fade" id="addProjectModal" aria-labelledby="addProjectModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addProjectModalLabel">Add Client</h5>
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
                  <label className="form-label" htmlFor="description">Description</label>
                  <textarea 
                  className="form-control" 
                  type="text" 
                  id="description" 
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="status">Status</label>
                  <select 
                  className="form-control" 
                  id="status" 
                  value={status}
                  onChange={e => setStatus(e.target.value)}
                  >
                    <option value="new">Not Started</option>
                    <option value="progress">In Progress</option>
                    <option value="completed">Completed</option>
                    </select>
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="clientId">Client</label>
                  <select 
                  className="form-control" 
                  id="clientId" 
                  value={clientId}
                  onChange={e => setClientId(e.target.value)}
                  >
                    <option value="">Select Client</option>
                    {data.clients.map(client => <option key={client.id} value={client.id}>{client.name}</option>)}
                    </select>
                </div>
                <button 
                type="submit" 
                className="btn btn-primary"
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
      )}
    </>
  )
}
