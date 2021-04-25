import { graphql } from "gatsby";
import React from "react";
import Layout from "../components/layout";

const PublicationEntry = ({ data }) => {
  const markdown = data.childMarkdownRemark;

  return (
    <div className="publication-entry">
      <p>{markdown.frontmatter.authors}</p>
      <p>{markdown.frontmatter.title}</p>
      <p>{markdown.frontmatter.notes}</p>
      <a href={markdown.frontmatter.url}>Full article</a>
    </div>
  );
};

const groupByYear = (items) =>
  items.reduce((res, item) => {
    const year = item.childMarkdownRemark.frontmatter.year;
    if (!res[year]) {
      res[year] = [];
    }
    res[year].push(item);
    return res;
  }, {});

const PublicationsPage = ({ data }) => {
  const groupedByYear = groupByYear(data.publications.nodes);
  return (
    <Layout pageName="publications">
      {data.publications.nodes.map((item) => (
        <PublicationEntry data={item} />
      ))}
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
