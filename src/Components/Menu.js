import React from "react";
import { Link } from "@reach/router";
import "../styles/Menu.css";

const Menu = () => {
  return (
    <ul className="menu">
      <li>
        <Link className="menu-item" to="/">
          Home
        </Link>
      </li>
      {/* <li>
        <Link className="menu-item" to="/">
        Top Articles
        </Link>
      </li> */}
      <li>
        <Link className="menu-item" to="/topics">
          Topics
        </Link>
      </li>
      <li>
        <Link className="menu-item" to="/users">
          Users
        </Link>
      </li>
      <li>
        <Link className="menu-item" to="/login">
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
