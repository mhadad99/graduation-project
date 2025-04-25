const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 5002;

app.use(cors());
app.use(express.json());

// Helper: Get user role
function getUserRole(userId, db) {
  if (db.admins && db.admins.find(a => a.userId == userId && !a.isDeleted && a.status === 'active')) return 'admin';
  if (db.freelancers && db.freelancers.find(f => f.userId == userId && !f.isDeleted && f.status === 'active')) return 'freelancer';
  if (db.clients && db.clients.find(c => c.userId == userId && !c.isDeleted && c.status === 'active')) return 'client';
  return null;
}

// Login endpoint (ensure this is /login)
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const dbPath = path.join(__dirname, 'Server', 'db.json');
  const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
  const user = db.users.find(u => u.email === email && u.password === password && !u.isDeleted && u.status === 'active');
  if (user) {
    const role = getUserRole(user.id, db);
    if (!role) return res.status(403).json({ error: 'Role not recognized', message: 'Your user role is not recognized. Please contact support.' });
    const { password, ...userWithoutPassword } = user;
    res.json({
      token: 'fake-jwt-token',
      user: { ...userWithoutPassword, role },
    });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

app.get('/test', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(port, () => {
  console.log(`Auth server running at http://localhost:${port}`);
});