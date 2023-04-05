"use strict";

const express = require("express");
const morgan = require("morgan");

const PORT = 8000;

//import handlers here
const { getClients } = require("./handlers");

express()
  .use(morgan("tiny"))
  .use(express.json())
  .use(express.static("public"))

  //endpoints

  .get("/getclients", getClients)

  //Catch

  //listening on port

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));
