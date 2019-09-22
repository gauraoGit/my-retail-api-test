const async = require("async");
const request = require("request");
const env = require("../config/environment");
const validator = require('../models/validator');

function productsController(Product) {
  function get(req, res) {
    if(!req.product)
    {
      res.status(404)
      return res.send('No content found');
    }
    return res.json(req.product);
  }

  function getAll(req, res) {
    Product.find((err, products) => {
      if (err) return res.send(err);
      return res.json(products);
    });
  }

  function getExternalApiData(req, res) {
    async.parallel(
      {
        externalProduct: function(callback) {
          request(env.externalApi(req.params.id), function(
            error,
            response,
            body
          ) {
            if (!error && response.statusCode == 200) {
              callback(null, body);
            } else {
              callback(true, {});
            }
          });
        }
      },
      function(err, results) {
        //If error return error
        if (err) return res.send(err);
        //Parse raw data to json
        const data = JSON.parse(results.externalProduct);
        if (data.product) {
          //If current product is not present in data store
          //get it from external api
          const product = {
            id: req.product ? req.product._id : data.product.item.tcin,
            current_price: req.product
              ? req.product.current_price
              : //Hardcoded to usd since not sure where its provided in redsky api
                {
                  value: data.product.price.listPrice.price,
                  currency_code: "USD"
                },
            name: data.product.item.product_description.title
          };
          //Since current product is no available in data store but available in external api
          //hence save in data store
          if (!req.product) {
            const newProduct = new Product({ ...product, _id: product.id });
            newProduct.save();
          }
          return res.json(product);
        }
        if (req.product) return res.json(req.product);
        //If Product with productId is not present in store and not in redsky, then return not found
        return res.sendStatus(404);
      }
    );
  }

  function post(req, res) {
    const product = new Product({ ...req.body, _id: req.body.id });
    const result= validator(product);
    if (result.isValid) {
      product.save();
      res.status(201);
      return res.json(product);
    }
    res.status(400);
    return res.send({ errors: result.errors });
  }

  function put(req, res) {
    if (!req.body) {
      res.status(400);
      return res.send("No properties for update.");
    }
    if (
      req.body &&
      req.body.current_price &&
      !req.body.current_price.value &&
      req.body.current_price.value <= 0
    ) {
      res.status(400);
      return res.send("Product current price value is required.");
    }
    if(!req.product)
    {
      res.status(404)
      return res.send('No content found');
    }
    const product = Object.assign(req.product, {
      current_price: req.body.current_price
    });
    product.save();
    res.status(200);
    return res.json(product);
  }
  return { get, getAll, getExternalApiData, post, put };
}

module.exports = productsController;
