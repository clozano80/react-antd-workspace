import React, { useEffect, useState } from "react";
import { Tabs, Menu, Layout, Drawer, Dropdown } from "antd";
import { BsMenuButtonWide } from "react-icons/bs";
import { RiFullscreenFill, RiMore2Fill } from "react-icons/ri";
import { MdOutlineOpenInNew } from "react-icons/md";
import { VscSplitHorizontal, VscSplitVertical } from "react-icons/vsc";
import { DatabaseOutlined } from "@ant-design/icons";
import ToggleTheme, { getTheme, setTheme } from "../toggletheme/ToggleTheme";
import "./displaylayout.css";
import Form from "../../apps/form/Form";

const { TabPane } = Tabs;
const { Header, Content, Footer } = Layout;

const MainContent = () => (
  <>
    <h1>Open tabs:</h1>
    <p>Content</p>
    <Form />
  </>
);

const menuTabDropdown = (
  <Menu>
    <Menu.Item key="0">
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="/"
        onClick={(e) => {
          e.preventDefault();
        }}
      >
        <VscSplitVertical /> División vertical
      </a>
    </Menu.Item>
    <Menu.Item key="1">
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="/"
        onClick={(e) => {
          e.preventDefault();
        }}
      >
        <VscSplitHorizontal /> División horizontal
      </a>
    </Menu.Item>
    <Menu.Item key="2">
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="/"
        onClick={(e) => {
          e.preventDefault();
        }}
      >
        <RiFullscreenFill /> Pantalla completa
      </a>
    </Menu.Item>
    <Menu.Item key="3">
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="/"
        onClick={(e) => {
          e.preventDefault();
        }}
      >
        <MdOutlineOpenInNew /> Abrir en nueva ventana
      </a>
    </Menu.Item>
  </Menu>
);
const Options = () => (
  <Dropdown overlay={menuTabDropdown}>
    <a
      key="0"
      target="_blank"
      rel="noopener noreferrer"
      href="/"
      onClick={(e) => {
        e.preventDefault();
      }}
    >
      <RiMore2Fill
        className="ant-tabs-tab-remove"
        style={{
          marginLeft: "0.8rem",
          marginRight: "-0.5rem",
          marginTop: "0.2rem"
        }}
      />
    </a>
  </Dropdown>
);

//const addText = (lines) => Array.from({length: lines}, (_, i) => (`linea ${i}`));
const addText = (lines) =>
  [...Array(lines).keys()].map((i) => (
    <div key={i}>
      linea {i}
      <br />
    </div>
  ));
const AppExample = () => (
  <>
    <h1>AppExample</h1>
    {addText(50)}
  </>
);
//fetch auth protected
let panes = [
  {
    title: "LOGO",
    icon: <DatabaseOutlined />,
    content: <MainContent />,
    options: null,
    key: "1",
    closable: false
  },
  {
    title: "Tab 2",
    icon: "",
    content: <AppExample />,
    options: <Options />,
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
    const { panes } = state;
    setState({ activeKey: activeKey, panes });
  };

  const add = () => {
    //e ? e.preventDefault() : null;
    const { panes } = state;
    const addKey = `key_${Date.now()}`;
    panes.push({
      title: `Name ${Date.now()}`,
      content: "New Tab Pane",
      options: <Options />,
      key: addKey,
      closable: true
    });
    setState({ activeKey: addKey, panes });
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
    const { panes } = state;
    let lastIndex;
    panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const newPanes = panes.filter((pane) => pane.key !== targetKey);
    if (panes.length && activeKey === targetKey) {
      if (lastIndex >= 0) {
        activeKey = newPanes[lastIndex].key;
      } else {
        activeKey = newPanes[0].key;
      }
    }
    setState({ activeKey: activeKey, panes: newPanes });
  };
  const menu = (
    <>
      <div>
        Dark/light Theme <ToggleTheme />
      </div>
      <Menu>
        <Menu.Item key="1">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="/"
            onClick={(e) => {
              e.preventDefault();
              add();
            }}
          >
            + Add Tab
          </a>
        </Menu.Item>
      </Menu>
    </>
  );

  const operations = (
    <div>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="/"
        onClick={(e) => {
          e.preventDefault();
          setVisible(!visible);
        }}
      >
        <BsMenuButtonWide />
      </a>
    </div>
  );

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
            hideAdd
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
                      {pane.options}
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
        <Footer>
          <span>Footer</span>
        </Footer>
      </Layout>
      <Drawer
        title="Options"
        placement="right"
        width="30vw"
        onClose={onClose}
        visible={visible}
      >
        {menu}
      </Drawer>
    </Layout>
  );
}
