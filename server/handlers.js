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

module.exports = {
  getClients,
};
