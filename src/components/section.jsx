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

const Section = ({ title, children, className, id }) => (
  <section className={className} id={id}>
    <SectionHeader title={title} />
    {children}
  </section>
);

export default Section;
