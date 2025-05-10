import express from 'express';
import database from './DB.js';
import Product from './Products.js';
import CartProduct from './Cart.js';
import User from './Model/User.js';
import jwt from 'jsonwebtoken';

const app = express();
app.use(express.json());

database();

app.listen(3000, () => {
  console.log("Connected to port 3000");
});

//  User Registration Route
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(409).json({ message: "User already exists" });

    const newUser = new User({ username, password });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Registration failed", error: err });
  }
});

//  Login Route with JWT
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username, password });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id }, "secretKey", { expiresIn: "1h" });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err });
  }
});

// Middleware to verify JWT and attach user ID
async function authenticateUser(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = await authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Token missing" });

  jwt.verify(token, "secretKey", (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.userId = decoded.userId;
    next();
  });
}

//  Product Routes (public)
app.get("/Products", async (req, res) => {
  try {
    const product = await Product.find();
    res.status(200).json(product[0].products);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
});

app.get("/Products/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.find();
    const productFind = product[0].products.find(p => p.id === parseInt(id));
    if (!productFind) return res.status(404).json({ message: "Product not found" });

    res.status(200).json(productFind);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
});

//  Add to Cart (user-specific)
app.post("/Cart/:id", authenticateUser, async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.find();
    const productFind = product[0].products.find(p => p.id === parseInt(id));
    if (!productFind) return res.status(404).json({ message: "Product not found" });

    const cartItem = new CartProduct({
      userId: req.userId, // ✅ associate cart with user
      productId: productFind.id,
      title: productFind.title,
      price: productFind.price,
      quantity: 1
    });

    await cartItem.save();
    res.status(201).json(cartItem);
  } catch (err) {
    res.status(500).json({ message: "Error adding to cart", error: err });
  }
});

//  Update cart item quantity
app.put("/Cart/:id", authenticateUser, validateUser, async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;
  try {
    const updatedCartItem = await CartProduct.findOneAndUpdate(
      { userId: req.userId, productId: parseInt(id) },
      { quantity },
      { new: true }
    );

    if (!updatedCartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }
    res.status(200).json(updatedCartItem);
  } catch (err) {
    res.status(500).json({ message: "Error updating cart item", error: err });
  }
});

//  Delete cart item
app.delete("/Cart/:id", authenticateUser, async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCartItem = await CartProduct.findOneAndDelete({
      userId: req.userId,
      productId: parseInt(id),
    });

    if (!deletedCartItem) return res.status(404).json({ message: "Cart item not found" });
    res.status(200).json({ message: "Cart item deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting cart item", error: err });
  }
});

//  Input validation middleware
function validateUser(req, res, next) {
  const { quantity } = req.body;
  if (!quantity || typeof quantity !== 'number' || quantity < 1) {
    return res.status(400).json({ error: "Invalid or missing quantity" });
  }
  next();
}
