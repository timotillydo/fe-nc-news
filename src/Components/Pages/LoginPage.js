import React from "react";

const LoginPage = ({ handleChange, handleSubmit }) => {
  return (
    <div>
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
};

export default LoginPage;
