import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <div>
      <nav className="navbar">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">Rentar Vehiculo</Link>
          </li>
          <li>
            <Link to="/contact">Devolver Vehiculo</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
