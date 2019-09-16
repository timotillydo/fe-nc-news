import React from "react";
import { Link } from "@reach/router";

const Menu = () => {
  return (
    <ul>
      <li>
        <Link to="/login">Login</Link>
      </li>
      <li>
        <Link to="/home">Home</Link>
      </li>
      <li>
        <Link to="/topics">Topics</Link>
      </li>
      <li>
        <Link to="/articles">Top Articles</Link>
      </li>
      <li>
        <Link to="/users">Users</Link>
      </li>
      <li>
        <button>Night-Mode</button>
      </li>
    </ul>
  );
};

export default Menu;
