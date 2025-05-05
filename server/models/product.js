import mongoose from 'mongoose';
import { z } from 'zod';

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

const reviewSchema = z.object({
  userName: z.string().min(5),
  text: z.string().min(5),
});

const productSchema = z.object({
  name: z.string().min(3).required(),
  category: z.string().min(3).required(),
  price: z.number().int().positive().required(),
  image: z.string().url().required(),
  reviews: z.array(reviewSchema).required(),
});

export { reviewSchema, productSchema };

const Product = mongoose.model('Product', ProductSchema);
export default Product;
