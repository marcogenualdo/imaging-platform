import { MenuOutlined } from "@ant-design/icons";
import { Carousel } from "antd";
import { graphql, Link, useStaticQuery } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import React, { useEffect, useState } from "react";
import IbpmLogo from "../images/logo-ibpm.svg";
import "../styles/header.scss";
import "../styles/style.scss";

const PageHeader = ({ menuOpen, toggleMenu, pageName }) => {
  const isHome = pageName === "home";
  const [showPageHeader, setShowPageHeader] = useState(!isHome);

  useEffect(() => {
    const pageWidth = window.innerWidth;

    // block scroll on menu open for mobile
    if (menuOpen && pageWidth <= 920) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }

    document.addEventListener("scroll", () => {
      let willShowHeader = true;
      const yScroll = document.scrollingElement.scrollTop;

      // only show page header if past carousel
      if (isHome) {
        const homeHeaderHeight =
          document.getElementById("home-header")?.clientHeight ?? 0;
        const pageHeaderHeight =
          document.getElementById("page-header")?.clientHeight ?? 0;
        willShowHeader = yScroll > homeHeaderHeight - pageHeaderHeight;
      }

      setShowPageHeader(willShowHeader);
    });
  });

  return (
    <>
      <div
        id="page-header"
        className={showPageHeader ? "page-header-down" : ""}
      >
        <button className="header-hamburger" onClick={toggleMenu}>
          <MenuOutlined />
        </button>
        <Link className="header-logo" to="/">
          <IbpmLogo />
        </Link>
        <h3 className="header-title">Imaging Platform</h3>
        <h3 className="header-slash">/</h3>
        <h3 className="header-subtitle">{pageName}</h3>
      </div>
      <div className={!isHome ? "header-filler" : "header-filler-hide"} />

      {isHome && <HomeHeader />}
    </>
  );
};

const HomeHeader = () => {
  const { banners } = useStaticQuery(graphql`
    query {
      banners: allFile(filter: { absolutePath: { regex: "/carousel//" } }) {
        nodes {
          childMarkdownRemark {
            frontmatter {
              featuredImage {
                childImageSharp {
                  gatsbyImageData(width: 1920)
                }
              }
            }
          }
        }
      }
    }
  `);

  return (
    <header id="home-header">
      <Carousel
        autoplay
        effect="fade"
        dotPosition="top"
        className="home-carousel"
      >
        {banners.nodes.map((item, index) => (
          <GatsbyImage
            className="carousel-image"
            image={getImage(item.childMarkdownRemark.frontmatter.featuredImage)}
            alt=""
            key={index}
          />
        ))}
      </Carousel>
      <h1 className="home-title">IBPM Imaging platform</h1>
      <div className="head-banner"></div>
    </header>
  );
};

export default PageHeader;
