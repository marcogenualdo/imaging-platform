import React, { useState } from "react";
import "../styles/style.scss";
import Sidebar from "./navbar";
import PageHeader from "./header";

const Layout = ({ pageName, children }) => {
  const openWidth = window.innerWidth > 800;
  const [menuOpen, setMenuOpen] = useState(openWidth);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div>
      <PageHeader
        id="page-header"
        pageName={pageName}
        toggleMenu={toggleMenu}
      />
      <div className="page-wrapper">
        <Sidebar pageName={pageName} open={menuOpen} />
        <div id="site-trunk">
          <main>{children}</main>
          <footer
            style={{
              marginTop: `2rem`,
            }}
          >
            © {new Date().getFullYear()}, Built with
            {` `}
            <a href="https://www.gatsbyjs.com">Gatsby</a>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Layout;
