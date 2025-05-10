import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  id: Number,
  title: String,
  description: String,
  category: String,
  price: Number,
  discountPercentage: Number,
  rating: Number,
  stock: Number,
  tags: [String],
  brand: String,
  sku: String,
  weight: Number,
  dimensions: {
    width: Number,
    height: Number,
    depth: Number
  }
});

const cartSchema = new mongoose.Schema({
  products: [productSchema]
});

const Product = mongoose.model("Products", cartSchema); // your collection is Cart

export default Product