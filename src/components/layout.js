/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import { MenuOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import "../styles/style.scss";
import Sidebar from "./navbar";

const PageHeader = ({ toggleMenu, pageName, scrolledPastHeader }) => {
  return (
    <>
      <div
        id="page-header"
        style={{
          position: scrolledPastHeader ? "fixed" : "relative",
          display: scrolledPastHeader ? "flex" : "none",
        }}
      >
        <button className="header-hamburger" onClick={toggleMenu}>
          <MenuOutlined />
        </button>
        <h3 className="header-title">Imaging Platform</h3>
        <h3 className="header-subtitle">{pageName}</h3>
      </div>
      {scrolledPastHeader ? <div style={{ height: "4.5rem" }} /> : <></>}
    </>
  );
};

const Layout = ({ pageName, children }) => {
  const [menuOpen, setMenuOpen] = useState(true);
  const isHome = pageName === "home";
  const [scrolledPastHeader, setScrolledPastHeader] = useState(!isHome);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  useEffect(() => {
    document.addEventListener("scroll", () => {
      const yScroll = document.scrollingElement.scrollTop;
      if (isHome) {
        const headerHeight =
          document.getElementById("home-header")?.clientHeight ?? 0;
        setScrolledPastHeader(yScroll > headerHeight);
        console.log(yScroll, headerHeight);
      }
    });
  }, []);

  return (
    <div>
      <PageHeader
        id="page-header"
        pageName={pageName}
        toggleMenu={toggleMenu}
        scrolledPastHeader={scrolledPastHeader}
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

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
