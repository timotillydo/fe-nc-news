import React from "react";
import { Link } from "@reach/router";
import "../styles/Menu.css";

const Menu = ({ toggle }) => {
  return (
    <ul className="menu">
      <li>
        <Link className="menu-item" to="/" onClick={() => toggle()}>
          Home
        </Link>
      </li>
      <li>
        <Link className="menu-item" to="/topics" onClick={() => toggle()}>
          Topics
        </Link>
      </li>
      <li>
        <Link className="menu-item" to="/users" onClick={() => toggle()}>
          Users
        </Link>
      </li>
      <li>
        <Link className="menu-item" to="/login" onClick={() => toggle()}>
          Login
        </Link>
      </li>
      <li>
        <button className="night-mode">Night-Mode</button>
      </li>
    </ul>
  );
};

export default Menu;
