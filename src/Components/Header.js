import React from "react";
import "../styles/Header.css";
import Menu from "./Menu";
import Toggler from "./Toggler";

const Header = () => {
  return (
    <div className="main-header">
      <Toggler>
        {({ show, toggle }) => {
          return (
            <div>
              <div className="fas fa-bars" onClick={toggle}></div>
              {show && <Menu />}
            </div>
          );
        }}
      </Toggler>
      <h1>NC-NEWS</h1>
    </div>
  );
};

export default Header;