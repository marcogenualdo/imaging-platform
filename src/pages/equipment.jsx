import { graphql } from "gatsby";
import React from "react";
import Layout from "../components/layout";
import Section from "../components/section";
import "../styles/equipment.scss";
import "../styles/style.scss";

const EquipmentPage = ({ data }) => {
  const content = data.equipment.childMarkdownRemark;

  return (
    <Layout pageName="equipment">
      <Section title="Equipment">
        <span
          className="equipment-intro"
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
    equipment: file(relativePath: { eq: "equipment/intro.md" }) {
      childMarkdownRemark {
        html
      }
    }
  }
`;

export default EquipmentPage;
