import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PorpTypes from "prop-types";
import { getTodos } from "../../actions/todos";

import Todoitem from "./Todoitem";

import "../styles/Todo.css";

export class Todos extends Component {
  componentDidMount() {
    this.props.getTodos();
  }

  render() {
    return (
      <div className="todoContainer">
        {this.props.todos.map((todo) => (
          <Todoitem key={todo.id} todo={todo} />
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  todos: state.todos.todos,
});

export default connect(mapStateToProps, { getTodos })(Todos);
