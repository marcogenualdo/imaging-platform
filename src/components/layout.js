import React, { useState } from "react";
import "../styles/style.scss";
import Sidebar from "./navbar";
import PageHeader from "./header";

const Layout = ({ pageName, children }) => {
  const [menuOpen, setMenuOpen] = useState(false);
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
          <div className={`dark-layer ${menuOpen ? "dark-layer-show" : ""}`} />
          <main>{children}</main>
          <footer>
            © {new Date().getFullYear()}, this site is WIP. See the
            {` `}
            <a
              href="https://github.com/marcogenualdo/imaging-platform"
              target="blank"
            >
              repo
            </a>
          </footer>
        </div>
      </div>
    </>
  );
};

export default Layout;
