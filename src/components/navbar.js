import {
  BorderlessTableOutlined,
  ExperimentOutlined,
  HomeOutlined,
  PaperClipOutlined,
  PhoneOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import "antd/dist/antd.css";
import Sider from "antd/lib/layout/Sider";
import { Link } from "gatsby";
import React from "react";
import "../styles/sider.scss";
import "../styles/style.scss";

const Sidebar = ({ pageName, open }) => {
  const handleClick = (e) => {
    console.log("click ", e);
  };

  return (
    <Sider
      theme="light"
      width={300}
      className={open ? "sider-open" : "sider-closed"}
      id="sider"
    >
      <Menu
        onClick={handleClick}
        defaultSelectedKeys={[pageName]}
        defaultOpenKeys={["equipments-sub"]}
        mode="inline"
        id="navbar"
      >
        <Menu.Item key="home" icon={<HomeOutlined />}>
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="news" icon={<BorderlessTableOutlined />}>
          <Link to="/news">News</Link>
        </Menu.Item>
        <Menu.SubMenu
          key="equipments-sub"
          icon={<ExperimentOutlined />}
          title="Equipments"
        >
          <Menu.Item key="equipments">
            <Link to="/equipments">Equipments</Link>
          </Menu.Item>
          <Menu.Item key="faq">
            <Link to="/faq">Guidelines & FAQs</Link>
          </Menu.Item>
          <Menu.Item key="tutorials">
            <Link to="/tutorials">Tutorials</Link>
          </Menu.Item>
        </Menu.SubMenu>
        <Menu.Item key="contacts" icon={<PhoneOutlined />}>
          <Link to="/contacts">Contacts</Link>
        </Menu.Item>
        <Menu.Item key="publications" icon={<PaperClipOutlined />}>
          <Link to="/publications">Publications</Link>
        </Menu.Item>
        <Menu.Item key="partners" icon={<TeamOutlined />}>
          <Link to="/partners">Partners</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
