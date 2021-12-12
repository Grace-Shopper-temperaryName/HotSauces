import { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

/*
loggedIn customer info: populated form for delivery address, payment info,
guest customer: blank form for delivery address, payment info
render cart component
purchase/place order button - onSubmit/handleSubmit...
*/

export class Checkout extends Component {}

const mapState = () => {};
const mapDispatch = () => {};

export default connect(mapState, mapDispatch)(Checkout);
