const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");

const configureRoutes = require("../config/routes.js");

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(cookieParser());

configureRoutes(server);

server.get("/", (req, res) => {
  res.status(200).json({
    message: "Last Sprint!"
  });
});

module.exports = server;
