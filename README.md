


# 🛒 ShoppyGlobServerTest

ShoppyGlobServerTest is a RESTful API backend for a simple e-commerce application built using **Node.js**, **Express**, **MongoDB**, and **JWT**. It includes user authentication, product retrieval, and a user-specific cart system.

---

## ✨ Features

- ✅ **User Registration & Login** (with JWT authentication)
- 📦 **Product Listing** (publicly accessible)
- 🛍️ **User-Specific Cart** (add, update, and delete cart items)
- 🔐 **JWT Protected Routes**
- 🧪 Easy Testing with Thunder Client/Postman

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB (via Mongoose)
- **Authentication:** JSON Web Tokens (JWT)
- **Testing Tool:** Thunder Client / Postman

---

## 🚀 Getting Started

### 📁 Clone the Repository

```bash
git clone https://github.com/NikeshBawankar1921/ShoppyGlobServerTest.git
cd ShoppyGlobServerTest
```

### 📦 Install Dependencies

```bash
npm install
```

### ⚙️ Configure MongoDB Connection

Edit `DB.js` and update your local or MongoDB Atlas connection string.

### ▶️ Run the Server

```bash
node index.js
```

Server runs on: `http://localhost:3000`

---

## 🧪 API Endpoints

### 🔐 Authentication

| Method | Endpoint      | Description            |
|--------|---------------|------------------------|
| POST   | `/register`   | Register a new user    |
| POST   | `/login`      | Login and get JWT      |

#### 📌 Example: `/register`

```json
{
  "username": "nikesh",
  "password": "Nikesh@123"
}
```

#### 📌 Example: `/login`

```json
{
  "username": "nikesh",
  "password": "Nikesh@123"
}
```

_Response:_

```json
{
  "token": "JWT_TOKEN_HERE"
}
```

---

### 📦 Products

| Method | Endpoint         | Description             |
|--------|------------------|-------------------------|
| GET    | `/Products`      | Get all products        |
| GET    | `/Products/:id`  | Get product by ID       |

---

### 🛒 Cart (Requires Auth)

**Note:** Add header `Authorization: Bearer <JWT_TOKEN>`

| Method | Endpoint         | Description                      |
|--------|------------------|----------------------------------|
| POST   | `/Cart/:id`      | Add product to cart              |
| PUT    | `/Cart/:id`      | Update product quantity in cart |
| DELETE | `/Cart/:id`      | Delete product from cart        |

#### 📌 Example Body for PUT `/Cart/:id`

```json
{
  "quantity": 2
}
```

---

## 🗂️ Folder Structure

```
.
├── index.js              # Entry point
├── DB.js                 # MongoDB connection
├── Products.js           # Product schema
├── Cart.js               # Cart schema (user-specific)
├── Model/
│   └── User.js           # User schema
├── package.json
└── README.md
```

---

## 🔐 JWT Authentication

Protected routes use a middleware that checks for JWT in the `Authorization` header. Token should be sent as:

```http
Authorization: Bearer YOUR_JWT_TOKEN
```

---

## 👨‍💻 Author

**Nikesh Bawankar**  
📧 [GitHub](https://github.com/NikeshBawankar1921/ShoppyGlobServerTest)

---

## 📄 License

This project is open-source and free to use under the MIT License.
