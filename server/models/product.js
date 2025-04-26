import mongoose from 'mongoose';

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

const Product = mongoose.model('Product', ProductSchema);
export default Product;
