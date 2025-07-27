# 🚀 TrackZen – Employee Attendance Management System

Welcome to **TrackZen**, a modern and secure full-stack Employee Attendance Management System designed to help organizations effortlessly monitor and manage employee attendance. Built for both Admins and Employees, it ensures reliable tracking, easy access, and intuitive workflows.

---
> 🌐 **Live Demo:** : https://track-zen.vercel.app/

## 🖼️ Overview

✨ TrackZen is built using the MERN stack (MongoDB, Express.js, React, Node.js) with modern styling from Ant Design and animations powered by Framer Motion. Key features include:

- 🧑‍💼 Role-based authentication (Admin & Employee)

- ⏱️ Mark check-in and check-out with timestamps

- 📅 View attendance logs (per employee)

- 🗂️ Admin dashboard with attendance insights

- 🔒 JWT-based session security

- 📡 Axios with token interceptor

- ⚙️ Modular API design using Express

---

## 🚀 Local Setup Instructions

## 1. 📦 Clone the Repository

git clone https://github.com/randima-dilshani/TrackZen.git

cd server

## 2. 🔁 Backend Setup

cd server

npm install

## 📄 Create .env file inside task-api/ directory:

PORT=8080

MONGO_URI=your_mongodb_connection_url

JWT_SECRET=your_jwt_secret

▶️ Start the server:

npm run dev

## 3. 💻 Frontend Setup

cd client

npm install

✏️ Configure Axios (client/src/util/axios.js):

const axiosInstance = axios.create({
  baseURL: "https://trackzen-production.up.railway.app/api/v1", 
});

▶️ Start the frontend:

npm run dev
