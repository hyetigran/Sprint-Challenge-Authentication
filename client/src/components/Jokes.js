import React, { Component } from "react";
import axios from "axios";
import Joke from "./Joke";
import { URL } from "../utility";

class Jokes extends Component {
  state = {
    jokes: []
  };
  componentDidMount() {
    const token = localStorage.getItem("token");
    if (!token) {
      this.props.history.push("/");
    } else {
      axios
        .get(`${URL}/jokes`, {
          headers: {
            Authorization: token
          }
        })
        .then(res => {
          this.setState({ jokes: res.data });
        });
    }
  }
  render() {
    return (
      <div>
        <p>Welcome To Jokes {localStorage.getItem("username")}</p>
        <ol>
          {this.state.jokes.map(joke => {
            return <Joke key={joke.id} joke={joke} />;
          })}
        </ol>
      </div>
    );
  }
}

export default Jokes;
