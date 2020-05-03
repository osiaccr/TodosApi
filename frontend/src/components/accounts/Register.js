import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { register } from "../../actions/auth";
import PropTypes from "prop-types";

import "../styles/General.css";

class Register extends Component {
  state = {
    username: "",
    email: "",
    password1: "",
    password2: "",
  };

  static propTypes = {
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.register({ ...this.state });
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/" />;
    }
    const { email, username, password1, password2 } = this.state;
    return (
      <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12 m-auto pb-2 pt-2">
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              onChange={this.onChange}
              value={email}
            />
            <small id="emailHelp" className="form-text text-muted">
              We will never share your email with anyone.
            </small>
          </div>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="username"
              className="form-control"
              id="username"
              name="username"
              placeholder="Enter username"
              onChange={this.onChange}
              value={username}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password1">Password</label>
            <input
              type="password"
              className="form-control"
              id="password1"
              name="password1"
              placeholder="Password"
              onChange={this.onChange}
              value={password1}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password2">Retype pass</label>
            <input
              type="password"
              className="form-control"
              id="password2"
              name="password2"
              placeholder="Retype password"
              onChange={this.onChange}
              value={password2}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Register
          </button>
          <p>
            Already have an account? <Link to="/login">Log in!</Link>
          </p>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { register })(Register);
