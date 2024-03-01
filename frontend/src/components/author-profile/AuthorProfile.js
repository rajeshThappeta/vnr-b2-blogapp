import "./AuthorProfile.css";
import { NavLink } from "react-router-dom";

function AuthorProfile() {
  return (
    <div>
      <ul className="nav  justify-content-around fs-1">
        <li className="nav-item">
          <NavLink
            className="nav-link"
            to=""
            style={{ color: "var(--dark-green)" }}
          >
            Articles
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            className="nav-link"
            to=""
            style={{ color: "var(--dark-green)" }}
          >
            Add new
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default AuthorProfile;
