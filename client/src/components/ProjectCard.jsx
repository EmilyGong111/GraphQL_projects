

export default function ProjectCard({project}) {
  return (
    <div className="col-md-4">
      <div className="card text-center mb-3">
        <div className="card-header">
          status: <strong>{project.status}</strong>
        </div>
        <div className="card-body">
          <h5 className="card-title">{project.name}</h5>
          <p className="card-text">{project.description}</p>
          <a href={`/projects/${project.id}`} className="btn btn-light">View Details</a>
        </div>
      </div>
    </div>
  )
}
