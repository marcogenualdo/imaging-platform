import { graphql } from "gatsby";
import { AnchorLink } from "gatsby-plugin-anchor-links";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import React from "react";
import Layout from "../components/layout";
import Section from "../components/section";
import SEO from "../components/seo";
import HomeBg from "../images/home-bg.svg";
import "../styles/index.scss";
import "../styles/style.scss";
import IbpmLogoFull from "../images/logo-ibpm-bg.svg";

const IndexPage = ({ data }) => {
  const introTitle = data.intro.childMarkdownRemark.frontmatter.title;
  const members = data.members.childHomeJson.members;
  const sponsorLogos = data.sponsors.childHomeJson.sponsors;

  return (
    <>
      <Layout pageName="home">
        <HomeBg className="home-bg" />
        <div className="content">
          <div className="home-title">
            <IbpmLogoFull />
            <div>
              <h1>Imaging platform</h1>
              <h3>Institute of Molecular Biology and Pathology</h3>
            </div>
          </div>
          <Section className="intro" title={introTitle}>
            <div
              className="intro-text"
              dangerouslySetInnerHTML={{
                __html: data.intro.childMarkdownRemark.html,
              }}
            />
          </Section>

          <Section id="news" title="Latest News">
            <div className="news-preview-container">
              {data.news.nodes.map((item, index) => (
                <NewsPreview data={item.childMarkdownRemark} key={index} />
              ))}
            </div>
          </Section>

          <Section title="Members">
            <ul className="members-list">
              {members.map((member, index) => (
                <li className="member-item" key={index}>
                  <GatsbyImage
                    className="member-avatar"
                    image={getImage(member.featuredImage)}
                    alt=""
                  />
                  <div>
                    <strong>{member.name}</strong>
                    <p>{member.mail}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Section>

          <Section title="Sponsors">
            <div className="sp-box">
              {sponsorLogos.map((item, index) => (
                <div key={index} className="sp-item">
                  <GatsbyImage image={getImage(item.logo)} alt="" />
                </div>
              ))}
            </div>
          </Section>
        </div>
        <SEO title="Home" />
      </Layout>
    </>
  );
};

const NewsPreview = ({ data }) => {
  return (
    <AnchorLink
      to={`/news#${data.frontmatter.title}`}
      className="news-preview-entry"
    >
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
    </AnchorLink>
  );
};

export const query = graphql`
  query {
    intro: file(relativePath: { eq: "home/intro.md" }) {
      childMarkdownRemark {
        frontmatter {
          title
        }
        html
      }
    }
    news: allFile(
      sort: { fields: childrenMarkdownRemark___frontmatter___date, order: DESC }
      filter: { absolutePath: { regex: "/news/news//" } }
      limit: 2
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
    members: file(relativePath: { eq: "home/members.json" }) {
      childHomeJson {
        members {
          mail
          name
          featuredImage {
            childImageSharp {
              gatsbyImageData(width: 920)
            }
          }
        }
      }
    }
    sponsors: file(relativePath: { eq: "home/sponsors.json" }) {
      childHomeJson {
        sponsors {
          logo {
            childImageSharp {
              gatsbyImageData(width: 620)
            }
          }
        }
      }
    }
  }
`;

export default IndexPage;
