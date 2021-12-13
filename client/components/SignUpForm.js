// import React from "react";
// import { connect } from "react-redux";
// import { createYourSingleCustomer } from "../store/singleCustomer";
// import { Link } from "react-router-dom";

// export class CreateNewCustomer extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       firstName: "",
//       lastName: "",
//       email: "",
//       password: "",
//     };
//     this.handleChange = this.handleChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }
//   handleChange(event) {
//     this.setState({ [event.target.name]: event.target.value });
//   }
//   handleSubmit(event) {
//     event.preventDefault();
//     this.props.post({ ...this.state });
//   }
//   render() {
//     const { firstName, lastName, email, password } = this.state;
//     return (
//       <div id="signupform">
//         <h2>Sign Up </h2>

//         <form onSubmit={this.handleSubmit}>
//           <label htmlFor="firstName"> First Name: </label>
//           <input
//             name="firstName"
//             onChange={this.handleChange}
//             value={firstName}
//           />
//           <label htmlFor="lastName"> Last Name: </label>
//           <input
//             name="lastName"
//             onChange={this.handleChange}
//             value={lastName}
//           />
//           <label htmlFor="email"> Email: </label>
//           <input name="email" onChange={this.handleChange} value={email} />
//           <label htmlFor="password">Password: </label>
//           <input
//             name="password"
//             onChange={this.handleChange}
//             value={password}
//           />

//           <button id="signupform" type="submit">
//             Sign Up!
//           </button>
//         </form>
<Link to="/login">Already Registered , Sign In Here </Link>;
//       </div>
//     );
//   }
// }

// const mapDispatch = (dispatch) => ({
//   post: (customer) => dispatch(createYourSingleCustomer(customer)),
// });

// export default connect(null, mapDispatch)(CreateNewCustomer);
