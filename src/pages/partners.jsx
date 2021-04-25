import { graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import React from "react";
import Layout from "../components/layout";
import SectionHeader from "../components/section-header";
import "../styles/partners.scss";

const PartnerEntry = ({ data }) => {
  return (
    <div className="partner-entry">
      <a href={data.url} target="blank">
        <GatsbyImage image={getImage(data.featuredImage)} alt="" />
        <strong>{data.title}</strong>
      </a>
    </div>
  );
};

const PartnersPage = ({ data }) => {
  // bucketing into academic/industry
  const academicPartners = [];
  const industryPartners = [];
  for (let item of data.partners.nodes) {
    if (item.childMarkdownRemark.frontmatter.type === "academic")
      academicPartners.push(item);
    else industryPartners.push(item);
  }

  return (
    <Layout pageName="partners">
      <SectionHeader title="Indusrty Partners" />
      <div className="partner-list">
        {industryPartners.map((item, index) => (
          <PartnerEntry
            data={item.childMarkdownRemark.frontmatter}
            key={index}
          />
        ))}
      </div>
      <SectionHeader title="Academic Partners" />
      <div className="partner-list">
        {academicPartners.map((item, index) => (
          <PartnerEntry
            data={item.childMarkdownRemark.frontmatter}
            key={index}
          />
        ))}
      </div>
    </Layout>
  );
};

export const query = graphql`
  query {
    partners: allFile(filter: { absolutePath: { regex: "/partners//" } }) {
      nodes {
        childMarkdownRemark {
          frontmatter {
            title
            url
            featuredImage {
              childImageSharp {
                gatsbyImageData(width: 420)
              }
            }
            type
          }
        }
      }
    }
  }
`;

export default PartnersPage;
