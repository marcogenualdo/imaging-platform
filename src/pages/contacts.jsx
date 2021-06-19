import { Col, Row } from "antd";
import { graphql } from "gatsby";
import React from "react";
import Layout from "../components/layout";
import Section from "../components/section";
import "../styles/contacts.scss";
import "../styles/style.scss";

const ContactsPage = ({ data }) => {
  const content = data.contacts.childMarkdownRemark;
  const addressInfo = data.address.childContactsJson;

  return (
    <Layout pageName="contacts">
      <Section title="Contacts">
        <Row>
          <Col sm={24} lg={12} className="contacts-col">
            <span
              className="contacts-text"
              dangerouslySetInnerHTML={{
                __html: content.html,
              }}
            />
          </Col>
          <Col sm={24} lg={12} className="map-col">
            <div className="map-text">
              <h2 style={{ display: "inline" }}>Where we are.</h2>
            </div>

            <iframe
              title="gmaps-iframe"
              src={addressInfo.gmapsEmbeddedLink}
              className="contacts-map"
              allowFullScreen=""
              loading="lazy"
            ></iframe>

            <p style={{ paddingTop: "1rem" }}>{addressInfo.description}</p>
          </Col>
        </Row>
      </Section>
    </Layout>
  );
};

export const query = graphql`
  query {
    contacts: file(relativePath: { eq: "contacts/contacts.md" }) {
      childMarkdownRemark {
        html
      }
    }
    address: file(relativePath: { eq: "contacts/address.json" }) {
      childContactsJson {
        description
        gmapsEmbeddedLink
      }
    }
  }
`;
export default ContactsPage;
