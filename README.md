# 📚 Library Management API

A powerful RESTful API built with Express.js, TypeScript, and MongoDB for managing library books and borrow operations.

> Developed as Assignment 3 for the Level 2 Web Development Course

---

## 🛠️ Tech Stack

- ⚙️ Node.js + Express.js
- 🟦 TypeScript
- 🍃 MongoDB + Mongoose
- 🌐 dotenv (for environment variables)
- 🔁 cors (cross-origin resource sharing)
- 🔥 ts-node-dev (development server)

---

## ✨ Key Features

- ✅ Create, read, update, and delete books
- 🔍 Filter, sort, and paginate book listings
- 📖 Borrow books with quantity validation
- 📊 Aggregation pipeline for borrow summary
- ⚠️ Centralized error handling
- 🧠 Mongoose validation, middleware, instance methods

---

## 📁 Project Structure

```bash
src/
├── app/
│   ├── controllers/       # Route handlers
│   ├── models/            # Mongoose schemas
│   ├── routes/            # API route files
│   ├── middlewares/       # Error handler and others
│   └── utils/             # Helper functions
├── config/                # DB config
├── index.ts              # App entry point
└── server.ts             # Starts the server
```

---

## 🔌 API Endpoints

### 📘 Book Routes

1. ➕ Create a Book
POST /api/books
```json
{
  "title": "1984",
  "author": "George Orwell",
  "genre": "FICTION",
  "isbn": "9780451524935",
  "description": "Dystopian novel",
  "copies": 10
}
```

2. 📚 Get All Books
GET /api/books?filter=FICTION&sortBy=createdAt&sort=desc&limit=5

3. 🔎 Get Book by ID
GET /api/books/:bookId

4. ✏️ Update Book
PUT /api/books/:bookId
```json
{
  "copies": 20
}
```

5. ❌ Delete Book
DELETE /api/books/:bookId

---

### 📖 Borrow Routes

6. 📥 Borrow a Book
POST /api/borrow
```json
{
  "book": "<book_id>",
  "quantity": 2,
  "dueDate": "2025-07-18"
}
```

7. 📊 Get Borrow Summary
GET /api/borrow
- Returns: book title, ISBN, total borrowed quantity (aggregation pipeline)

---

## ⚙️ Setup Instructions

1. ⬇️ Clone the repository
```bash
git clone https://github.com/your-username/library-management-api.git
cd library-management-api
```

2. 📦 Install dependencies
```bash
npm install
```

3. 🛠️ Create .env file
```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/assignment3
PORT=5000
```

4. ▶️ Start the development server
```bash
npm run dev
```

📍 Server runs on: http://localhost:5000

---

## ✅ Validations & Business Logic

- All book fields are validated (e.g. title, author, genre, ISBN)
- Genre supports: FICTION, NON_FICTION, SCIENCE, HISTORY, BIOGRAPHY, FANTASY
- Borrow route validates stock, deducts quantity, updates availability
- Instance method used to update book availability
- Aggregation used to calculate borrow summary

---

## 🌍 Deployment

- 🚀 Live API: [View API](https://assignment-3-vert-xi.vercel.app/) (if deployed)
