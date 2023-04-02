const express = require("express");
const morgan = require("morgan");
const app = express();

//import handlers here
const { getProfile } = require("./handlers");

const PORT = 8000;

//Endpoints --- Handlers ---

//   .get("/api/getprofile", getProfile)

//Catch

//listening on port

app.listen(PORT, () => {
  console.info("Listening on port 8000");
});
