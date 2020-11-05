require("dotenv").config();
require("express-async-errors");

const PORT = process.env.PORT || 3000;
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
    exposedHeaders: "Authorization",
  })
);
app.use(bodyParser.json());

app.use("/api", routes);

app.use(errorHandler);

connectToDB();

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
