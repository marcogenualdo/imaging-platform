import { graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import React from "react";
import Layout from "../components/layout";
import Section from "../components/section";
import "../styles/partners.scss";

const PartnerSection = ({ data }) => {
  const partnerData = data.childMarkdownRemark;
  const logo = getImage(partnerData.frontmatter.featuredImage);

  return (
    <div className="partner-box">
      <a href={partnerData.frontmatter.href} target="blank">
        <h1>{partnerData.frontmatter.name}</h1>
      </a>
      <div className="partner-content">
        {logo && <GatsbyImage image={logo} alt="" className="partner-logo" />}
        <div
          className="partner-description"
          dangerouslySetInnerHTML={{ __html: partnerData.html }}
        />
      </div>
      {partnerData.frontmatter.downloads && (
        <div className="events-box">
          <strong>Events:</strong>
          <ul>
            {partnerData.frontmatter.downloads.map((item, index) => (
              <li key={index}>
                <a download href={item.href.publicURL}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const PartnersPage = ({ data }) => {
  const partnersData = data.partners.nodes;

  return (
    <Layout pageName="partners">
      <Section title="Partners">
        {partnersData.map((item, index) => (
          <PartnerSection data={item} key={index} />
        ))}
      </Section>
    </Layout>
  );
};

export const query = graphql`
  query {
    partners: allFile(
      sort: { fields: childrenMarkdownRemark___frontmatter___order }
      filter: { absolutePath: { regex: "/partners//" } }
    ) {
      nodes {
        childMarkdownRemark {
          frontmatter {
            href
            name
            order
            featuredImage {
              childImageSharp {
                gatsbyImageData(width: 320)
              }
            }
            downloads {
              label
              href {
                publicURL
              }
            }
          }
          html
        }
      }
    }
  }
`;

export default PartnersPage;
