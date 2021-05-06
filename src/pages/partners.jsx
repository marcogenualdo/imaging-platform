import { graphql, useStaticQuery } from "gatsby";
import React from "react";
import Layout from "../components/layout";
import Section from "../components/section";
import "../styles/partners.scss";

const PartnerSection = ({ dirName }) => {
  const partnerData = useStaticQuery(graphql`
    {
      intro: file(relativePath: { eq: "partners/industrial/${dirName}/intro.md" }) {
        childMarkdownRemark {
          html
        }
      }
    }
  `);

  return (
    <div
      className="news-text"
      dangerouslySetInnerHTML={{
        __html: partnerData.intro.childMarkdownRemark.html,
      }}
    />
  );
};

const PartnersPage = ({ data }) => {
  return (
    <Layout pageName="partners">
      <Section title="Industry Partners">
        {data.industrial.nodes.map((item) => (
          <PartnerSection dirName={item.base} />
        ))}
      </Section>
      <Section title="Academic Partners"></Section>
    </Layout>
  );
};

export const query = graphql`
  query {
    industrial: allDirectory(
      filter: { absolutePath: { regex: "/partners/industrial/[^/]*$/" } }
    ) {
      nodes {
        base
      }
    }
  }
`;

export default PartnersPage;
