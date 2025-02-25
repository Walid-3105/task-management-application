# Task Management Application

## 🚀 Live Demo

[Live Site Link](https://task-management-4a8c7.web.app)

## 📌 Description

A modern **Task Management Application** where users can **add, edit, delete, and reorder tasks** using a **drag-and-drop** interface. Tasks are categorized into **To-Do, In Progress, and Done**. The app ensures **real-time updates** with a clean and responsive UI.

## ✨ Features

- 🔐 **Authentication** using Firebase (Google Sign-in).
- 📝 **Task CRUD Operations** (Create, Read, Update, Delete).
- 📌 **Drag and Drop** to reorder or move tasks between categories.
- 🔄 **Real-time Synchronization** with MongoDB.
- 🎨 **Minimalistic, Responsive UI** (works on both mobile & desktop).
- 🌙 **Dark Mode** (Bonus Feature).
- ⏳ **Task Due Date** with color indicators for overdue tasks (Bonus Feature).

## 🛠️ Technologies Used

### Frontend:

- **React.js + Vite**
- **Tailwind CSS + DaisyUI**
- **react-beautiful-dnd** (for drag-and-drop feature)
- **Firebase Authentication**

### Backend:

- **Node.js + Express.js**
- **MongoDB + Mongoose**
- **WebSockets / Change Streams** (for real-time updates)

## 📂 Folder Structure

```bash
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── hooks
│   │   ├── styles
│   │   └── utils
│   └── package.json
├── backend
│   ├── models
│   ├── routes
│   ├── controllers
│   ├── config
│   └── server.js
└── README.md
```

## 🚀 Installation Steps

### 1️⃣ Clone the repository

```bash
git clone https://github.com/walid-3105/task-management-app.git
```

### 2️⃣ Setup the backend

```bash
cd backend
npm install
npm start
```

### 3️⃣ Setup the frontend

```bash
cd frontend
npm install
npm run dev
```

## 📡 API Endpoints

| Method | Endpoint     | Description    |
| ------ | ------------ | -------------- |
| POST   | `/tasks`     | Add a new task |
| GET    | `/tasks`     | Get all tasks  |
| PUT    | `/tasks/:id` | Update a task  |
| DELETE | `/tasks/:id` | Delete a task  |

## 📜 License

This project is **open-source** and available under the [MIT License](LICENSE).

---

**👨‍💻 Developed By:** [Syed Abdullah Al Walid](https://github.com/walid-3105)
