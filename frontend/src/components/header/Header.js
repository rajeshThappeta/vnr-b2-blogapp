import React from "react";
import "./Header.css";
import { NavLink,Link} from "react-router-dom";
import logo from "../../assets/logo.png";

function Header() {
  return (
    <nav
      className="navbar navbar-expand-sm fs-5 shadow-sm"
      style={{ backgroundColor: "var(--dark-maroon)" }}
    >
      <div className="container-fluid">
        <Link className="navbar-brand" >
          <img src={logo} alt="" width="60px" className="rounded" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to=""
                style={{ color: "var(--light-grey)" }}
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="signup"
                style={{ color: "var(--light-grey)" }}
              >
                SignUp
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="signin"
                style={{ color: "var(--light-grey)" }}
              >
                SignIn
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
