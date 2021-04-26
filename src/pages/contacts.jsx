import { graphql } from "gatsby";
import { Col, Row } from "antd";
import React from "react";
import Layout from "../components/layout";
import "../styles/contacts.scss";
import "../styles/style.scss";
import Section from "../components/section";
import { EnvironmentTwoTone } from "@ant-design/icons";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

const ContactsPage = ({ data }) => {
  const content = data.contacts.childMarkdownRemark;
  const members = data.members.childContactsJson.members;

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
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2969.492672993442!2d12.512249715633757!3d41.90376657178628!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13258f5b0fe7d911%3A0xed5342b156dcfd2b!2sSapienza%20University%20of%20Rome!5e0!3m2!1sen!2sit!4v1619282094810!5m2!1sen!2sit"
              className="contacts-map"
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </Col>
        </Row>
      </Section>
      <Section title="Members">
        <ul className="members-list">
          {members.map((member, index) => (
            <li className="member-item" key={index}>
              <div>
                <strong>{member.name}</strong>
                <a>{member.mail}</a>
              </div>
              <GatsbyImage
                className="member-avatar"
                image={getImage(member.featuredImage)}
                alt=""
              />
            </li>
          ))}
        </ul>
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
    members: file(relativePath: { eq: "contacts/members.json" }) {
      childContactsJson {
        members {
          mail
          name
          featuredImage {
            childImageSharp {
              gatsbyImageData(width: 920)
            }
          }
        }
      }
    }
  }
`;
export default ContactsPage;
