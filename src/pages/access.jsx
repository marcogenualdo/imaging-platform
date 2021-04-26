import { graphql } from "gatsby";
import React from "react";
import Layout from "../components/layout";
import Section from "../components/section";
import "../styles/guidelines.scss";
import "../styles/style.scss";

const AccessPage = ({ data }) => {
  const content = data.access.childMarkdownRemark;

  return (
    <Layout pageName="access">
      <Section title="Access">
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
    access: file(relativePath: { eq: "access/access.md" }) {
      childMarkdownRemark {
        html
      }
    }
  }
`;
export default AccessPage;
