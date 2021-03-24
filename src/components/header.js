import React, { useEffect, useState } from "react";
import { MenuOutlined } from "@ant-design/icons";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { graphql, useStaticQuery } from "gatsby";
import { Carousel } from "antd";

const PageHeader = ({ toggleMenu, pageName }) => {
  const isHome = pageName === "home";
  const hide = isHome && window.innerWidth > 920;
  const [scrolledPastHeader, setScrolledPastHeader] = useState(!hide);

  useEffect(() => {
    document.addEventListener("scroll", () => {
      const yScroll = document.scrollingElement.scrollTop;
      if (hide) {
        const homeHeaderHeight =
          document.getElementById("home-header")?.clientHeight ?? 0;
        const pageHeaderHeight =
          document.getElementById("page-header")?.clientHeight ?? 0;
        setScrolledPastHeader(yScroll > homeHeaderHeight - pageHeaderHeight);
      }
    });
  }, []);

  return (
    <>
      <div
        id="page-header"
        className={!hide || scrolledPastHeader ? "page-header-down" : ""}
      >
        <button className="header-hamburger" onClick={toggleMenu}>
          <MenuOutlined />
        </button>
        <h3 className="header-title">Imaging Platform</h3>
        <h3 className="header-slash">/</h3>
        <h3 className="header-subtitle">{pageName}</h3>
      </div>
      {!hide ? <div style={{ height: "4.5rem" }} /> : <></>}

      {isHome ? <HomeHeader /> : <></>}
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
        {banners.nodes.map((item) => (
          <GatsbyImage
            className="carousel-image"
            image={getImage(item.childMarkdownRemark.frontmatter.featuredImage)}
            alt=""
          />
        ))}
      </Carousel>
      <div className="title-wrap"></div>
      <h1 className="home-title">Imaging platform</h1>
      <div className="head-banner"></div>
    </header>
  );
};

export default PageHeader;
