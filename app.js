require('dotenv').config();
require('express-async-errors');

// async error

const express = require('express');
const app = express();

const connectDB = require('./db/connect');
const productRouter = require('./routes/products');

const errorHandlerMiddleware = require('./middleware/error-handler');
const notFound = require('./middleware/not-found');

//middleware
app.use(express.json());

//route
app.use('/api/v1/products', productRouter);

app.get('/', (req, res) => {
  res.send('<h1>STORE API</h1><a href = "/api/v1/products">product route</a>');
});

// product route

app.use(notFound);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 8000;

const start = async (port) => {
  try {
    //connect DB
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`listening to PORT : ${port} `);
    });
  } catch (error) {
    console.log(error);
  }
};

start(port);
