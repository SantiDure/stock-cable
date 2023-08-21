import { Link } from "react-router-dom";
import "./NavBar.css";
function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg nav__container">
      <div className="container-fluid ">
        <Link className="navbar-brand nav__nombre">OCANET - STOCK</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse nav__link" id="navbarNav">
          <ul className="navbar-nav nav__opciones">
            <li className="nav-item">
              <Link to="/" className="nav-link active" aria-current="page">
                Inicio
              </Link>
            </li>
            <li className="nav-item dropdown">
              <span
                className="nav-link dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Categorias
              </span>
              <ul className="dropdown-menu">
                <li>
                  <Link to={"categoria/conectores"} className="dropdown-item">
                    Conectores
                  </Link>
                </li>
                <li>
                  <Link to={"categoria/divisores"} className="dropdown-item">
                    Divisores
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <Link to={"nuevo-item"}>
                <button className="btn btn-success">Agregar item</button>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
