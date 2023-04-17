"use strict";

const express = require("express");
const morgan = require("morgan");

const PORT = 8000;

//import handlers here
const {
  getClients,
  getClient,
  addClient,
  addSeller,
  getOneClient,
  addItem,
  updateItem,
  getItems,
  addDogInfo,
} = require("./handlers");

express()
  .use(morgan("tiny"))
  .use(express.json())
  .use(express.static("public"))

  //endpoints

  .get("/getclients", getClients)

  // Adds a new client when they register (Used in SignUpClient.js)
  .post("/registrationClient", addClient)

  // Adds a new seller when they register (Used in SignUpSeller.js)
  .post("/registrationSeller", addSeller)

  // Returns the client who is trying to login (Used in Login.js)
  .post("/getOneClient", getOneClient)

  // Returns a single registered client by using their email (Used in UserContext.js)
  .get("/getclient/:email", getClient)

  //Creates a new item for the seller to add to their items for sale
  .post("/addSellerItem", addItem)

  //update seller item
  .patch("/updateSellerItem/:_id", updateItem)

  //Returns all items for sale used in homepageClient and homepageSeller
  .get("/getItems", getItems)

  //Returns all items for sale used in homepageClient and homepageSeller
  .post("/addDogInformation", addDogInfo)

  //Catch

  //listening on port

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));
