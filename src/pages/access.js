import { graphql } from "gatsby";
import React from "react";
import Layout from "../components/layout";
import SectionHeader from "../components/section-header";
import "../styles/contacts.scss";
import "../styles/style.scss";

const AccessPage = ({ data }) => {
  const content = data.access.childMarkdownRemark;

  return (
    <Layout pageName="access">
      <SectionHeader title="Access" />
      <span
        dangerouslySetInnerHTML={{
          __html: content.html,
        }}
      />
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
