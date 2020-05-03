import React, { Component } from "react";
import { connect } from "react-redux";
import { addTodo } from "../../actions/todos";

import "../styles/InputformStyle.css";
import "../styles/General.css";

export class From extends Component {
  state = {
    title: "",
    text: "",
    isCompleted: false,
  };

  getColor = () => {
    if (this.state.isCompleted !== false) return "bg-success";
    else return "bg-warning";
  };

  toggleCheckbox = () => {
    this.setState({
      isCompleted: !this.state.isCompleted,
    });
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  onSubmit = (e) => {
    e.preventDefault();
    const { text, title, isCompleted } = this.state;
    const todo = { title, text, isCompleted };
    this.props.addTodo(todo);
    this.setState({
      title: "",
      text: "",
    });
  };

  render() {
    return (
      <form onSubmit={this.onSubmit} autoComplete="off">
        <div className={"card text-white formCard " + this.getColor()}>
          <div className="card-body">
            <div className="card-title">
              <div className="d-flex justify-content-between">
                <input
                  type="text"
                  name="title"
                  placeholder="Title..."
                  onChange={this.onChange}
                  value={this.state.title}
                />
              </div>
            </div>
            <div className="card-text">
              <textarea
                type="text"
                name="text"
                placeholder="Content..."
                onChange={this.onChange}
                value={this.state.text}
              ></textarea>
            </div>
          </div>
          <div className="card-footer d-flex justify-content-between">
            <div className="custom-control custom-switch">
              <input
                type="checkbox"
                className="custom-control-input"
                id="isCompleted"
                name="isCompleted"
                checked={this.state.isCompleted}
                onChange={this.toggleCheckbox}
              />
              <label className="custom-control-label" htmlFor="isCompleted">
                Is it completed
              </label>
            </div>
            <button type="submit" className="btn btn-primary btn-sm">
              Add
            </button>
          </div>
        </div>
      </form>
    );
  }
}

export default connect(null, { addTodo })(From);
