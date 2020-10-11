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

app.use(cors());
app.use(bodyParser.json());

app.use("/api", routes);

app.use(errorHandler);
const PORT = process.env.PORT || 3000;
connectToDB();

// const signIn = (req, res, next) => {
//   const { email, password } = req.body;
//   if (!email || !password) {
//     next(Boom.badData());
//     return;
//   }
//   const user = user.findOne({ email });
//   if (!user) {
//     next(Boom.notFound());
//     return;
//   }
//   bcrypt.compare(password, user.password).then((result) => {
//     if (!result) {
//       next(Boom.notFound());
//       return;
//     }
//   });
// };
app.listen(PORT, () => {
  console.log("listening on port 3000");
});
