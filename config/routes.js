const axios = require("axios");
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { authenticate } = require("../auth/authenticate");

module.exports = server => {
  server.post("/api/register", register);
  server.post("/api/login", login);
  server.get("/api/jokes", authenticate, getJokes);
};

async function register(req, res) {
  try {
    const user = req.body;
    const { username } = req.body;
    user.password = bcrypt.hashSync(user.password, 12);
    const userExists = await findBy({ username });
    if (userExists) {
      res.status(409).json({
        message: "User already exists"
      });
    } else {
      const successfulRegister = await add(user);
      res.status(201).json({ successfulRegister });
    }
  } catch (err) {
    res.status(500).json({
      error: "Internal error, please try again later"
    });
  }
}

function login(req, res) {
  // implement user login
}

function getJokes(req, res) {
  const requestOptions = {
    headers: { accept: "application/json" }
  };

  axios
    .get("https://icanhazdadjoke.com/search", requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: "Error Fetching Jokes", error: err });
    });
}
