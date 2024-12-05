import { NavLink } from "react-router-dom";

export const Nav = () => {
  return (
    <>
      <nav className="navbar__container-lists">
        <ul className="container-lists__menu-list">
          <li className="menu-list__item">
            <NavLink to="/booking" className="menu-list__link">
              <span className="menu-list__title">Home</span>
            </NavLink>
          </li>

          <li className="menu-list__item">
            <NavLink to="/booking/pending" className="menu-list__link">
              <span className="menu-list__title">Pending</span>
            </NavLink>
          </li>

          <li className="menu-list__item">
            <NavLink to="/booking/history" className="menu-list__link">
              <span className="menu-list__title">History</span>
            </NavLink>
          </li>

          <li className="menu-list__item">
            <NavLink to="/booking/config" className="menu-list__link">
              <span className="menu-list__title">Configuration</span>
            </NavLink>
          </li>

          <li className="menu-list__item">
            <NavLink to="/booking/logout" className="menu-list__link">
              <span className="menu-list__title">Logout</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
};
