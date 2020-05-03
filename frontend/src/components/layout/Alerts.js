import React, { Component, Fragment } from "react";
import { withAlert } from "react-alert";
import { connect } from "react-redux";
import PropTypes from "prop-types";

export class Alerts extends Component {
  static propTypes = {
    error: PropTypes.object.isRequired,
    message: PropTypes.object.isRequired,
  };

  componentDidUpdate(prevProps) {
    const { error, alert, message } = this.props;
    if (error !== prevProps.error) {
      // Ignoring all authentification error, they should not be displayed
      if (error.status === 401) return;

      if (error.msg.message) {
        alert.error(`Message: ${error.msg.message.join()}`);
        return;
      }

      if (error.msg.non_field_errors) {
        alert.error(error.msg.non_field_errors);
        return;
      }

      // Displaying field error. Each field has a key
      // and the value for each key is the error
      if (Object.keys(error.msg)) {
        // Maping keys (request fields to display names)
        const mapKeyToName = (key) => {
          const map = {
            email: "Email",
            username: "Username",
            password: "Password",
            password1: "Password",
            password2: "Retyped password",
          };

          if (map[key]) return map[key];
          else return key;
        };

        Object.keys(error.msg).forEach((key) => {
          alert.error(`${mapKeyToName(key)}: ${error.msg[key].join(" ")}`);
        });
      }
    }

    if (message !== prevProps.message) {
      if (message.deleteTodo) alert.success(message.deleteTodo);
      if (message.addTodo) alert.success(message.addTodo);
    }
  }

  render() {
    return <Fragment />;
  }
}

const mapStateToProps = (state) => ({
  error: state.errors,
  message: state.messages,
});

export default connect(mapStateToProps)(withAlert()(Alerts));
