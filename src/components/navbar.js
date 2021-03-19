import {
  ExperimentOutlined,
  HomeOutlined,
  PaperClipOutlined,
  PhoneOutlined,
  TeamOutlined,
  BorderlessTableOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import "antd/dist/antd.css";
import { Link } from "gatsby";
import React from "react";

const { SubMenu } = Menu;

const SidebarItem = (props) => {
  return (
    <Menu.Item
      {...props}
      key={props.route}
      icon={props.icon}
      style={{ display: props.open ? "block" : "none" }}
    >
      <Link to={props.route}>{props.name}</Link>
    </Menu.Item>
  );
};

const Sidebar = ({ pageName, open }) => {
  const handleClick = (e) => {
    console.log("click ", e);
  };

  return (
    <Menu
      onClick={handleClick}
      defaultSelectedKeys={[pageName]}
      defaultOpenKeys={["equipments-sub"]}
      mode="inline"
      id="navbar"
      style={{ width: open ? 300 : 0 }}
    >
      <SidebarItem name="Home" route="/" icon={<HomeOutlined />} open={open} />
      <SidebarItem
        name="News"
        route="/news"
        icon={<BorderlessTableOutlined />}
        open={open}
      />
      <SubMenu
        key="equipments-sub"
        icon={<ExperimentOutlined />}
        title="Equipments"
        style={{ display: open ? "block" : "none" }}
      >
        <SidebarItem name="Equipments" route="/equipments" open={open} />
        <SidebarItem name="Guidelines & FAQs" route="/faq" open={open} />
        <SidebarItem name="Tutorials" route="/tutorials" open={open} />
      </SubMenu>
      <SidebarItem
        name="Contacts"
        route="/contacts"
        open={open}
        icon={<PhoneOutlined />}
      />
      <SidebarItem
        name="Publications"
        route="/publications"
        open={open}
        icon={<PaperClipOutlined />}
      />
      <SidebarItem
        name="Partners"
        route="/partners"
        open={open}
        icon={<TeamOutlined />}
      />
    </Menu>
  );
};

export default Sidebar;
