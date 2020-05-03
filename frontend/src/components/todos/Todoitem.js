import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteTodo, updateTodo } from "../../actions/todos";
import PropTypes from "prop-types";

import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

import "../styles/DropdownStyle.css";
import "../styles/Todo.css";

export class Todoitem extends Component {
  static propTypes = {
    deleteTodo: PropTypes.func.isRequired,
    updateTodo: PropTypes.func.isRequired,
    todo: PropTypes.object.isRequired,
  };

  getColor = () => {
    if (this.props.todo.isCompleted !== false) return "bg-success";
    else return "bg-warning";
  };

  getVariant = () => {
    if (this.props.todo.isCompleted === true) return "success";
    else return "warning";
  };

  getCompletedUncopletedText = () => {
    if (this.props.todo.isCompleted !== false) return "Mark Uncompleted";
    else return "Mark Completed";
  };

  render() {
    return (
      <div className={"card todoItem " + this.getColor()}>
        <div className="card-body">
          <div className="card-title">
            <div className="d-flex justify-content-between">
              <h5 className="todoText">{this.props.todo.title}</h5>
              <DropdownButton
                size="sm"
                variant={this.getVariant()}
                title="Options"
                id={`dropdown-button-drop-${this.props.todo.id}`}
                key={this.props.todo.id}
                className="ml-2"
              >
                <Dropdown.Item
                  onClick={() =>
                    this.props.updateTodo({
                      ...this.props.todo,
                      isCompleted: !this.props.todo.isCompleted,
                    })
                  }
                >
                  {this.getCompletedUncopletedText()}
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() =>
                    this.props.deleteTodo({
                      ...this.props.todo,
                    })
                  }
                >
                  Delete
                </Dropdown.Item>
              </DropdownButton>
            </div>
          </div>
          <p className="card-text todoText">{this.props.todo.text}</p>
        </div>
        <div className="card-footer">
          <small className="text-muted">
            Created on {this.props.todo.dateCreated}
          </small>
        </div>
      </div>
    );
  }
}

export default connect(null, { updateTodo, deleteTodo })(Todoitem);
