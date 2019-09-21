const async = require("async");
const request = require("request");
const env = require("../config/environment");

function productsController(Product) {
  function get(req, res) {
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
          request(env.externalApi(req.product.id), function(
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
        const data = JSON.parse(results.externalProduct);
        if (data.product) {
          const product = {
            id: req.product._id,
            current_price: req.product.current_price,
            name: data.product.item.product_description.title
          };
          return res.json(product);
        }
        return res.json(req.product);
      }
    );
  }

  function post(req, res) {
    if (!req.body.id) {
      res.status(400);
      return res.send("Product Id is required.");
    }
    if (!req.body.name) {
      res.status(400);
      return res.send("Product Name is required.");
    }
    if (!req.body.current_price) {
      res.status(400);
      return res.send("Product current price is required.");
    }
    if (!req.body.current_price.value) {
      res.status(400);
      return res.send("Product current price value is required.");
    }
    if (!req.body.current_price.currency_code) {
      res.status(400);
      return res.send("Product current price currency code is required.");
    }
    const product = new Product({ ...req.body, _id: req.body.id });
    product.save();
    res.status(201);
    return res.json(product);
  }

  function put(req, res) {
    const product = Object.assign(req.product, req.body);
    product.save();
    return res.status(201).json(product);
  }

  return { get, getAll, getExternalApiData, post, put };
}

module.exports = productsController;
