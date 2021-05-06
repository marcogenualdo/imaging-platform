import {
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
import MegaphoneSvg from "../images/loud-speaker.svg";
import MicroscopeSvg from "../images/microscope-icon.svg";
import "../styles/sidebar.scss";
import "../styles/style.scss";

const SvgIcon = ({ children }) => (
  <span className="anticon" style={{ width: "0.9rem", height: "0.9rem" }}>
    {children}
  </span>
);

const Sidebar = ({ pageName, open }) => {
  return (
    <Sider
      theme="light"
      width="18rem"
      className={open ? "sider-open" : "sider-closed"}
      id="sider"
    >
      <Menu
        defaultSelectedKeys={[pageName]}
        defaultOpenKeys={["equipment-sub"]}
        mode="inline"
        id="navbar"
      >
        <Menu.Item key="home" icon={<HomeOutlined />}>
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.SubMenu
          key="equipment-sub"
          icon={
            <SvgIcon>
              <MicroscopeSvg />
            </SvgIcon>
          }
          title="Equipment"
        >
          <Menu.ItemGroup subMenuKey="equipment-sub">
            <Menu.Item key="equipment">
              <Link to="/equipment">Equipment</Link>
            </Menu.Item>
            <Menu.Item key="access">
              <Link to="/access">Access</Link>
            </Menu.Item>
            <Menu.Item key="guidelines">
              <Link to="/guidelines">Guidelines & FAQs</Link>
            </Menu.Item>
            <Menu.Item key="tutorials">
              <Link to="/tutorials">Tutorials</Link>
            </Menu.Item>
          </Menu.ItemGroup>
        </Menu.SubMenu>
        <Menu.Item key="partners" icon={<TeamOutlined />}>
          <Link to="/partners">Partners</Link>
        </Menu.Item>
        <Menu.Item
          key="news"
          icon={
            <SvgIcon>
              <MegaphoneSvg />
            </SvgIcon>
          }
        >
          <Link to="/news">News & Events</Link>
        </Menu.Item>
        <Menu.Item key="publications" icon={<PaperClipOutlined />}>
          <Link to="/publications">Publications</Link>
        </Menu.Item>
        <Menu.Item key="contacts" icon={<PhoneOutlined />}>
          <Link to="/contacts">Contacts</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
