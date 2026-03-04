import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database("travelnepal.db");

// Initialize Database
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    name TEXT,
    email TEXT UNIQUE,
    password TEXT,
    role TEXT DEFAULT 'USER',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS bookings (
    id TEXT PRIMARY KEY,
    userId TEXT,
    packageName TEXT,
    price INTEGER,
    status TEXT DEFAULT 'PENDING',
    date TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(userId) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS messages (
    id TEXT PRIMARY KEY,
    name TEXT,
    email TEXT,
    subject TEXT,
    message TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS activities (
    id TEXT PRIMARY KEY,
    userName TEXT,
    description TEXT,
    time TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS feedbacks (
    id TEXT PRIMARY KEY,
    name TEXT,
    rating INTEGER,
    message TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/users", (req, res) => {
    const users = db.prepare("SELECT * FROM users").all();
    res.json(users);
  });

  app.post("/api/users", (req, res) => {
    const { id, name, email, password, role } = req.body;
    try {
      const stmt = db.prepare("INSERT INTO users (id, name, email, password, role) VALUES (?, ?, ?, ?, ?)");
      stmt.run(id, name, email, password, role || 'USER');
      res.status(201).json({ success: true });
    } catch (e) {
      res.status(400).json({ error: "User already exists" });
    }
  });

  app.get("/api/bookings", (req, res) => {
    const bookings = db.prepare(`
      SELECT b.*, u.name as userName 
      FROM bookings b 
      LEFT JOIN users u ON b.userId = u.id
    `).all();
    res.json(bookings);
  });

  app.post("/api/bookings", (req, res) => {
    const { id, userId, packageName, price, date } = req.body;
    const stmt = db.prepare("INSERT INTO bookings (id, userId, packageName, price, date) VALUES (?, ?, ?, ?, ?)");
    stmt.run(id, userId, packageName, price, date);
    res.status(201).json({ success: true });
  });

  app.patch("/api/bookings/:id", (req, res) => {
    const { status } = req.body;
    const stmt = db.prepare("UPDATE bookings SET status = ? WHERE id = ?");
    stmt.run(status, req.params.id);
    res.json({ success: true });
  });

  app.get("/api/messages", (req, res) => {
    const messages = db.prepare("SELECT * FROM messages").all();
    res.json(messages);
  });

  app.post("/api/messages", (req, res) => {
    const { id, name, email, subject, message } = req.body;
    const stmt = db.prepare("INSERT INTO messages (id, name, email, subject, message) VALUES (?, ?, ?, ?, ?)");
    stmt.run(id, name, email, subject, message);
    res.status(201).json({ success: true });
  });

  app.get("/api/activities", (req, res) => {
    const activities = db.prepare("SELECT * FROM activities ORDER BY created_at DESC").all();
    res.json(activities);
  });

  app.post("/api/activities", (req, res) => {
    const { id, userName, description, time } = req.body;
    const stmt = db.prepare("INSERT INTO activities (id, userName, description, time) VALUES (?, ?, ?, ?)");
    stmt.run(id, userName, description, time);
    res.status(201).json({ success: true });
  });

  app.get("/api/feedbacks", (req, res) => {
    const feedbacks = db.prepare("SELECT * FROM feedbacks").all();
    res.json(feedbacks);
  });

  app.post("/api/feedbacks", (req, res) => {
    const { id, name, rating, message } = req.body;
    const stmt = db.prepare("INSERT INTO feedbacks (id, name, rating, message) VALUES (?, ?, ?, ?)");
    stmt.run(id, name, rating, message);
    res.status(201).json({ success: true });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
