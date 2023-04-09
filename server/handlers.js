"use strict";
const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

// package to generate unique ids
const { v4: uuidv4 } = require("uuid");

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getClients = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("finalproject");
    const result = await db.collection("users").find().toArray();
    console.log("db", db);
    if (result) {
      return res.status(201).json({ status: 201, data: result });
    }
  } catch (error) {
    return res
      .status(404)
      .json({ status: 404, success: false, message: error });
  } finally {
    client.close();
  }
};

const getClient = async (req, res) => {
  // creates a new client
  const client = new MongoClient(MONGO_URI, options);

  // connect to the client
  await client.connect();

  const { _id } = req.params;

  // connect to the database
  const db = await client.db("finalproject");

  // access a collection called "customers"
  const clientsCollection = db.collection("users");

  try {
    const result = await clientsCollection.findOne({ _id });

    if (result) {
      return res
        .status(200)
        .json({ status: 200, message: "Found customer", data: result });
    }
  } catch (error) {
    return res
      .status(404)
      .json({ status: 404, success: false, message: error });
  } finally {
    // close the connection to the database server
    client.close();
  }
};


const addClient = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("finalproject");
    const usersCollection = await db.collection("users");

    const _id = uuidv4();
    const { ...data } = req.body;
    const requestBody = { _id, ...data };
    const result = await usersCollection.insertOne(requestBody);

    if (result.acknowledged) {
      // On success/no error, send
      return res.status(201).json({
        status: 201,
        success: true,
        message: "A new customer was successfully created",
        data: req.body,
      });
    }

    return res.status(500).json({
      status: 500,
      success: false,
      message: "Could not register the customer",
    });
  } catch (error) {
    return res
      .status(404)
      .json({ status: 404, success: false, message: error });
  } finally {
    // close the connection to the database server
    client.close();
  }
};

const getOneClient = async (req,res) => {
  const client = new MongoClient(MONGO_URI, options);
  const {email, password} =req.body;

  
    await client.connect();
    const db = await client.db("finalproject");
    const result = await db.collection("users").findOne({
      email:email,
      password:password,
    });
    if (!result) {
      return res.status(404).json({
        status:404, "message: Opps! Username not found",
      });
    }
  
    delete result.password;

  client.close();

  return res.status(200).json({ status: 200, data: result });
  
};

module.exports = {
  getClients,
  getClient,
  addClient,
  getOneClient,
};
