require('dotenv').config();
const express = require('express');



const app = express();
const routes = require('./routes');
const { connectToDB } = require('./utils/db');
const errorHandler = require('./middleware/errorHandler');


app.use(express.json());

app.use('/api', routes);

app.use(errorHandler);

connectToDB();
app.listen(3000, () => {
  console.log('listening on port 3000');
});
