import { NavLink } from "react-router-dom";

export const Nav = () => {
  return (
    <>
      <nav className="navbar__container-lists">
        <ul className="container-lists__menu-list">
          <li className="menu-list__item">
            <NavLink to="/login" className="menu-list__link">
              <span className="menu-list__title">Login</span>
            </NavLink>
          </li>

          <li className="menu-list__item">
            <NavLink to="/register" className="menu-list__link">
              <span className="menu-list__title">Register</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
};
