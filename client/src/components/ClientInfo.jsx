import { FaUserAlt, FaEnvelope, FaPhone } from "react-icons/fa"

export default function ClientInfo({client}) {
  return (
    <div>
      <h5 className="mt-3">Client Information</h5>
      <ul className="list-group">
        <li className="list-group-item">
          <FaUserAlt className="icon"/>
          {client.name}
        </li>
        <li className="list-group-item">
          <FaEnvelope className="icon"/>
          {client.email}
          </li>
        <li className="list-group-item">
          <FaPhone className="icon"/>
          {client.phone}
        </li>
      </ul>
    </div>
  )
}
