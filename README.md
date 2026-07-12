# E-Commerce Cart Application

Full Stack E-Commerce Backend built using:

- Node.js
- Express.js
- MySQL
- JWT Authentication

## Features

- User Registration
- User Login
- JWT Authentication
- Product CRUD
- Add To Cart
- View Cart
- Checkout
- Order History
- Admin Dashboard Statistics

## Technologies

- Node.js
- Express.js
- MySQL
- bcryptjs
- jsonwebtoken
- dotenv

## API Endpoints

### Authentication

POST /api/auth/register

POST /api/auth/login

### Products

GET /api/products

POST /api/products

PUT /api/products/:id

DELETE /api/products/:id

### Cart

POST /api/cart/add

GET /api/cart

DELETE /api/cart/:id

### Checkout

POST /api/checkout

### Orders

GET /api/orders

### Admin

GET /api/admin/stats