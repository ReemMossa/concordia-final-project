"use strict";
const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const bcrypt = require("bcrypt");

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
      return res.status(200).json({ status: 200, data: result });
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

  const { email } = req.params;

  // connect to the database
  const db = await client.db("finalproject");

  // access a collection called "customers"
  const clientsCollection = db.collection("users");

  try {
    const result = await clientsCollection.findOne({ email });

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

    const { firstName, lastName, address, dogName, email, password, type } =
      req.body;

    //encrypt password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Determine the user type based on the endpoint the request was made to
    const userType = req.originalUrl.includes("Client") ? "client" : "seller";

    const requestBody = {
      _id: _id,
      firstName,
      lastName,
      address,
      dogName,
      email,
      password: hashedPassword,
      type: userType,
    };

    const result = await usersCollection.insertOne(requestBody);

    if (result.acknowledged) {
      // On success/no error, send
      return res.status(200).json({
        status: 200,
        success: true,
        message: `A new ${userType} was successfully created`,
        data: req.body,
      });
    }
    console.log("result", result);
    return res.status(500).json({
      status: 500,
      success: false,
      message: `Could not register the ${userType}`,
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

const addSeller = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("finalproject");
    const usersCollection = await db.collection("users");

    const _id = uuidv4();

    const { firstName, lastName, address, dogName, email, password, type } =
      req.body;

    //encrypt password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Determine the user type based on the endpoint the request was made to
    const userType = req.originalUrl.includes("Client") ? "client" : "seller";

    const requestBody = {
      _id: _id,
      firstName,
      lastName,
      address,
      dogName,
      email,
      password: hashedPassword,
      type: userType,
    };

    const result = await usersCollection.insertOne(requestBody);

    if (result.acknowledged) {
      // On success/no error, send
      return res.status(200).json({
        status: 200,
        success: true,
        message: `A new ${userType} was successfully created`,
        data: req.body,
      });
    }

    return res.status(500).json({
      status: 500,
      success: false,
      message: `Could not register the ${userType}`,
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

const getOneClient = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const { email, password } = req.body;
  const bcrypt = require("bcrypt");

  await client.connect();
  const db = await client.db("finalproject");
  const result = await db.collection("users").findOne({
    email: email,
  });

  if (!result) {
    return res.status(404).json({
      status: 404,
      message: "Oops! Incorrect username or password.",
    });
  } else {
    const match = await bcrypt.compare(password, result.password);
    if (match) {
      return res.status(200).json({
        status: 200,
        data: result,
      });
    } else {
      return res.status(404).json({
        status: 404,
        message: "Wrong password",
      });
    }
  }
};

const addItem = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("finalproject");
    const { adTitle, description } = req.body;
    const _id = uuidv4();
    const item = {
      _id: _id,
      adTitle,
      description,
    };

    const result = await db.collection("selleritems").insertOne(item);
    res.status(200).json({
      status: 200,
      data: item,
      message: "Item successfully added to your page",
    });
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  } finally {
    client.close();
  }
};

module.exports = {
  getClients,
  getClient,
  addClient,
  addSeller,
  getOneClient,
  addItem,
};
