import { useContext } from "react"
import {AuthContext} from "../backend/context/Auth.jsx"
import { Link } from "react-router-dom"

function SideBar() {
    const {logout} = useContext(AuthContext)
  return (
    <div className="card shadow border-0">
        <div className="card-body p-4 sidebar">
            <h4>Menu</h4>
            <ul>
                <li><Link to="/admin/dashboard">Tableau de bord</Link></li>
                <li><Link to="/admin/services">Services</Link></li>
                <li><Link to="/admin/projects">Projets</Link></li>
                <li><Link to="/admin/members">Membres</Link></li>
                <li>
                    <button type="button" className="btn btn-primary mt-4" onClick = {logout}>Déconnexion</button>
                </li>
            </ul>
        </div>
    </div>
  )
}

export default SideBar