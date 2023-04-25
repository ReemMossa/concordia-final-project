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

const getUser = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  await client.connect();

  const { email } = req.params;

  const db = await client.db("finalproject");

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
    client.close();
  }
};

const updateUser = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const { _id } = req.params;

  try {
    await client.connect();
    const db = client.db("finalproject");
    const result = await db.collection("users").findOne({ _id });
    if (!result) {
      return res.status(404).json({
        status: 404,
        data: req.body,
        message: "Sorry, we can't seem to find this user.",
      });
    }

    if (result) {
      const updateUser = await db
        .collection("users")
        .updateOne({ _id }, { $set: req.body });
      res.status(200).json({
        status: 200,
        data: updateUser,
        message: "User successfully modified",
      });
    }

    client.close();
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
};

const addUser = async (req, res) => {
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
    const {
      userId,
      dishName,
      description,
      price,
      size,
      imageUrl,
      ingredients,
    } = req.body;

    const checkedIngredients = {
      protein: ingredients.protein,
      organs: ingredients.organs,
      nutsAndSeeds: ingredients.nutsAndSeeds,
      other: ingredients.other,
    };

    const updatedIngredients = { ...ingredients, ...checkedIngredients };

    const item = {
      _id: uuidv4(),
      userId,
      dishName,
      description,
      price,
      size,
      imageUrl,
      ingredients: updatedIngredients,
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

// updates a specified seller item
const editItem = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const { _id } = req.body;

  try {
    await client.connect();
    const db = client.db("finalproject");

    const result = await db.collection("selleritems").findOne({ _id });

    if (!result) {
      return res.status(404).json({
        status: 404,
        data: req.body,
        message: "Sorry, we can't seem to find this item.",
      });
    }

    if (result) {
      const updateOldItem = await db
        .collection("selleritems")
        .updateOne({ _id }, { $set: req.body });
      res.status(200).json({
        status: 200,
        data: updateOldItem,
        message: "Item successfully modified",
      });
    }

    client.close();
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
};

// deletes a specified item
const deleteItem = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const { _id } = req.params;
  console.log("id", _id);
  try {
    await client.connect();
    const db = client.db("finalproject");

    const findOldItem = await db
      .collection("selleritems")
      .findOneAndDelete({ _id });

    console.log("findolditem", findOldItem);

    if (findOldItem.value === null) {
      res.status(404).json({
        status: 404,
        message: "This item was already deleted. Unable to delete this item.",
      });
      return;
    }

    client.close();
    res.status(200).json({
      status: 200,
      message: "Item successfully deleted",
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};

const getItems = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("finalproject");
    const result = await db.collection("selleritems").find().toArray();

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

const getOneItem = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const { userId } = req.params;
  try {
    await client.connect();
    const db = client.db("finalproject");
    const result = await db
      .collection("selleritems")
      .find({ userId })
      .toArray();
    result.length > 0
      ? res.status(200).json({ status: 200, data: result })
      : res
          .status(404)
          .json({ status: 404, message: "Seller items not found" });
    console.log("result", result);
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  } finally {
    client.close();
  }
};

const getOneItemOnly = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const { _id } = req.params;
  try {
    await client.connect();
    const db = client.db("finalproject");
    const result = await db.collection("selleritems").find({ _id }).toArray();
    result.length > 0
      ? res.status(200).json({ status: 200, data: result })
      : res.status(404).json({ status: 404, message: "Item not found" });
    console.log("result", result);
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  } finally {
    client.close();
  }
};

const addDogInfo = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const _id = uuidv4();
  try {
    await client.connect();
    const db = client.db("finalproject");
    const { _id, dogWeight, dogAge, ingredients } = req.body;

    const checkedIngredients = {
      protein: ingredients.protein,
      organs: ingredients.organs,
      nutsAndSeeds: ingredients.nutsAndSeeds,
      other: ingredients.other,
    };

    const updatedIngredients = { ...ingredients, ...checkedIngredients };

    const item = {
      _id,
      dogWeight,
      dogAge,
      ingredients: updatedIngredients,
    };

    const result = await db.collection("doginfo").insertOne(item);
    res.status(200).json({
      status: 200,
      data: item,
      message: "Info successfully added to your page",
    });
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  } finally {
    client.close();
  }
};

const getOneDogInfo = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const { _id } = req.params;
  try {
    await client.connect();
    const db = client.db("finalproject");
    const result = await db.collection("doginfo").findOne({ _id });
    result
      ? res.status(200).json({ status: 200, data: result })
      : res
          .status(404)
          .json({ status: 404, message: "Dog information not found" });
    console.log("result", result);
    client.close();
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
};

const getDogInfo = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("finalproject");
    const result = await db.collection("doginfo").find().toArray();

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

// updates a specified dog info
const editDogInfo = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const { _id } = req.body;

  try {
    await client.connect();
    const db = client.db("finalproject");

    const result = await db.collection("doginfo").findOne({ _id });

    if (!result) {
      return res.status(404).json({
        status: 404,
        data: req.body,
        message: "Sorry, we can't seem to find this item.",
      });
    }

    if (result) {
      const updateOldItem = await db
        .collection("doginfo")
        .updateOne({ _id }, { $set: req.body });
      res.status(200).json({
        status: 200,
        data: updateOldItem,
        message: "Item successfully modified",
      });
    }

    client.close();
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
};

module.exports = {
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
};

// ingredients.values().flatten().join(", ")
