const mongoose = require('mongoose');

const { Schema } = mongoose;

const ReviewSchema = new Schema({
  userName: { type: String, required: true },
  text: { type: String, required: true },
});

const ProductSchema = new Schema({
  category: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  reviews: [ReviewSchema],
});

module.exports = mongoose.model('Product', ProductSchema);
