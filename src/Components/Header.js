import React from "react";
import "../styles/Header.css";
import Menu from "./Menu";
import Toggler from "./Toggler";
import { Link } from "@reach/router";

const Header = ({ loggedInUser }) => {
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
      <h1>
        <Link to="/" className="nc-news">
          NC-NEWS
        </Link>
      </h1>
      {loggedInUser ? (
        <p className="view-login">
          Logged in: <br />
          <Link className="user-login" to={`/users/${loggedInUser}`}>
            @{loggedInUser}
          </Link>
        </p>
      ) : (
        <Link to="/login" className="login-link">
          LOGIN
        </Link>
      )}
    </div>
  );
};

export default Header;
