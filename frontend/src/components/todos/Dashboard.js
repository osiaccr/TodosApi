import React, { Fragment } from "react";
import Form from "./From";
import Todos from "./Todos";
import Login from "../accounts/Login";

export default function Dashboard() {
  return (
    <Fragment>
      <Form />
      <Todos />
    </Fragment>
  );
}
