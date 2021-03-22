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
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { graphql, useStaticQuery } from "gatsby";

const PageHeader = ({ toggleMenu, pageName }) => {
  const isHome = pageName === "home";
  const [scrolledPastHeader, setScrolledPastHeader] = useState(!isHome);

  useEffect(() => {
    document.addEventListener("scroll", () => {
      const yScroll = document.scrollingElement.scrollTop;
      if (isHome) {
        const homeHeaderHeight =
          document.getElementById("home-header")?.clientHeight ?? 0;
        const pageHeaderHeight =
          document.getElementById("page-header")?.clientHeight ?? 0;
        setScrolledPastHeader(yScroll > homeHeaderHeight - pageHeaderHeight);
      }
    });
  }, []);

  const { banner } = useStaticQuery(graphql`
    query {
      banner: file(relativePath: { eq: "dna-banner.jpg" }) {
        childImageSharp {
          gatsbyImageData(width: 1920)
        }
      }
    }
  `);

  return (
    <>
      <div
        id="page-header"
        className={!isHome || scrolledPastHeader ? "page-header-down" : ""}
      >
        <button className="header-hamburger" onClick={toggleMenu}>
          <MenuOutlined />
        </button>
        <h3 className="header-title">Imaging Platform</h3>
        <h3 className="header-subtitle">{pageName}</h3>
      </div>
      {!isHome ? <div style={{ height: "4.5rem" }} /> : <></>}

      {isHome ? (
        <header id="home-header">
          <GatsbyImage image={getImage(banner)} alt="" />
          <div className="title-wrap"></div>
          <h1 className="home-title">Imaging platform</h1>
          <div className="head-banner"></div>
        </header>
      ) : (
        <></>
      )}
    </>
  );
};

const Layout = ({ pageName, children }) => {
  const [menuOpen, setMenuOpen] = useState(true);
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

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
