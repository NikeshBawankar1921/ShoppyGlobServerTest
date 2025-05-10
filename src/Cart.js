import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,  // Important for user-specific cart
    required: true,
    ref: 'User'
  },
  productId: Number,
  title: String,
  price: Number,
  quantity: {
    type: Number,
    default: 1,
  },
});

const CartProduct = mongoose.model("Cart", cartSchema);
export default CartProduct;
