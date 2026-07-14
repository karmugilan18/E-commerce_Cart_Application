# API TEST RESULTS

## 1. User Registration

### Endpoint

POST /api/auth/register

### Request

```json
{
  "name": "Karthik",
  "email": "karthik@gmail.com",
  "password": "123456"
}
```

### Response

```json
{
  "success": true,
  "message": "User Register Successfully"
}
```

Screenshot:
(Add Thunder Client Screenshot Here)

---

## 2. User Login

### Endpoint

POST /api/auth/login

### Request

```json
{
  "email": "karthik@gmail.com",
  "password": "123456"
}
```

### Response

```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

Screenshot:
(Add Thunder Client Screenshot Here)

---

## 3. Add Product

### Endpoint

POST /api/products

### Headers

Authorization: Bearer YOUR_TOKEN

### Request

```json
{
  "name": "Gaming Mouse",
  "price": 1500,
  "description": "RGB Gaming Mouse"
}
```

### Response

```json
{
  "success": true,
  "message": "Product Added Successfully"
}
```

Screenshot:
(Add Thunder Client Screenshot Here)

---

## 4. Add To Cart

### Endpoint

POST /api/cart/add

### Headers

Authorization: Bearer YOUR_TOKEN

### Request

```json
{
  "productId": 1,
  "quantity": 2
}
```

### Response

```json
{
  "success": true,
  "message": "Product added to cart"
}
```

Screenshot:
(Add Thunder Client Screenshot Here)

---

## 5. Checkout

### Endpoint

POST /api/checkout

### Headers

Authorization: Bearer YOUR_TOKEN

### Request

```json
{}
```

### Response

```json
{
  "success": true,
  "message": "Checkout Successful",
  "orderId": 1
}
```

Screenshot:
(Add Thunder Client Screenshot Here)

---

## 6. Order History

### Endpoint

GET /api/orders

### Headers

Authorization: Bearer YOUR_TOKEN

### Response

```json
{
  "success": true,
  "orders": [
    {
      "id": 1,
      "user_id": 1,
      "total_amount": 3000
    }
  ]
}
```

Screenshot:
(Add Thunder Client Screenshot Here)

---

## 7. Admin Statistics

### Endpoint

GET /api/admin/stats

### Response

```json
{
  "success": true,
  "stats": {
    "totalUsers": 5,
    "totalProducts": 10,
    "totalOrders": 7,
    "totalRevenue": 25000
  }
}
```

Screenshot:
(Add Thunder Client Screenshot Here)


# Project Information

Backend URL:
http://localhost:5000

GitHub Repository:
https://github.com/karmugilan18/E-commerce_Cart_Application

Database:
MySQL

Backend Technology:
Node.js + Express.js

Authentication:
JWT

Author:
KARMUGILAN ELANGOVAN