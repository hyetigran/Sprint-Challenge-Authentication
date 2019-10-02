import React, { Component } from "react";
import axios from "axios";
import Form from "./Form";
import { URL } from "../utility";

class Register extends Component {
  handleSubmit = data => {
    axios
      .post(`${URL}/register`, data)
      .then(res => {
        console.log(res);
        localStorage.setItem("username", res.data.successfulRegister.username);
        this.props.history.push("/");
      })
      .catch(err => {
        console.log(err);
      });
  };
  render() {
    return (
      <div>
        <Form btnType="Sign up" handleSubmit={this.handleSubmit} />
      </div>
    );
  }
}

export default Register;
