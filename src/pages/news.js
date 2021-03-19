import { graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import React from "react";
import Layout from "../components/layout";
import "../styles/news.scss";
import "../styles/style.scss";

const NewsPage = ({ data }) => {
  return (
    <Layout pageName="news">
      <div className="news-container">
        {data.news.nodes.map((item, index) => (
          <NewsEntry data={item} key={index} id={index} />
        ))}
      </div>
    </Layout>
  );
};

const NewsEntry = ({ data, id }) => {
  const isEven = id % 2;
  const content = data.childMarkdownRemark;
  return (
    <div className="news-entry">
      <div className="news-title-box">
        <h1 className="news-title">{content.frontmatter.title}</h1>
        <h3 className="news-date">{data.birthTime}</h3>
        <div style={{ clear: "both" }} />
      </div>
      <div className="title-underline" />
      <div
        className="news-image"
        style={{
          float: isEven ? "right" : "left",
          marginLeft: !isEven ? 0 : "2rem",
          marginRight: isEven ? 0 : "2rem",
        }}
      >
        <GatsbyImage
          image={getImage(content.frontmatter.featuredImage)}
          alt=""
        />
      </div>
      <div className="news-content">
        <div
          className="news-text"
          dangerouslySetInnerHTML={{
            __html: content.html,
          }}
        />
      </div>
      <div style={{ clear: "both" }} />
    </div>
  );
};

export const query = graphql`
  query {
    news: allFile(
      sort: { fields: birthTime, order: DESC }
      filter: { absolutePath: { regex: "/news//" } }
    ) {
      nodes {
        birthTime(formatString: "DD/MM/YYYY", locale: "it")
        childMarkdownRemark {
          frontmatter {
            featuredImage {
              childImageSharp {
                gatsbyImageData(width: 920)
              }
            }
            title
          }
          html
        }
      }
    }
  }
`;

export default NewsPage;