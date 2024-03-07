import React from "react";
import "./Header.css";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { resetState } from "../../redux/slices/userLoginSlice";


function Header() {
  let { isPending,currentUser,errorStatus,errorMessage,loginStatus} = useSelector(
    (state) => state.userLogin
  );
  let dispatch = useDispatch();

  function signout(){
    sessionStorage.removeItem('token')
    dispatch(resetState())
  }
  return (
    <nav
      className="navbar navbar-expand-sm fs-5"
      style={{ backgroundColor: "var(--light-olive)" }}
    >
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img src={logo} alt="" width="60px" />
        </a>
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
                    style={{ color: "white" }}
                  >
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="signup"
                    style={{ color: "white" }}
                  >
                    SignUp
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="signin"
                    style={{ color: "white" }}
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
                  onClick={signout}
                >
                   <span className="lead  fs-4 me-3 fw-1"  style={{ color: "#994570" ,fontWeight:'bold',fontSize:'1.3rem',textTransform:'capitalize',fontFamily:'fantasy'}}>{currentUser.username}
                   <sup style={{color:'var(--dark-green)',fontSize:'1rem'}}>({currentUser.userType})</sup>
                   </span>
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

