import { graphql } from "gatsby";
import React from "react";
import Layout from "../components/layout";
import Section from "../components/section";
import "../styles/style.scss";
import "../styles/guidelines.scss";

const GuidelinesFAQPage = ({ data }) => {
  const content = data.guidelines.childMarkdownRemark;

  return (
    <Layout pageName="guidelines">
      <Section title={content.frontmatter.title}>
        <span
          className="guidelines-doc"
          dangerouslySetInnerHTML={{
            __html: content.html,
          }}
        />
      </Section>
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
