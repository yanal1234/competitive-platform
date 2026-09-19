import { NavLink } from "react-router-dom";
import logoSvg from "../../assets/logo.svg";
import { useState } from "react";
import { Outlet } from "react-router-dom";

function Header() {
  const [user, setuser] = useState(null)

  return (
    <div>
      <header>
        <div>
          <img className="footer-logo" src={logoSvg} alt="CodeForge AI" />
          <NavLink
            to="/problems"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Problems
          </NavLink>
          <NavLink
            to="/problems"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Problems
          </NavLink>
          <NavLink
            to="/problems"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Problems
          </NavLink>
          <NavLink
            to="/problems"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Problems
          </NavLink>
          <NavLink
            to="/problems"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Problems
          </NavLink>
        </div>
        <div>
          {user && <h1>yes</h1>}
          {!user && <h1>not</h1>}
        </div>
      </header>
      <Outlet />
    </div>
  );
}

export default Header;
