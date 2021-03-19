/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import { PageHeader } from "antd";
import Sider from "antd/lib/layout/Sider";
import { graphql, useStaticQuery } from "gatsby";
import PropTypes from "prop-types";
import React, { useState } from "react";
import "../styles/style.scss";
import Sidebar from "./navbar";

import { MenuOutlined } from "@ant-design/icons";

const Layout = ({ pageName, children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  const [menuOpen, setMenuOpen] = useState(true);

  return (
    <div>
      <PageHeader
        className="site-page-header"
        title={pageName}
        subTitle="This is a subtitle"
        backIcon={<MenuOutlined />}
        onBack={() => setMenuOpen(!menuOpen)}
      />
      <div style={{ height: "4.5rem" }} />
      <div className="page-wrapper">
        <Sider theme="light" width={menuOpen ? 300 : 0} breakpoint="md">
          <Sidebar pageName={pageName} open={menuOpen} />
        </Sider>
        <div id="site-trunk">
          <main>{children}</main>
          <footer
            style={{
              marginTop: `2rem`,
            }}
          >
            © {new Date().getFullYear()}, Built with
            {` `}
            <a href="https://www.gatsbyjs.com">Gatsby</a>
          </footer>
        </div>
      </div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
