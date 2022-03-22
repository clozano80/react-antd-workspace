import React, { useEffect, useState } from "react";
import { Tabs, Menu, Layout, Drawer, Button, Icon } from "antd";
import { BsMenuButtonWide } from "react-icons/bs";
import { RiMore2Fill } from "react-icons/ri";
import { VscSplitHorizontal, VscSplitVertical } from "react-icons/vsc";
import { DatabaseOutlined } from "@ant-design/icons";
import ToggleTheme, { getTheme, setTheme } from "../toggletheme/ToggleTheme";
import "./displaylayout.css";
import Form from "../../apps/form/Form";

const { TabPane } = Tabs;
const { Header, Sider, Content, Footer } = Layout;

const MainContent = () => (
  <>
    <h1>Open tabs:</h1>
    <p>Content</p>
    <Form />
  </>
);

const Options = () => (
  <>
    <RiMore2Fill
      key="0"
      className="ant-tabs-tab-remove"
      style={{
        marginLeft: "0.8rem",
        marginRight: "-0.5rem",
        marginTop: "0.2rem"
      }}
      onClick={(e) => {
        e.preventDefault();
        //e.stopPropagation();
        console.log("click more tab");
      }}
    />
  </>
);

//const addText = (lines) => Array.from({length: lines}, (_, i) => (`linea ${i}`));
const addText = (lines) =>
  [...Array(lines).keys()].map((i) => (
    <div>
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
const panes = [
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
    setState({ panes, activeKey });
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
        <VscSplitVertical />
      </a>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="/"
        onClick={(e) => {
          e.preventDefault();
          setVisible(!visible);
        }}
      >
        <VscSplitHorizontal />
      </a>
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
