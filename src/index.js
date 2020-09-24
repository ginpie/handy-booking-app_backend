require("dotenv").config();
require("express-async-errors");
const express = require("express");

const app = express();
const routes = require("./routes");
const { connectToDB } = require("./utils/db");
const errorHandler = require("./middleware/errorHandler");

app.use(express.json());

app.use("/api", routes);

app.use(errorHandler);
const PORT = process.env.PORT || 3000;
connectToDB();
app.listen(PORT, () => {
  console.log("listening on port 3000");
});
