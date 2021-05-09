import { graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import React from "react";
import Layout from "../components/layout";
import Section from "../components/section";
import "../styles/partners.scss";

const PartnerSection = ({ partnerData }) => {
  const image = getImage(partnerData.intro.frontmatter.featuredImage);
  return (
    <div className="partner-box">
      <div className="partner-header">
        <h1>{partnerData.intro.frontmatter.name}</h1>
        {image && <GatsbyImage image={image} alt="" className="partner-logo" />}
        <div
          className="partner-description"
          dangerouslySetInnerHTML={{ __html: partnerData.intro.html }}
        />
      </div>
      <div className="events-box">
        {partnerData.events.map((item, index) => (
          <PartnerEvent eventData={item} key={index} />
        ))}
      </div>
    </div>
  );
};

const PartnerEvent = ({ eventData }) => {
  const pdf = eventData.frontmatter.pdf?.publicURL;

  return (
    <div className="event-card">
      <GatsbyImage
        image={getImage(eventData.frontmatter.featuredImage)}
        alt=""
        className="event-image"
      />
      <div className="event-content">
        <div
          className="event-text"
          dangerouslySetInnerHTML={{
            __html: eventData.html,
          }}
        />
        <div className="text-fade" />
        {pdf && (
          <a href={pdf} download>
            Read more
          </a>
        )}
      </div>
    </div>
  );
};

const AcademicPartner = ({ partnerData }) => {
  return (
    <div className="academic-box">
      <div className="academic-content">
        <h3>{partnerData.frontmatter.title}</h3>
        <div
          className="academic-text"
          dangerouslySetInnerHTML={{
            __html: partnerData.html,
          }}
        />
      </div>
      <div className="academic-logos">
        <GatsbyImage
          className="academic-logo"
          image={getImage(partnerData.frontmatter.featuredImage)}
          alt=""
        />
        <img
          className="academic-logo"
          src="../../content/uploads/logo-bbcd.png"
          alt=""
        />
      </div>
    </div>
  );
};

const PartnersPage = ({ data }) => {
  const partnerIntros = data.industrial.nodes;
  const partnersData = partnerIntros.reduce((res, cur) => {
    return {
      ...res,
      [cur.childMarkdownRemark.frontmatter.id]: {
        intro: cur.childMarkdownRemark,
        events: [],
      },
    };
  }, {});
  for (let item of data.events.nodes) {
    const partnerId = item.childMarkdownRemark.frontmatter.partnerId;
    partnersData[partnerId].events.push(item.childMarkdownRemark);
  }

  return (
    <Layout pageName="partners">
      <Section title="Industrial Partners">
        {Object.values(partnersData).map((item, index) => (
          <PartnerSection partnerData={item} key={index} />
        ))}
      </Section>
      <Section title="Academic Partners">
        {data.academic.nodes.map((item, index) => (
          <AcademicPartner partnerData={item.childMarkdownRemark} key={index} />
        ))}
      </Section>
    </Layout>
  );
};

export const query = graphql`
  query {
    industrial: allFile(
      filter: { absolutePath: { regex: "/partners/industrial//" } }
      sort: { fields: childrenMarkdownRemark___frontmatter___order }
    ) {
      nodes {
        childMarkdownRemark {
          frontmatter {
            featuredImage {
              childImageSharp {
                gatsbyImageData(width: 420)
              }
            }
            name
            id
          }
          html
        }
      }
    }
    events: allFile(filter: { absolutePath: { regex: "/partners/events//" } }) {
      nodes {
        childMarkdownRemark {
          frontmatter {
            featuredImage {
              childImageSharp {
                gatsbyImageData(width: 420)
              }
            }
            partnerId
            pdf {
              publicURL
            }
          }
          html
        }
      }
    }
    academic: allFile(
      filter: { absolutePath: { regex: "/partners/academic//" } }
      sort: { fields: childrenMarkdownRemark___frontmatter___order }
    ) {
      nodes {
        childMarkdownRemark {
          frontmatter {
            featuredImage {
              childImageSharp {
                gatsbyImageData(width: 420)
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

export default PartnersPage;
