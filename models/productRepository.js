const Product = require('./models/product');

function save(newProduct) {
  const product = new Product({ ...newProduct });
  product.save();
  return product;
}
function findAll() {
  return Product.findAll();
}
function findById(id) {
  return Product.findById();
}

module.exports = {
  save,
  findAll,
  findById,
};
