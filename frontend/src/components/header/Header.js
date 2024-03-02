import React from "react";
import "./Header.css";
import { NavLink, Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import { useSelector, useDispatch } from "react-redux";
import { resetState } from "../../redux/slices/userLoginSlice";

function Header() {
  const { isPending, currentUser, errorStatus, errorMessage, loginStatus } =
    useSelector((state) => state.userLogin);
    let dispatch=useDispatch()


    function logout(){
      //remove token from browser stotage
      sessionStorage.removeItem('token')
      //reset state
      let action=resetState()
      dispatch(action)
    }

  return (
    <nav
      className="navbar navbar-expand-sm fs-5 shadow-sm"
      style={{ backgroundColor: "var(--dark-maroon)" }}
    >
      <div className="container-fluid">
        <Link className="navbar-brand">
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
            {loginStatus === false ? (
              <>
                {" "}
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
              </>
            ) : (
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="signin"
                  style={{ color: "var(--light-grey)" }}
                  onClick={logout}
                >
                  <span className="lead fs-3 text-warning me-4">{currentUser.username}</span>
                  Signout
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
