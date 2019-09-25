import React from "react";
import { Link } from "@reach/router";
import "../styles/Menu.css";

const Menu = ({ toggle }) => {
  return (
    <ul className="menu">
      <Link className="menu-item" to="/" onClick={() => toggle()}>
        <li>Home</li>
      </Link>
      <Link className="menu-item" to="/topics" onClick={() => toggle()}>
        <li>Topics</li>
      </Link>
      <Link className="menu-item" to="/users" onClick={() => toggle()}>
        <li>Users</li>
      </Link>
      <Link className="menu-item" to="/login" onClick={() => toggle()}>
        <li>Login</li>
      </Link>
      {/* <li>
        <button className="night-mode">Night-Mode</button>
      </li> */}
    </ul>
  );
};

export default Menu;
