/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import { MenuOutlined } from "@ant-design/icons";
import { PageHeader } from "antd";
import PropTypes from "prop-types";
import React, { useState } from "react";
import "../styles/style.scss";
import Sidebar from "./navbar";

const Layout = ({ pageName, children }) => {
  const [menuOpen, setMenuOpen] = useState(true);

  return (
    <div>
      <PageHeader
        className="site-page-header"
        title="Imaging Platform"
        subTitle={`/ ${pageName}`}
        backIcon={<MenuOutlined />}
        onBack={() => setMenuOpen(!menuOpen)}
      />
      <div style={{ height: "4.5rem" }} />
      <div className="page-wrapper">
        <Sidebar pageName={pageName} open={menuOpen} />
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
