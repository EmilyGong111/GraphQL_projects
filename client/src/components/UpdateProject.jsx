import { useState } from "react";
import { UPDATE_PROJECT } from "../mutations/projectMutations";
import { GET_PROJECT } from "../queries/projectQuery";
import { useMutation } from "@apollo/client";
import { FaEdit } from "react-icons/fa";

export default function UpdateProject({project}) {
  const [name, setName] = useState(project.name);
  const [description, setDescription] = useState(project.description);
  const [status, setStatus] = useState(() => {
    switch (project.status) {
      case "Not Started":
        return "new";
      case "In Progress":
        return "progress";
      case "Completed":
        return "completed";
      default:
        throw new Error(`Unknown status: ${project.status}`);
    }
  });
  const [updateProject] = useMutation( UPDATE_PROJECT, {
    variables: {
      id: project.id,
      name,
      description,
      status
    },
    refetchQueries: [{ query: GET_PROJECT, variables: {id: project.id}}],
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !description || !status) {
      return alert("Please fill out all fields");
    }
    updateProject(name, description, status);
  }

  return (
    <div className="mt-5">
      <div className="d-flex gap-2 align-items-start">
        <h5>Update Project</h5>
        <div type="button" data-bs-toggle="collapse" data-bs-target="#collapseUpdateForm" aria-expanded="false" aria-controls="collapseExample">
          <FaEdit className="icon text-primary"/>
        </div>
      </div>
      <div className="collapse p-3" id="collapseUpdateForm">
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
          <button 
            type="submit" 
            className="btn btn-secondary"
            >
              Submit
          </button>
        </form>
      </div>
    </div>
  )
}
