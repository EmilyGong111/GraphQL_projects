import { FaTrash } from "react-icons/fa";
import { DELETE_PROJECT } from "../mutations/projectMutations";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { GET_PROJECTS } from "../queries/projectQuery";

export default function DeleteProject({projectId}) {
  const navigate = useNavigate()
  const [deleteProject] = useMutation( DELETE_PROJECT, {
    variables: { id: projectId},
    onCompleted: () => navigate("/"),
    refetchQueries: [{ query: GET_PROJECTS}]
  })
  return (
    <div className="d-flex mt-5 ms-auto">
      <button className="btn btn-danger" onClick={deleteProject}>
        <FaTrash className="icon"/>
        Delete Project
      </button>
    </div>
  )
}
