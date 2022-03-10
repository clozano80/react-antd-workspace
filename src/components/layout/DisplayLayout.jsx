import React, { useEffect, useState } from "react";
import { Tabs, Menu, Layout, Drawer, Button, Icon } from "antd";
import { WiMoonAltFirstQuarter } from "react-icons/wi";
import {
  DatabaseOutlined,
  DownOutlined,
  PlusSquareOutlined
} from "@ant-design/icons";
import ToggleTheme, { getTheme, setTheme } from "../toggletheme/ToggleTheme";
import "./layout.css";

const { TabPane } = Tabs;
const { Header, Sider, Content, Footer } = Layout;

const MainContent = () => (
  <>
    <h1>Open "apps" in tabs:</h1>
    <p>Content</p>
    <p>Content 2</p>
  </>
);

const AppExample = () => (
  <>
    <h1>AppExample</h1>
    <p>Content</p>
    <p>Content 2</p>
  </>
);
//fetch auth protected
const panes = [
  {
    title: "LOGO",
    icon: <DatabaseOutlined />,
    content: <MainContent />,
    key: "1",
    closable: false
  },
  {
    title: "Tab 2",
    icon: "",
    content: <AppExample />,
    key: "2",
    closable: true
  }
];

export default function DisplayLayout() {
  const [state, setState] = useState({
    activeKey: panes[0].key,
    panes
  });
  const [visible, setVisible] = useState(false);
  useEffect(() => setTheme(getTheme()), []);

  const onChange = (activeKey) => {
    setState({ panes, activeKey });
  };

  const add = (e) => {
    e ? e.preventDefault() : null;
    const { panes } = state;
    const activeKey = `key_${Date.now()}`;
    panes.push({
      title: "New Tab",
      content: "New Tab Pane",
      key: activeKey,
      closable: true
    });
    setState({ activeKey, panes });
  };

  const onEdit = (targetKey, action) => {
    if (action === "remove") {
      remove(targetKey);
    } else if (action === "add") {
      add();
    }
  };

  const remove = (targetKey) => {
    let { activeKey } = state;
    let lastIndex;
    state.panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const panes = state.panes.filter((pane) => pane.key !== targetKey);
    if (panes.length && activeKey === targetKey) {
      if (lastIndex >= 0) {
        activeKey = panes[lastIndex].key;
      } else {
        activeKey = panes[0].key;
      }
    }
    setState({ activeKey, panes });
  };

  const menu = (
    <>
      <div>
        Dark/light Theme <ToggleTheme />
      </div>
      <Menu>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="/" onClick={add}>
            + Add Tab
          </a>
        </Menu.Item>
      </Menu>
    </>
  );

  const operations = (
    <a
      target="_blank"
      rel="noopener noreferrer"
      href="/"
      onClick={(e) => {
        e.preventDefault();
        setVisible(!visible);
      }}
    >
      <PlusSquareOutlined />
    </a>
  );
  // const operations = (
  //   <Dropdown overlay={menu} arrow={{ pointAtCenter: true }}>
  //     <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
  //       <PlusSquareOutlined />
  //     </a>
  //   </Dropdown>
  // );

  const onClose = () => {
    setVisible(false);
  };

  return (
    <Layout>
      <Layout>
        <Header
          style={{
            position: "fixed",
            zIndex: 1,
            width: "100%",
            height: "30px"
          }}
        ></Header>
        <Content
          className="site-layout"
          style={{
            padding: "0",
            marginTop: 0,
            height: "calc(100vh - 60px)"
          }}
        >
          <Tabs
            tabBarExtraContent={operations}
            // hideAdd
            onChange={onChange}
            activeKey={state.activeKey}
            type="editable-card"
            onEdit={onEdit}
          >
            {state.panes.map((pane) => {
              return (
                <TabPane
                  tab={
                    <span>
                      {pane.icon}
                      {pane.title}
                    </span>
                  }
                  key={pane.key}
                  closable={pane.closable}
                >
                  {pane.content}
                </TabPane>
              );
            })}
            ;
          </Tabs>
        </Content>
        <Footer style={{ textAlign: "center", height: "20px" }}>Footer.</Footer>
      </Layout>
      <Drawer
        title="Drawer with extra actions"
        placement="right"
        width="30vw"
        onClose={onClose}
        visible={visible}
      >
        {menu}
      </Drawer>
      {/* <Sider
        width={256}
        style={{ minHeight: "100vh" }}
        collapsed={siderCollapsed}
        collapsedWidth="0"
        breakpoint="lg"
        trigger={null}
      >
        <div
          style={{
            height: "32px",
            background: "rgba(255,255,255,.2)",
            margin: "16px"
          }}
        />
      </Sider> */}
    </Layout>
  );
}
