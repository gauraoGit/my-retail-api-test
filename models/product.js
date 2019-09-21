const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
  {
    _id: Number,
    name: String,
    current_price: {
      value: Number,
      currency_code: String,
    },
  }, { versionKey: false },
);

ProductSchema.method('toJSON', function () {
  const obj = this.toObject();
  // Rename fields
  obj.id = obj._id;
  // Deleted unnecessary fields
  delete obj._id;
  delete obj.__v;
  return obj;
});

module.exports = mongoose.model('Product', ProductSchema);
