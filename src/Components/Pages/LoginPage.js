import React, { Component } from "react";
import Header from "../Header";

class LoginPage extends Component {
  state = {};

  // handleChange = e => {
  //   e.preventDefault();
  //   const { value } = e.target;
  //   console.log("value:", value);
  //   this.setState({ username: value });
  // };

  // handleSubmit = e => {
  //   e.preventDefault();
  //   this.setState({ isLoggedOut: false });
  // };
  render() {
    const { handleChange, handleSubmit } = this.props;
    return (
      <div>
        <Header />
        <h3>Login</h3>
        <form onSubmit={handleSubmit}>
          <label>
            Select User:
            <input list="demo-users" onChange={handleChange} />
            <datalist id="demo-users">
              <option value="tickle122" />
              <option value="grumpy19" />
              <option value="happyamy2016" />
              <option value="cooljmessy" />
              <option value="weegembump" />
              <option value="jessjelly" />
            </datalist>
          </label>
          <input type="submit" />
        </form>
      </div>
    );
  }
}

export default LoginPage;
