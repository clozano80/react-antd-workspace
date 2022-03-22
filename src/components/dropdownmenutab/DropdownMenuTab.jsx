import { Menu, Dropdown } from "antd";
import { RiFullscreenFill, RiMore2Fill } from "react-icons/ri";
import { MdOutlineOpenInNew } from "react-icons/md";
import { VscSplitHorizontal, VscSplitVertical } from "react-icons/vsc";

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
          console.log(e);
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
export default function DropdownMenuTab() {
  return (
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
}
