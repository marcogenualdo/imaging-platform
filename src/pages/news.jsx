import { graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import React from "react";
import Layout from "../components/layout";
import Section from "../components/section";
import "../styles/news.scss";
import "../styles/style.scss";

const NewsPage = ({ data }) => {
  return (
    <Layout pageName="news">
      {data.news.nodes.map((item, index) => (
        <NewsEntry data={item} key={index} id={index} />
      ))}
    </Layout>
  );
};

const NewsEntry = ({ data, id }) => {
  const isEven = id % 2;
  const content = data.childMarkdownRemark;

  return (
    <Section
      title={content.frontmatter.title}
      id={content.frontmatter.title}
      className="news-entry"
    >
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
        <p style={{ color: "#808080" }}>{data.birthTime}</p>
        <span
          className="news-text"
          dangerouslySetInnerHTML={{
            __html: content.html,
          }}
        />
      </div>
      <div style={{ clear: "both" }} />
    </Section>
  );
};

export const query = graphql`
  query {
    news: allFile(
      sort: {
        fields: childrenMarkdownRemark___frontmatter___order
        order: DESC
      }
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
            order
          }
          html
        }
      }
    }
  }
`;

export default NewsPage;
