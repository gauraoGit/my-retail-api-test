const should = require('should');
const sinon = require('sinon');
const productController = require('../controllers/productsController');

describe('Product controller test:',()=>{
   let product, res;
   beforeEach(()=>{
      product = function(book) { this.save =()=>{}};
      res = {
        send: sinon.spy(),
        status: sinon.spy()
      };
   });
   describe("Post", ()=>{
      it("should not allow empty name for product on post",()=>{
       
        req = {
          body:{
            current_price:{"value": 8.00,"currency_code":"USD"},
            id :12345678
          }
        };
        const controller = productController(product);
        controller.post(req,res);

        res.status.calledWith(400).should.equal(true, `Bad Status ${res.status.args[0][0]}`);
        res.send.calledWith('Product Name is required.').should.equal(true);
      });

      it("should not allow empty id for product on post",()=>{
       
        req = {
          body:{
            current_price:{"value": 8.00,"currency_code":"USD"},
            name:'test'
          }
        };
        const controller = productController(product);
        controller.post(req,res);

        res.status.calledWith(400).should.equal(true, `Bad Status ${res.status.args[0][0]}`);
        res.send.calledWith('Product Id is required.').should.equal(true);
      });

      it("should not allow empty price for product on post",()=>{
       
        req = {
          body:{
            name:'test',
            id:12345
          }
        };
        const controller = productController(product);
        controller.post(req,res);

        res.status.calledWith(400).should.equal(true, `Bad Status ${res.status.args[0][0]}`);
        res.send.calledWith('Product current price is required.').should.equal(true);
      });

      it("should not allow empty price value for product on post",()=>{
       
        req = {
          body:{
            name:'test',
            id:12345,
            current_price:{"value": '',"currency_code":"USD"},
          }
        };
        const controller = productController(product);
        controller.post(req,res);

        res.status.calledWith(400).should.equal(true, `Bad Status ${res.status.args[0][0]}`);
        res.send.calledWith('Product current price value is required.').should.equal(true);
      });

      it("should not allow empty price currency code for product on post",()=>{
       
        req = {
          body:{
            name:'test',
            id:12345,
            current_price:{"value": 20,"currency_code":""},
          }
        };
        const controller = productController(product);
        controller.post(req,res);

        res.status.calledWith(400).should.equal(true, `Bad Status ${res.status.args[0][0]}`);
        res.send.calledWith('Product current price currency code is required.').should.equal(true);
      });
   })
})