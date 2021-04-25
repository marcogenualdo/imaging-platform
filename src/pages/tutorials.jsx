import { graphql } from "gatsby";
import React from "react";
import Layout from "../components/layout";
import "../styles/tutorials.scss";
import SectionHeader from "../components/section-header";

const TutorialEntry = ({ data }) => {
  const markdown = data.childMarkdownRemark;

  return (
    <div className="tutorial-entry">
      <SectionHeader title={markdown.frontmatter.title} />
      <iframe
        className="tutorial-entry-video"
        src={markdown.frontmatter.videoLink}
        title={markdown.frontmatter.title}
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
        allowFullScreen={true}
      ></iframe>
      <div
        className="news-text"
        dangerouslySetInnerHTML={{
          __html: markdown.html,
        }}
      />
    </div>
  );
};

const TutorialsPage = ({ data }) => {
  return (
    <Layout pageName="tutorials">
      {data.tutorials.nodes.map((item, index) => (
        <TutorialEntry data={item} key={index} />
      ))}
    </Layout>
  );
};

export const query = graphql`
  query {
    tutorials: allFile(
      sort: { fields: birthTime, order: DESC }
      filter: { absolutePath: { regex: "/tutorials//" } }
    ) {
      nodes {
        birthTime(formatString: "DD/MM/YYYY", locale: "it")
        childMarkdownRemark {
          frontmatter {
            title
            videoLink
          }
          html
        }
      }
    }
  }
`;

export default TutorialsPage;
