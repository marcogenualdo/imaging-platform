import { graphql } from "gatsby";
import React from "react";
import Layout from "../components/layout";
import Section from "../components/section";
import "../styles/publications.scss";
import { groupByYear } from "../tools";

const PublicationYear = ({ yearData }) => {
  return (
    <li className="year-entry">
      <div className="list-bullet" />
      <span className="year-title">{yearData.year}</span>
      <ul className="publications-list">
        {yearData.data.map((item, index) => (
          <PublicationEntry data={item} key={index} />
        ))}
      </ul>
    </li>
  );
};

const PublicationEntry = ({ data }) => {
  return (
    <li className="publication-entry">
      <strong>{data.title}</strong>
      <p>{data.authors}</p>
      <code>{data.notes}</code>
      <a href={data.url} target="blank">
        Full article
      </a>
    </li>
  );
};

const PublicationsPage = ({ data }) => {
  const groupedByYear = groupByYear(data.publications.nodes);

  return (
    <Layout pageName="publications">
      <Section title="Publications">
        <ul className="year-list">
          {groupedByYear.map((item) => (
            <PublicationYear yearData={item} key={item.year} />
          ))}
        </ul>
        <div className="year-list-closer" />
      </Section>
    </Layout>
  );
};

export const query = graphql`
  query {
    publications: allFile(
      sort: { fields: childrenMarkdownRemark___frontmatter___year, order: DESC }
      filter: { absolutePath: { regex: "/publications//" } }
    ) {
      nodes {
        childMarkdownRemark {
          frontmatter {
            authors
            year
            title
            notes
            url
          }
        }
      }
    }
  }
`;

export default PublicationsPage;
