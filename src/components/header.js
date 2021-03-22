import React, { useEffect, useState } from "react";
import { MenuOutlined } from "@ant-design/icons";
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
        console.log({ yScroll, homeHeaderHeight, pageHeaderHeight });
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

export default PageHeader;
