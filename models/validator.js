function validateModel(product) {
  let errors = [];
  if (!product) {
    errors.push("No properties for update.");
  }
  if (!product.id) {
    errors.push("Product Id is required.");
  }
  if (!product.name) {
    errors.push("Product Name is required.");
  }
  if (!product.current_price) {
    errors.push("Product current price is required.");
  }
  if (product.current_price && !product.current_price.value) {
    errors.push("Product current price value is required.");
  }
  if (product.current_price && !product.current_price.currency_code) {
    errors.push("Product current price currency code is required.");
  }
  return { isValid: errors.length == 0, errors: errors };
}

module.exports= validateModel;