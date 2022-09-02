import { GET_PROJECT } from "../queries/projectQuery";
import { Link,useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import Spinner from "../components/Spinner";
import ClientInfo from "../components/ClientInfo";
import DeleteProject from "../components/DeleteProject";
import UpdateProject from "../components/UpdateProject";

export default function Project() {
  const { id } = useParams();
  const { loading, error, data} = useQuery(GET_PROJECT, {
    variables: {id: id}
  })
  let project; 
  if (loading) return <Spinner />;
  if (error) return <p>Something Went Wrong!</p>
  if (data) project = data.project;
  
  return (
    <>
      {!loading && !error && (
      <div className="mx-auto w-75 card p-5">
        <Link to="/" className="btn btn-primary btn-sm w-25 d-inline ms-auto">Back</Link>
        <h1>{project.name}</h1>
        <p>{project.description}</p>
        <h5 className='mt-3'>Project Status</h5>
        <p className='lead'>{data.project.status}</p>
        <hr />
        <ClientInfo client={project.client} />
        <hr />
        <UpdateProject project={project} />
        <hr />
        <DeleteProject projectId={project.id}/>
      </div>
      )}
    </>
  )
}
