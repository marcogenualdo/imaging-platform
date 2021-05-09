import { graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import React from "react";
import Layout from "../components/layout";
import Section from "../components/section";
import "../styles/equipment.scss";
import "../styles/style.scss";

const EquipmentPage = ({ data }) => {
  const intro = data.intro.childMarkdownRemark;

  return (
    <Layout pageName="equipment">
      <Section title="The Platform">
        <span
          className="equipment-intro"
          dangerouslySetInnerHTML={{
            __html: intro.html,
          }}
        />
      </Section>
      <Section title="Equipment">
        {data.items.nodes.map((item, index) => (
          <EquipmentItem itemData={item.childMarkdownRemark} key={index} />
        ))}
      </Section>
    </Layout>
  );
};

export const query = graphql`
  query {
    intro: file(relativePath: { eq: "equipment/intro.md" }) {
      childMarkdownRemark {
        html
      }
    }
    items: allFile(
      sort: { fields: childrenMarkdownRemark___frontmatter___order }
      filter: { absolutePath: { regex: "/equipment/items//" } }
    ) {
      nodes {
        childMarkdownRemark {
          frontmatter {
            featuredImage {
              childImageSharp {
                gatsbyImageData(width: 620)
              }
            }
            title
          }
          html
        }
      }
    }
  }
`;

export default EquipmentPage;

const EquipmentItem = ({ itemData }) => {
  return (
    <div className="equipment-item">
      <h3 className="equipment-title">{itemData.frontmatter.title}</h3>
      <div className="equipment-image-box">
        <div className="equipment-inner-shadow" />

        <GatsbyImage
          image={getImage(itemData.frontmatter.featuredImage)}
          alt=""
        />
      </div>

      <div className="equipment-text">
        <div
          className="equipment-description"
          dangerouslySetInnerHTML={{
            __html: itemData.html,
          }}
        />
      </div>
    </div>
  );
};
