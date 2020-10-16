const mongoose = require("mongoose");

const DB_HOST_TEST = "localhost";
const DB_PORT_TEST = "27017";
const DB_DATABASE_TEST = "handyman-test";
const DB_HOST = "cluster-handy-booking-a.mzaot.mongodb.net";
const DB_USER = "handy";
const DB_PASSWORD = "nxBuslpT668dGuRH";
const DB_DATABASE = "test";
const NODE_ENV = "production";

exports.connectToDB = () => {


  let connectionString;
  if (NODE_ENV === "production") {
    connectionString = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_DATABASE}`;
  } else {
    connectionString = `mongodb://${DB_HOST_TEST}:${DB_PORT_TEST}/${DB_DATABASE_TEST}`;
  }

  // const connectionString = 'mongodb://localhost:27017/handyman-test';

  const db = mongoose.connection;
  db.on("connected", () => {
    console.log(`DB connected, ${connectionString}`);
  });
  db.on("error", (error) => {
    console.log("DB connection failed");
    console.error(error.message);
    process.exit(1);
  });
  db.on("disconnected", () => {
    console.log("mongoose connection is disconnected");
  });

  mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};