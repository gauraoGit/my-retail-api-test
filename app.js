const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Product = require("./models/product");
const logger = require("./logging/logger");
const env = require("./config/environment");
const productRouter = require("./routes/productRouter")(Product, logger);

const app = express();

mongoose.connect(env.mongodbUri, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/api", productRouter);

app.listen(env.port, async () => {});
