#  ShopHub - Full-Stack E-Commerce Platform

A modern, feature-rich e-commerce platform built with the MERN stack (MongoDB, Express.js, React, Node.js).

![ShopHub](https://img.shields.io/badge/Stack-MERN-green)
![License](https://img.shields.io/badge/License-MIT-blue)

##  Live Demo

- **Frontend**: [Coming Soon]
- **Backend API**: [Coming Soon]

##  Features

### User Features
-  User authentication & authorization (JWT)
-  Browse products with advanced search & filters
-  Real-time shopping cart management
-  Product categories & sorting
-  Product reviews & ratings
-  Order management
-  User profile & order history

### Admin Features
-  Admin dashboard
-  Create, Edit, Delete products
-  Image upload via Cloudinary
-  Product inventory management
-  View all products

##  Tech Stack

### Frontend
- React 18 with Vite
- Tailwind CSS for styling
- React Router DOM for navigation
- Axios for API requests
- Context API for state management

### Backend
- Node.js & Express.js
- MongoDB with Mongoose ODM
- JWT for authentication
- Bcrypt for password hashing
- Cloudinary for image storage
- Express Validator for input validation

##  Prerequisites

Before running this project, make sure you have:
- Node.js 18+ installed
- MongoDB installed and running
- Cloudinary account (for image uploads)

##  Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/YOUR-USERNAME/shophub-ecommerce.git
cd shophub-ecommerce
```

### 2. Backend Setup
```bash
cd backend
npm install

# Create .env file
cp .env.example .env
# Add your environment variables

npm run dev
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## 🔑 Environment Variables

### Backend (.env)
```
PORT=5000
NODE_ENV=development
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLIENT_URL=http://localhost:5173
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000/api
```

##  Screenshots



##  Features Demo

### User Flow
1. Register/Login
2. Browse products with filters
3. View product details
4. Add items to cart
5. Manage cart (update quantities, remove items)
6. View order summary with automatic price calculation

### Admin Flow
1. Login as admin
2. Access admin dashboard
3. Add new products with images
4. Edit existing products
5. Delete products
6. Manage inventory

##  Demo Accounts

**Admin Account:**
- Email: admin@shophub.com
- Password: admin123

**Test User Account:**
- Email: demo@shophub.com
- Password: demo123

##  API Documentation

### Auth Endpoints
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)

### Product Endpoints
- `GET /api/products` - Get all products (with filters)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Admin only)
- `PUT /api/products/:id` - Update product (Admin only)
- `DELETE /api/products/:id` - Delete product (Admin only)

##  Contributing

Contributions, issues, and feature requests are welcome!

##  License

This project is [MIT](LICENSE) licensed.

##  Author

**Bilal ASghar**
- GitHub: [@Mbilal0079](https://github.com/Mbilal0079)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)
- Portfolio: [yourportfolio.com](https://yourportfolio.com)

