import React, { useState } from "react";
import "../styles/style.scss";
import Sidebar from "./navbar";
import PageHeader from "./header";

const Layout = ({ pageName, children }) => {
  const openWidth = window.innerWidth > 920;
  const [menuOpen, setMenuOpen] = useState(openWidth);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <>
      <PageHeader
        id="page-header"
        pageName={pageName}
        toggleMenu={toggleMenu}
      />
      <div className="page-wrapper">
        <Sidebar pageName={pageName} open={menuOpen} />
        <div id="site-trunk">
          <div
            className="dark-layer"
            style={{
              opacity: menuOpen && !openWidth ? 1 : 0,
              zIndex: menuOpen && !openWidth ? 4 : 0,
            }}
          />
          <main>{children}</main>
          <footer
            style={{
              marginTop: `2rem`,
            }}
          >
            © {new Date().getFullYear()}, this site is WIP. See the
            {` `}
            <a href="https://github.com/marcogenualdo/imaging-platform">repo</a>
          </footer>
        </div>
      </div>
    </>
  );
};

export default Layout;
