import React, { Component } from "react";
import axios from "axios";
import Form from "./Form";
import { URL } from "../utility";

class Login extends Component {
  handleSubmit = credentials => {
    axios
      .post(`${URL}/login`, credentials)
      .then(async res => {
        await localStorage.setItem("token", res.data.token);
        await localStorage.setItem("username", res.data.user.username);
        this.props.history.push("/jokes");
      })
      .catch(err => {
        console.log(err);
      });
  };
  render() {
    return (
      <>
        <Form btnType="Login" handleSubmit={this.handleSubmit} />
      </>
    );
  }
}
export default Login;
