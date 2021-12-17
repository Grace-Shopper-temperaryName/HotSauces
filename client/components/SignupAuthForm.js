import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { signupAuthenticate } from "../store";
import { Grid, Paper, Avatar } from "@material-ui/core";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";

const SignupAuthForm = (props) => {
  const { name, displayName, handleSubmit, error } = props;
  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: 280,
    margin: "20px auto",
  };
  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Avatar style={avatar}>
          <DeviceThermostatIcon />
        </Avatar>
        <div className="signUp">
          <form onSubmit={handleSubmit} name={name}>
            <div>
              <label htmlFor="firstName">
                <small>First Name</small>
              </label>
              <input name="firstName" type="text" />
            </div>
            <div>
              <label htmlFor="lastName">
                <small>Last Name</small>
              </label>
              <input name="lastName" type="text" />
            </div>
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
            <Link to="/login">
              <h4>Already have an account? Login here!</h4>
            </Link>
            {error && error.response && <div> {error.response.data} </div>}
          </form>
        </div>
      </Paper>
    </Grid>
  );
};

const mapSignup = (state) => {
  return {
    name: "signup",
    displayName: "Sign Up",
    error: state.auth.error,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const firstName = evt.target.firstName.value;
      const lastName = evt.target.lastName.value;
      const email = evt.target.email.value;
      const password = evt.target.password.value;
      dispatch(
        signupAuthenticate(firstName, lastName, email, password, formName)
      );
    },
  };
};

export const Signup = connect(mapSignup, mapDispatch)(SignupAuthForm);
