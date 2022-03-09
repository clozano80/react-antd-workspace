import ToggleTheme from "./components/toggleTheme/ToggleTheme";
import "./app.scss";
import { WiMoonAltFirstQuarter } from "react-icons/wi";

export default function App() {
  return (
    <div className="app">
      <h1>
        Switch theme <WiMoonAltFirstQuarter />{" "}
      </h1>
      <div className="appSwitch">
        Light/Dark Theme:&nbsp;
        <ToggleTheme />
      </div>
    </div>
  );
}
