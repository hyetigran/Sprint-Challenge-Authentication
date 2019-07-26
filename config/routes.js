/* eslint-disable no-console */
const axios = require("axios");
const bcrypt = require("bcryptjs");
const { authenticate } = require("../auth/authenticate");
const { jwtSecret } = require("../.env");
const jwt = require("jsonwebtoken");
const { findBy, add } = require("../models/users-model");

module.exports = server => {
  server.post("/api/register", register);
  server.post("/api/login", login);
  server.get("/api/jokes", authenticate, getJokes);
};

const register = async (req, res) => {
  try {
    const user = req.body;
    console.log(user);
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
};

async function login(req, res) {
  try {
    const { username, password } = req.body;
    const userExists = await findBy({ username });
    if (userExists && bcrypt.compareSync(password, userExists.password)) {
      const token = generateToken(userExists);
      res
        .set({ "Set-Cookie": `token=${token}` })
        .status(200)
        .json({ user: userExists, token });
    } else {
      res.status(404).json({
        message: "User with the username already exists"
      });
    }
  } catch (error) {
    res.status(500).json({
      error: "Internal server error"
    });
  }
}

const generateToken = user => {
  const payload = {
    sub: user.id,
    username: user.username
  };
  const options = {
    expiresIn: "1d"
  };
  return jwt.sign(payload, jwtSecret, options);
};

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
