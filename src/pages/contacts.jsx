import { EnvironmentTwoTone } from "@ant-design/icons";
import { Col, Row } from "antd";
import { graphql } from "gatsby";
import React from "react";
import Layout from "../components/layout";
import Section from "../components/section";
import "../styles/contacts.scss";
import "../styles/style.scss";

const ContactsPage = ({ data }) => {
  const content = data.contacts.childMarkdownRemark;

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
              <EnvironmentTwoTone style={{ display: "inline-block" }} />
              <h2 style={{ display: "inline" }}>Where we are.</h2>
            </div>

            <iframe
              title="gmaps-iframe"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4994.676500692491!2d12.513768381148783!3d41.89603095411324!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x132f61e65dbae7a9%3A0x1fe9ccaafcbba004!2sVia%20degli%20Apuli%2C%204%2C%2000185%20Roma%20RM!5e0!3m2!1sen!2sit!4v1619888697684!5m2!1sen!2sit"
              className="contacts-map"
              allowFullScreen=""
              loading="lazy"
            ></iframe>
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
  }
`;
export default ContactsPage;
