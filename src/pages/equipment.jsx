import { graphql } from "gatsby";
import React from "react";
import Layout from "../components/layout";
import SectionHeader from "../components/section-header";
import "../styles/equipment.scss";
import "../styles/style.scss";

const EquipmentPage = ({ data }) => {
  const content = data.equipment.childMarkdownRemark;

  return (
    <Layout pageName="equipment">
      <SectionHeader title="Equipment" />
      <span
        className="equipment-intro"
        dangerouslySetInnerHTML={{
          __html: content.html,
        }}
      />
    </Layout>
  );
};

export const query = graphql`
  query {
    equipment: file(relativePath: { eq: "equipment/intro.md" }) {
      childMarkdownRemark {
        html
      }
    }
  }
`;

export default EquipmentPage;
