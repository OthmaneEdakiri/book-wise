# 📚 University Library Management System (Book wise)

A full‑stack **University Library Management System** featuring a public-facing application and a powerful admin dashboard. The platform is designed for real-world use, focusing on scalability, automation, and clean UI/UX.

This version of the project is built using **Next.js, Laravel, MySQL, TypeScript, and Tailwind CSS**.

---

## 🏛 Overview

The system allows students to browse, borrow, and manage books online, while administrators can control users, books, borrow requests, and system-wide analytics. Automated emails, role-based access, and optimized performance make it suitable for production environments.

---

## ⚙️ Tech Stack

### 🖥 Frontend

* Next.js
* TypeScript
* Tailwind CSS

### 🛠 Backend

* Laravel (REST API)
* MySQL

### 🧰 Additional Tools & Concepts

* 🔒 Authentication & Authorization
* 🧑‍💼 Role-based access control (User / Admin)
* 📧 Email notifications & automation
* 🗄️ Database relationships & migrations
* 🎨 Optimized UI/UX with responsive design

---

## ✨ Key Features

### 👤 User Features

* 🔐 Secure authentication and onboarding flow
* 📚 Browse and search books with filters and pagination
* 📖 View detailed book pages (availability, summary, suggestions)
* 🏷️ Borrow books and track active borrowings
* 🧑 Profile management

### 🛡 Admin Features

* 📊 Admin dashboard with system statistics
* 👥 User management (approve, revoke, manage roles)
* 📘 Book management (add, update, delete books)
* 📑 Borrow records tracking with search and pagination
* ✅ Account request approvals with email notifications
* 🔧 Role management for administrators

### 🤖 Automation & Advanced Functionality

* 📧 Automated email notifications (welcome, reminders, updates)
* ⏰ Borrow reminders before, on, and after due dates
* ⚡ Performance optimization and clean architecture

---

## 📂 Project Structure

```
frontend/   → Next.js + TypeScript + Tailwind CSS
backend/    → Laravel API
```

Each layer is fully separated to ensure maintainability, scalability, and clear responsibility boundaries.

---

## 🚀 Getting Started

### 📝 Prerequisites

Make sure you have the following installed:

* Node.js & npm
* PHP 8+
* Composer
* MySQL
* Git

### 🖥 Frontend Setup (Next.js)

```bash
git clone <repository-url>
cd frontend
npm install
npm run dev
```

Open in browser: `http://localhost:3000`

### 🛠 Backend Setup (Laravel)

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve
```

API URL: `http://localhost:8000`

---

## 🌐 Environment Configuration

Ensure `.env` files are properly configured for:

* 🗄 Database connection
* 📧 Mail service
* 🔗 Application URLs

---

## 🎨 Design & UX

* ✨ Clean and modern UI built with Tailwind CSS
* 📱 Fully responsive layout
* 🧑‍💻 Accessible and user-friendly admin panel

---

## 🎯 Purpose

This project demonstrates real-world skills in:

* 🖥 Modern frontend development
* 🛠 RESTful backend architecture
* 🗄 Database design
* 🔐 Authentication & authorization
* 🏗 Scalable and maintainable codebases

---

**Developed with ❤️ using Next.js, Laravel, MySQL, TypeScript, and Tailwind CSS**
