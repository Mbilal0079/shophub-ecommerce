#  ShopHub - Full-Stack E-Commerce Platform

A modern, production-ready e-commerce platform built with the MERN stack (MongoDB, Express, React, Node.js).

![MERN Stack](https://img.shields.io/badge/Stack-MERN-green)
![License](https://img.shields.io/badge/License-MIT-blue)
![Status](https://img.shields.io/badge/Status-Live-success)

##  Live Demo

- **🌍 Live Website**: [https://shophub-frontend-two.vercel.app](https://shophub-frontend-two.vercel.app)
- ** Backend API**: [https://shophub-ecommerce-production.up.railway.app](https://shophub-ecommerce-production.up.railway.app)
- ** Source Code**: [GitHub Repository](https://github.com/Mbilal0079/shophub-ecommerce)

##  Demo Credentials

**Admin Account:**
- Email: `admin@shophub.com`
- Password: `admin123`

**Test User Account:**
- Email: `demo@shophub.com`
- Password: `demo123`

Feel free to explore the admin dashboard and add products!

##  Features

### User Features
-  JWT-based user authentication and authorization
-  Browse products with advanced search and filters
-  Real-time shopping cart management
-  Product categories and sorting options
-  Product reviews and ratings
-  Order management system
-  User profile and order history

### Admin Features
-  Comprehensive admin dashboard
-  Create, read, update, delete (CRUD) products
-  Image upload via Cloudinary CDN
-  Product inventory management
-  User management capabilities

##  Tech Stack

### Frontend
- **React 18** - Modern UI library
- **Vite** - Fast build tool
- **Tailwind CSS** - Utility-first CSS framework
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client
- **Context API** - State management

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication tokens
- **Bcrypt** - Password hashing
- **Cloudinary** - Image storage and CDN

### DevOps & Deployment
- **Vercel** - Frontend hosting
- **Railway** - Backend hosting
- **MongoDB Atlas** - Cloud database
- **GitHub** - Version control
- **Git** - Source control

##  Installation & Setup

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- Cloudinary account

### Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file and add your variables
cp .env.example .env

# Start development server
npm run dev
```

### Frontend Setup
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

##  Environment Variables

### Backend (.env)
```env
NODE_ENV=production
PORT=5000
MONGO_URI=your_mongodb_connection_string
CLOUDINARY_CLOUD_NAME=dyoniml3o
CLOUDINARY_API_KEY=512163998479817
CLOUDINARY_API_SECRET=8tf1LqRAOFld0tZdlsc2hrTzzf0
CLIENT_URL=http://localhost:5173
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
```

##  API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)
- `PUT /api/auth/profile` - Update user profile (Protected)

### Product Endpoints
- `GET /api/products` - Get all products (with filters)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Admin only)
- `PUT /api/products/:id` - Update product (Admin only)
- `DELETE /api/products/:id` - Delete product (Admin only)
- `POST /api/products/:id/reviews` - Add product review (Protected)

##  Key Features Implemented

-  User authentication with JWT tokens
-  Password encryption with bcrypt
-  Role-based authorization (User/Admin)
-  Product CRUD operations
-  Image upload and management
-  Shopping cart functionality
-  Product search and filtering
-  Product reviews and ratings
-  Responsive design (mobile-first)
-  Error handling and validation
-  RESTful API architecture
-  Production deployment


##  Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

##  License

This project is licensed under the MIT License.

##  Author

**  Bilal Asghar **
- GitHub: [@Mbilal0079](https://github.com/Mbilal0079)
- LinkedIn: [Bilal Asghar](https://linkedin.com/in/bilal-asghar-714076395)
- Email: bilalasgh007@gmail.com

##  Acknowledgments

- React documentation
- Node.js community
- MongoDB documentation
- Tailwind CSS team

---

** If you found this project helpful, please give it a star!**

** Live Demo**: [https://shophub-frontend-two.vercel.app](https://shophub-frontend-two.vercel.app)