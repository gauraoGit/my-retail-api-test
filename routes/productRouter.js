const express = require("express");
const productsController = require("../controllers/productsController");

function routes(Product, logger) {
  const productRouter = express.Router();
  const controller = productsController(Product);

  //Added middleware for logging request
  productRouter.use("/products", (req, res, next) => {
    logger.info(req);
    return next();
  });

   //Added middleware for common find by id
  productRouter.use("/products/:id", (req, res, next) => {
    Product.findById(req.params.id, (err, product) => {
      if (err) {
        return res.send(err);
      }
      if (product) {
        req.product = product;
        return next();
      }
      return res.sendStatus(404);
    });
  });

  //Added middleware for external product api
  productRouter.use("/ext-products/:id", (req, res, next) => {
    Product.findById(req.params.id, (err, product) => {
      if (err) {
        return res.send(err);
      }
      if (product) {
        req.product = product;
      }
      return next();
    });
  });

  productRouter
    .route("/products")
    .post(controller.post)
    .get(controller.getAll);

  productRouter
    .route("/products/:id")
    .get(controller.get)
    .put(controller.put);

  productRouter.route("/ext-products/:id").get(controller.getExternalApiData);

  return productRouter;
}
module.exports = routes;
