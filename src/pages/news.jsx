import { graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import React from "react";
import Layout from "../components/layout";
import Section from "../components/section";
import "../styles/news.scss";
import "../styles/style.scss";

const NewsPage = ({ data }) => {
  return (
    <Layout pageName="news & events">
      <Section title="News at the platform">
        {data.news.nodes.map((item, index) => (
          <NewsEntry data={item} key={index} id={index} />
        ))}
      </Section>

      <Section title="Events">
        {data.events.nodes.map((item, index) => (
          <NewsEntry data={item} key={index} id={index} />
        ))}
      </Section>
    </Layout>
  );
};

const NewsEntry = ({ data }) => {
  const content = data.childMarkdownRemark;

  const date = content.frontmatter.date;
  const dispDate = date.substr(0, date.indexOf("T"));

  return (
    <div className="news-entry" id={content.frontmatter.title}>
      <h3>{content.frontmatter.title}</h3>
      <div
        className="news-image"
        style={{
          width: content.html ? "50%" : "100%",
        }}
      >
        <GatsbyImage
          image={getImage(content.frontmatter.featuredImage)}
          alt=""
        />
      </div>
      <div className="news-content">
        <p style={{ color: "#808080" }}>{dispDate}</p>
        <span
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
      sort: { fields: childrenMarkdownRemark___frontmatter___date, order: DESC }
      filter: { absolutePath: { regex: "/news/news//" } }
    ) {
      nodes {
        childMarkdownRemark {
          frontmatter {
            featuredImage {
              childImageSharp {
                gatsbyImageData(width: 920)
              }
            }
            title
            date
          }
          html
        }
      }
    }
    events: allFile(
      sort: { fields: childrenMarkdownRemark___frontmatter___date, order: DESC }
      filter: { absolutePath: { regex: "/news/events//" } }
    ) {
      nodes {
        childMarkdownRemark {
          frontmatter {
            featuredImage {
              childImageSharp {
                gatsbyImageData(width: 920)
              }
            }
            title
            date
          }
          html
        }
      }
    }
  }
`;

export default NewsPage;
