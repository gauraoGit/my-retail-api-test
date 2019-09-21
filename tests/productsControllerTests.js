const should = require("should");
const sinon = require("sinon");
const productController = require("../controllers/productsController");

describe("Product controller test:", () => {
  let product, res;
  beforeEach(() => {
    product = function(product) {
      this.save = () => {};
    };
    res = {
      send: sinon.spy(),
      status: sinon.spy(),
      json: sinon.spy()
    };
  });
  describe("Post", () => {
    it("should not allow empty name for product on post", () => {
      req = {
        body: {
          current_price: { value: 8.0, currency_code: "USD" },
          id: 12345678
        }
      };
      const controller = productController(product);
      controller.post(req, res);
      res.status
        .calledWith(400)
        .should.equal(true, `Bad Status ${res.status.args[0][0]}`);
    });

    it("should not allow empty id for product on post", () => {
      req = {
        body: {
          current_price: { value: 8.0, currency_code: "USD" },
          name: "test"
        }
      };
      const controller = productController(product);
      controller.post(req, res);

      res.status
        .calledWith(400)
        .should.equal(true, `Bad Status ${res.status.args[0][0]}`);
    });

    it("should not allow empty price for product on post", () => {
      req = {
        body: {
          name: "test",
          id: 12345
        }
      };
      const controller = productController(product);
      controller.post(req, res);

      res.status
        .calledWith(400)
        .should.equal(true, `Bad Status ${res.status.args[0][0]}`);
    });

    it("should not allow empty price value for product on post", () => {
      req = {
        body: {
          name: "test",
          id: 12345,
          current_price: { value: "", currency_code: "USD" }
        }
      };
      const controller = productController(product);
      controller.post(req, res);

      res.status
        .calledWith(400)
        .should.equal(true, `Bad Status ${res.status.args[0][0]}`);
    });

    it("should not allow empty price currency code for product on post", () => {
      req = {
        body: {
          name: "test",
          id: 12345,
          current_price: { value: 20, currency_code: "" }
        }
      };
      const controller = productController(product);
      controller.post(req, res);

      res.status
        .calledWith(400)
        .should.equal(true, `Bad Status ${res.status.args[0][0]}`);
    });
  });

  describe("Put", () => {
    it("should not allow empty product", () => {
      req = {
        body: null
      };
      const controller = productController(product);
      controller.put(req, res);
      res.status
        .calledWith(400)
        .should.equal(true, `Bad Status ${res.status.args[0][0]}`);
    });
    it("should not allow empty product price", () => {
      req = {
        current_price: {
          value: null
        }
      };
      const controller = productController(product);
      controller.put(req, res);
      res.status
        .calledWith(400)
        .should.equal(true, `Bad Status ${res.status.args[0][0]}`);
    });
    it("should not allow  product price less than 0", () => {
      req = {
        current_price: {
          value: -12
        }
      };
      const controller = productController(product);
      controller.put(req, res);
      res.status
        .calledWith(400)
        .should.equal(true, `Bad Status ${res.status.args[0][0]}`);
    });
  });

  describe("Get", () => {
    it("If product id is not found should return not found", () => {
      req = {
        params: { id: 1234 }
      };
      const controller = productController(product);
      controller.get(req, res);
      res.status.calledWith(404).should.equal(true);
    });
  });
});
