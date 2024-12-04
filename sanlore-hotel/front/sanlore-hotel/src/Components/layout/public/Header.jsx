import { Nav } from "./Nav";

export const Header = () => {
  return (
    <>
      <header className="layout__navbar">
        <div className="navbar_header">
          <a href="#" className="navbar_title">
            SanLore-Hotel
          </a>
        </div>
        <Nav />
      </header>
    </>
  );
};
