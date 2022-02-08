import React from "react";
import { connect } from "react-redux";
import { loginAuthenticate } from "../store";

class LoginAuthForm extends React.Component {
  render() {
    const { name, displayName, handleSubmit, error } = this.props;
    return (
      <div id="login" className="component-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit} name={name} className="container">
          <div>
            <label htmlFor="email">
              <span>Email</span>
            </label>
            <input name="email" type="email" />
          </div>
          <div>
            <label htmlFor="password">
              <span>Password</span>
            </label>
            <input name="password" type="password" />
          </div>
          <div>
            <button type="submit" id="login-btn">
              {displayName}
            </button>
          </div>
          {error && error.response && (
            <div className="form-error-message">{error.response.data}</div>
          )}
        </form>
      </div>
    );
  }
}

const mapLogin = (state) => {
  return {
    name: "login",
    displayName: "Login",
    error: state.auth.error,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const email = evt.target.email.value;
      const password = evt.target.password.value;
      dispatch(loginAuthenticate(email, password, formName));
    },
  };
};

export const Login = connect(mapLogin, mapDispatch)(LoginAuthForm);
