import React, { useState } from "react";
import { Tabs, Menu, Layout, Dropdown, Button } from "antd";
import { WiMoonAltFirstQuarter } from "react-icons/wi";
import { DatabaseOutlined, DownOutlined } from "@ant-design/icons";
import ToggleTheme from "../toggletheme/ToggleTheme";
import "./layout.css";

const { TabPane } = Tabs;
const { Header, Content, Footer } = Layout;

//fetch auth protected
const panes = [
  {
    title: "LOGO",
    icon: <DatabaseOutlined />,
    content: "Content of Tab 1",
    key: "1",
    closable: false
  },
  {
    title: "Tab 2",
    icon: "",
    content: "Content of Tab 2",
    key: "2",
    closable: true
  }
];

export default function DisplayLayout() {
  const [state, setState] = useState({
    activeKey: panes[0].key,
    panes
  });

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

  const removeActive = (e) => {
    e.preventDefault();
    let { activeKey } = state;
    const newPanes = state.panes.filter((pane) => pane.key !== activeKey);
    setState({ activeKey, newPanes });
  };

  const menu = (
    <Menu>
      <Menu.Item>
        Dark/light Theme <ToggleTheme />
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="/" onClick={add}>
          + Add Tab
        </a>
      </Menu.Item>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="/"
          onClick={removeActive}
        >
          - Remove Tab
        </a>
      </Menu.Item>
    </Menu>
  );

  // const operations = <Button>Extra Action</Button>;
  const operations = (
    <Dropdown overlay={menu} arrow={{ pointAtCenter: true }}>
      <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
        bottomLeft
      </a>
    </Dropdown>
  );

  return (
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
  );
}
