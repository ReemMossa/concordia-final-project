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

const getUsers = async (req, res) => {
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
  const { firstName, lastName, address, dogName, email, password } = req.body;

  if (!firstName || !lastName | !address || !dogName || !email || !password) {
    return res.status(404).json({
      status: 404,
      data: req.body,
      message: "Missing information. Please fill out all fields.",
    });
  }

  //encrypt password
  const hashedPassword = await bcrypt.hash(password, 10);

  const requestBody = {
    firstName,
    lastName,
    address,
    dogName,
    email,
    password: hashedPassword,
  };

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
        .updateOne({ _id }, { $set: requestBody });
      res.status(200).json({
        status: 200,
        data: requestBody,
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
    //const match = true;
    const match = await bcrypt.compare(password, result.password);
    if (match) {
      return res.status(200).json({
        status: 200,
        data: result,
      });
    } else {
      return res.status(404).json({
        status: 404,
        message: "Oops! Incorrect username or password.",
      });
    }
  }
};

const getSellerInfo = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const { userId } = req.params;

  await client.connect();
  const db = client.db("finalproject");
  const sellerItem = db.collection("users");
  try {
    const result = await sellerItem.findOne({ userId });
    if (result) {
      return res.status(200).json({
        status: 200,
        message: "Here is the seller's information",
        data: result,
      });
    }
  } catch (error) {
    return res
      .status(404)
      .json({ status: 404, success: false, message: error });
  } finally {
    client.close();
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
      status,
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
      status,
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
  const { _id } = req.params;
  const { status, ...rest } = req.body;
  const updatedItem = {
    ...rest,
    status: status === "sold" ? "sold" : "pending",
  };

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
        .updateOne({ _id }, { $set: updatedItem });
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

const submitPayment = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("finalproject");

    const {
      userId,
      firstName,
      lastName,
      email,
      phoneNumber,
      shippingAddress,
      cardNumber,
      expirationDate,
      cvv,
      totalPrice,
    } = req.body;

    if (
      !userId ||
      !firstName ||
      !lastName ||
      !email ||
      !phoneNumber ||
      !shippingAddress ||
      !cardNumber ||
      cardNumber.length !== 19 ||
      !cvv || // make sure cvv is not empty
      cvv.length !== 3 // make sure cvv has exactly 3 digits
    ) {
      return res.status(400).json({
        status: 400,
        data: req.body,
        message:
          "Missing information or invalid credit card information. Please fill out all required fields.",
      });
    }

    const order = {
      _id: uuidv4(),
      userId,
      firstName,
      lastName,
      email,
      phoneNumber,
      shippingAddress,
      cardNumber,
      expirationDate,
      cvv,
      dateOrdered: new Date(),
      totalPrice,
    };

    const result = await db.collection("orders").insertOne(order);

    res.status(200).json({
      status: 200,
      data: order,
      message: "Order successfully added to your page",
    });
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  } finally {
    client.close();
  }
};

const getOrder = async (req, res) => {
  const { _id } = req.params;
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();

    const db = client.db("finalproject");

    const result = await db.collection("orders").findOne({ _id });
    result
      ? res.status(200).json({ status: 200, data: result })
      : res.status(404).json({ status: 404, message: "Order Not Found" });

    client.close();
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
};

module.exports = {
  getUsers,
  getUser,
  updateUser,
  addUser,
  addSeller,
  getOneClient,
  getSellerInfo,
  addItem,
  editItem,
  deleteItem,
  getItems,
  getOneItem,
  getOneItemOnly,

  submitPayment,
  getOrder,
};

// ingredients.values().flatten().join(", ")
