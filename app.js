const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const fs = require("fs");
const morgan = require("morgan");
const path = require("path");

const Product = require("./models/product");
const env = require("./config/environment");
const productRouter = require("./routes/productRouter")(Product);

const app = express();

const db = mongoose.connect(env.mongodbUri, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

//Http Response logs for error responses
// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "a" }
);

// setup the logger
app.use(morgan("combined", { stream: accessLogStream }));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Hook all routes
app.use("/api", productRouter);


//error handler
app.use(function(err, req, res, next) {
  //Set locals only providing errors in development env
  res.locals.message = err.message;
  res.locals.error = err;

  res.status(res.statusCode || 500);
  res.send();
});

app.listen(env.port, async () => {});
