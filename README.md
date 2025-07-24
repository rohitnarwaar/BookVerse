# 📚 BookVerse

BookVerse is a full-stack MERN (MongoDB, Express, React, Node.js) application that allows users to discover, review, and share books with a passionate community. It includes user authentication, detailed book listings, star-based reviews, and a responsive UI built with Tailwind CSS and Lucide icons.

---

## 🚀 Features

- 🔐 User authentication (Sign up & Login with JWT)
- 📚 Add, view, and review books
- ⭐ Submit and view ratings with review text
- 🔍 Search, filter, and sort books
- 🌗 Modern, responsive UI with Tailwind and animations
- 🛠️ Protected routes with React Context for auth management

---

## 🛠️ Setup Instructions

### 📦 Prerequisites
- Node.js and npm
- MongoDB (local or cloud like MongoDB Atlas)
- Git

### 🔧 1. Clone the Repository
```bash
git clone https://github.com/your-username/bookverse.git
cd bookverse
```
---

### 📁 2. Setup Server
```bash
cd server
npm install
```
Create a .env file in the /server folder and add:
```bash
MONGO_URI=mongodb+srv://<your-mongo-uri>
JWT_SECRET=your_jwt_secret_key
```
Then run the server:
```bash
npm run dev
```

---

### 💻 3. Setup Client
```bash
cd client
npm install
npm run dev
```
The app will be running at http://localhost:5173.

---

### 🏗️ Architecture Decisions
- MERN Stack: Chosen for full-stack JavaScript flexibility and ease of rapid development.
- React Context API: Used for simple global state management of authentication tokens.
- Tailwind CSS + Lucide Icons: Used for fast, utility-first responsive UI development.
- JWT-based Auth: Stateless, secure user session handling without needing cookies or sessions.
- Modular Structure: Client and server are separated cleanly for maintainability and scalability.

---

### ⚠️ Known Limitations
❌ No pagination or infinite scrolling yet for book lists

🧪 No unit or integration tests implemented

🔐 JWT tokens stored in localStorage (can be improved with HttpOnly cookies)

🚫 No role-based access control (e.g., admin vs user)

🖼️ No book images or file uploads yet

📉 No analytics or activity tracking

---

### 📄 License
MIT © 2025 Rohit Singh

