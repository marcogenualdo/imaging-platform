import Layout from "../components/layout";
import React from "react";
import "../styles/tutorials.scss";

const TutorialsPage = () => {
  return (
    <Layout>
      <iframe
        className="tutorial-entry-video"
        src="https://www.youtube.com/embed/KOs14cRR7VM"
        title="Test video"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen={true}
      ></iframe>
    </Layout>
  );
};

export default TutorialsPage;
