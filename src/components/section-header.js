import React from "react";
import "../styles/style.scss";

const SectionHeader = ({ title }) => {
  return (
    <>
      <h1>{title}</h1>
      <div className="title-underline" />
    </>
  );
};

export default SectionHeader;
