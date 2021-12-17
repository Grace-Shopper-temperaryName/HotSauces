import React from "react";
import { connect } from "react-redux";
import { loginAuthenticate } from "../store";
import { Grid, Paper, Avatar } from "@material-ui/core";

/**
 * COMPONENT
 */
const LoginAuthForm = (props) => {
  const { name, displayName, handleSubmit, error } = props;
  const paperStyle = {
    padding: 40,
    height: "20vh",
    width: 500,
    margin: "20px auto",
  };

  return (
    <Grid>
      <Paper elevation={15} style={paperStyle}>
        <div>
          <form onSubmit={handleSubmit} name={name}>
            <div>
              <label htmlFor="email">
                <small>Email</small>
              </label>
              <input name="email" type="email" />
            </div>
            <div>
              <label htmlFor="password">
                <small>Password</small>
              </label>
              <input name="password" type="password" />
            </div>
            <div>
              <button type="submit">{displayName}</button>
            </div>
            {error && error.response && <div> {error.response.data} </div>}
          </form>
        </div>
      </Paper>
    </Grid>
  );
};

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
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
