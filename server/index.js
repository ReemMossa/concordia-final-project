"use strict";

const express = require("express");
const morgan = require("morgan");

const PORT = 8000;

//import handlers here
const {
  getClients,
  getClient,
  addClient,
  getOneClient,
} = require("./handlers");

express()
  .use(morgan("tiny"))
  .use(express.json())
  .use(express.static("public"))

  //endpoints

  .get("/getclients", getClients)
  .get("getclient", getClient)
  .post("/registration", addClient)
  .post("/getOneCustomer", getOneClient)

  //Catch

  //listening on port

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));
