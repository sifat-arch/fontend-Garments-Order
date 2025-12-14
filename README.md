# 🧵 One Garments Shop

**One Garments Shop** is a full-stack garments e-commerce web application designed for buying and selling garments products with a **role-based management system**. The platform supports **Admin, Manager, and Buyer** roles, each with dedicated functionalities to ensure smooth operation, security, and scalability.

---

## 🚀 Live Project

> Deployed using **Firebase Hosting**

---

## 🎯 Key Features

### 👤 Role-Based Access Control

#### 🔑 Admin

- Suspend any user
- Delete and update user accounts
- Monitor and manage the entire system

#### 🧑‍💼 Manager

- Add new garments products
- Manage and update own products

#### 🛒 Buyer

- Browse available garments products
- Purchase products
- Complete payments using secure payment options

---

## 💳 Payment System

- Integrated secure payment gateway
- Order confirmation after successful payment

---

## 🧩 Technologies Used

### 🖥️ Frontend

- React
- React Router DOM
- Tailwind CSS
- DaisyUI

### 🗄️ Backend

- Node.js
- Express.js
- MongoDB

### 🔐 Authentication & Hosting

- Firebase Authentication
- Firebase Hosting

---

## 🔐 Authentication & Security

- User authentication using Firebase Authentication
- JWT-based secure API access
- Protected routes based on user roles (Admin / Manager / Buyer)

---

## 📁 Project Structure (Overview)

```
one-garments-shop
│── client
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── routes
│   │   ├── hooks
│   │   └── layouts
│
│── server
│   ├── routes
│   ├── controllers
│   ├── middleware
│   └── index.js
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone <your-repository-url>
```

### 2️⃣ Client Setup

```bash
cd client
npm install
npm run dev
```

### 3️⃣ Server Setup

```bash
cd server
npm install
nodemon index.js
```

---

## 🌐 Environment Variables

### Client (.env)

```
VITE_apiKey=your_firebase_api_key
VITE_authDomain=your_auth_domain
```

### Server (.env)

```
DB_USER=your_mongodb_user
DB_PASS=your_mongodb_password
ACCESS_TOKEN_SECRET=your_jwt_secret
```

---

## 📦 Deployment

- Frontend deployed on **Firebase Hosting**
- Backend deployable on **Vercel / Render / Railway**

### Redeploy Commands

```bash
npm run build
firebase deploy
```

---

## 🚧 Future Improvements

- Order tracking system
- Product reviews and ratings
- Sales and analytics dashboard

---

## 👨‍💻 Author

**One Garments Shop**
Developed by **Sifat**

---

## 📜 License

This project is developed for educational and portfolio purposes.
