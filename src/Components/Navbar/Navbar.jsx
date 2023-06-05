import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <NavLink exact to="/" activeClassName="active">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/RentarAuto" activeClassName="active">
            Rentar Vehiculo
          </NavLink>
        </li>
        <li>
          <NavLink to="/DevolucionAuto" activeClassName="active">
            Devolver Vehiculo
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
