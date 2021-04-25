import { graphql } from "gatsby";
import React from "react";
import Layout from "../components/layout";
import SectionHeader from "../components/section-header";
import "../styles/style.scss";
import "../styles/guidelines.scss";

const GuidelinesFAQPage = ({ data }) => {
  const content = data.guidelines.childMarkdownRemark;

  return (
    <Layout pageName="guidelines">
      <SectionHeader title={content.frontmatter.title} />
      <span
        className="guidelines-doc"
        dangerouslySetInnerHTML={{
          __html: content.html,
        }}
      />
    </Layout>
  );
};

export const query = graphql`
  query {
    guidelines: file(relativePath: { eq: "guidelines/guidelines.md" }) {
      childMarkdownRemark {
        frontmatter {
          title
        }
        html
      }
    }
  }
`;
export default GuidelinesFAQPage;
