"use strict";

const express = require("express");
const morgan = require("morgan");

const PORT = 8000;

//import handlers here
const {
  getClients,
  getUser,
  updateUser,
  addUser,
  addSeller,
  getOneClient,
  addItem,
  editItem,
  deleteItem,
  getItems,
  getOneItem,
  getOneItemOnly,
  addDogInfo,
  getOneDogInfo,
  getDogInfo,
  editDogInfo,
  submitPayment,
} = require("./handlers");

express()
  .use(morgan("tiny"))
  .use(express.json())
  .use(express.static("public"))

  //endpoints

  .get("/getclients", getClients)

  // Adds a new user when they register (Used in SignUpClient.js)
  .post("/registrationClient", addUser)

  // Adds a new seller when they register (Used in SignUpSeller.js)
  .post("/registrationSeller", addSeller)

  // Returns the client who is trying to login (Used in Login.js)
  .post("/getOneClient", getOneClient)

  // Returns a single registered user by using their email (Used in UserContext.js)
  .get("/getUser/:email", getUser)

  // Updates user info
  .put("/updateUser/:_id", updateUser)

  //Creates a new item for the seller to add to their items for sale
  .post("/addSellerItem", addItem)

  //update seller item
  .put("/editSellerItem/:_id", editItem)

  //delete seller item
  .delete("/deleteSellerItem/:_id", deleteItem)

  //Returns all items for sale used in homepageClient and homepageSeller
  .get("/getItems", getItems)

  //Returns  items of 1 specific user
  .get("/getOneItem/:userId", getOneItem)

  //Returns 1 specific item
  .get("/getOneItemOnly/:_id", getOneItemOnly)

  //Created a dog info page
  .post("/addDogInformation", addDogInfo)

  //Returns all dog information. Used in HomepageClient.js
  .get("/getDogInformation/:_id", getOneDogInfo)

  //Returns all dog info
  .get("/getDogInformation", getDogInfo)

  .put("/editDogInformation/:_id", editDogInfo)

  .post("/submitPayment", submitPayment)

  //Catch

  //listening on port

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));
