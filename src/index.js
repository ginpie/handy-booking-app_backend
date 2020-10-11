require("dotenv").config();
require("express-async-errors");

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { connectToDB } = require("./utils/db");
const errorHandler = require("./middleware/errorHandler");
const app = express();
const routes = require("./routes");
app.use(express.json());

app.use(
  cors({
    exposedHeaders: "X-Auth-Token",
  })
);
app.use(bodyParser.json());

app.use("/api", routes);

app.use(errorHandler);
const PORT = process.env.PORT || 3000;
connectToDB();

app.listen(PORT, () => {
  console.log("listening on port 3000");
});
