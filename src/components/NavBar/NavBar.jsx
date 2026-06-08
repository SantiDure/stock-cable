import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import "./NavBar.css";

function NavBar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="navbar navbar-expand-lg nav__container">
      <div className="container-fluid">
        <Link to="/" className="nav__brand navbar-brand">
          <div className="nav__brand-icon">O</div>
          <div className="nav__brand-text">
            <span className="nav__brand-title">OCANET</span>
            <span className="nav__brand-sub">Stock Manager</span>
          </div>
        </Link>

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

        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="nav__links navbar-nav align-items-center">
            <li className="nav__link-item nav-item">
              <Link
                to="/"
                className={`nav__link${location.pathname === "/" ? " active" : ""}`}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                  <polyline points="9 22 9 12 15 12 15 22"/>
                </svg>
                Inicio
              </Link>
            </li>

            <li className="nav__link-item nav-item" style={{ position: "relative" }}>
              <div
                className="nav__dropdown-toggle"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                onBlur={() => setTimeout(() => setDropdownOpen(false), 150)}
                tabIndex={0}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                  <line x1="8" y1="21" x2="16" y2="21"/>
                  <line x1="12" y1="17" x2="12" y2="21"/>
                </svg>
                Categorías
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ transform: dropdownOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}
                >
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </div>
              <div className={`nav__dropdown-menu${dropdownOpen ? " open" : ""}`}>
                <Link to="categoria/Conectores" className="nav__dropdown-item" onClick={() => setDropdownOpen(false)}>
                  Conectores
                </Link>
                <Link to="categoria/Fibra Optica" className="nav__dropdown-item" onClick={() => setDropdownOpen(false)}>
                  Fibra Óptica
                </Link>
                <Link to="categoria/Divisores RG6" className="nav__dropdown-item" onClick={() => setDropdownOpen(false)}>
                  Divisores RG6
                </Link>
                <Link to="categoria/Satelital" className="nav__dropdown-item" onClick={() => setDropdownOpen(false)}>
                  Satelital
                </Link>
              </div>
            </li>

            <li className="nav-item">
              <Link to="nuevo-item" className="btn-add">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19"/>
                  <line x1="5" y1="12" x2="19" y2="12"/>
                </svg>
                Agregar item
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
