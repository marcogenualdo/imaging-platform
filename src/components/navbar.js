import {
  ExperimentOutlined,
  HomeOutlined,
  PaperClipOutlined,
  PhoneOutlined,
  TeamOutlined,
  BorderlessTableOutlined,
} from "@ant-design/icons"
import { Menu } from "antd"
import "antd/dist/antd.css"
import { Link } from "gatsby"
import React from "react"

const { SubMenu } = Menu

const Sidebar = () => {
  const handleClick = e => {
    console.log("click ", e)
  }

  return (
    <Menu
      onClick={handleClick}
      style={{ width: 256 }}
      defaultSelectedKeys={["home"]}
      defaultOpenKeys={["sub1"]}
      mode="inline"
    >
      <Menu.Item key="home" icon={<HomeOutlined />}>
        <Link>Home</Link>
      </Menu.Item>
      <Menu.Item key="news" icon={<BorderlessTableOutlined />}>
        <Link>News</Link>
      </Menu.Item>
      <SubMenu key="sub1" icon={<ExperimentOutlined />} title="Equipments">
        <Menu.Item key="1">
          <Link>Equipments</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link>Guidelines & FAQs</Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link>Tutorials</Link>
        </Menu.Item>
      </SubMenu>
      <Menu.Item key="1" icon={<PhoneOutlined />}>
        <Link>Contacts</Link>
      </Menu.Item>
      <Menu.Item key="2" icon={<PaperClipOutlined />}>
        <Link>Publications</Link>
      </Menu.Item>
      <Menu.Item key="3" icon={<TeamOutlined />}>
        <Link>Partners</Link>
      </Menu.Item>
    </Menu>
  )
}

export default Sidebar
