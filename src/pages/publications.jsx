import { graphql } from "gatsby";
import React from "react";
import Layout from "../components/layout";
import "../styles/publications.scss";

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
      <p>{data.authors.replace(/,/g, "  ꞏ  ")}</p>
      <code>{data.notes}</code>
      <a href={data.url}>Full article</a>
    </li>
  );
};

export const groupByYear = (items) => {
  // group into year
  const dict = items.reduce((res, item) => {
    const year = item.childMarkdownRemark.frontmatter.year;
    if (!res[year]) {
      res[year] = [];
    }
    res[year].push(item.childMarkdownRemark.frontmatter);
    return res;
  }, {});

  // transform into list
  const keys = Object.keys(dict)
    .sort((a, b) => Number(b.year) - Number(a.year))
    .reverse();
  console.log(keys);
  const list = keys.map((key) => {
    return { year: key, data: dict[key] };
  });
  console.log(JSON.stringify(list, null, 2));
  return list;
};

const PublicationsPage = ({ data }) => {
  const groupedByYear = groupByYear(data.publications.nodes);

  return (
    <Layout pageName="publications">
      <ul className="year-list">
        {groupedByYear.map((item) => (
          <PublicationYear yearData={item} key={item.year} />
        ))}
      </ul>
      <div className="year-list-closer" />
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
