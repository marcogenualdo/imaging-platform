import { graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import React from "react";
import Layout from "../components/layout";
import Section from "../components/section";
import "../styles/partners.scss";

const PartnerSection = ({ partnerData }) => {
  return (
    <div className="partner-box">
      <div className="partner-header">
        <h1>{partnerData.intro.frontmatter.name}</h1>
        <GatsbyImage
          image={getImage(partnerData.intro.frontmatter.featuredImage)}
          alt=""
          className="partner-logo"
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
        <button>Read more</button>
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
      <Section title="Academic Partners"></Section>
    </Layout>
  );
};

export const query = graphql`
  query {
    industrial: allFile(
      filter: { absolutePath: { regex: "/partners/industrial//" } }
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
          }
          html
        }
      }
    }
  }
`;

export default PartnersPage;
