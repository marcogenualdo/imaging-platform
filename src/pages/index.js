import { graphql, Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import "../styles/index.scss";
import dnaBg from "../images/bg.svg";
import SectionHeader from "../components/section-header";

const IndexPage = ({ data }) => (
  <>
    <Layout pageName="home">
      <img className="dna-bg" src={dnaBg} />
      <div className="content">
        <section className="intro">
          <SectionHeader title="Leading Research" />
          <div
            className="intro-text"
            dangerouslySetInnerHTML={{
              __html: data.intro.childMarkdownRemark.html,
            }}
          />
        </section>
        <section id="news">
          <SectionHeader title="Latest News" />
          <div className="news-preview-container">
            {data.news.nodes.map((item, index) => (
              <NewsPreview data={item.childMarkdownRemark} key={index} />
            ))}
          </div>
        </section>
      </div>
      <SEO title="Home" />
    </Layout>
  </>
);

const NewsPreview = ({ data }) => {
  return (
    <div className="news-preview-entry">
      <Link to="/news">
        <div className="news-preview-image">
          <GatsbyImage
            className="news-preview-image"
            image={getImage(data.frontmatter.featuredImage)}
            alt=""
          />
        </div>
        <div className="news-preview-content">
          <h3>{data.frontmatter.title}</h3>
          <div className="news-preview-text-divider" />
          <div
            className="news-preview-text"
            dangerouslySetInnerHTML={{
              __html: data.html,
            }}
          />
          <div className="news-preview-text-fade" />
          <div className="read-more">Read more {">"}</div>
        </div>
      </Link>
    </div>
  );
};

export const query = graphql`
  query {
    intro: file(relativePath: { eq: "home-intro.md" }) {
      childMarkdownRemark {
        html
      }
    }
    news: allFile(
      sort: { fields: birthTime, order: DESC }
      filter: { absolutePath: { regex: "/news//" } }
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
          }
          html
        }
      }
    }
  }
`;

export default IndexPage;
