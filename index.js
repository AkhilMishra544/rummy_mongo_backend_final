const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();

dotenv.config();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.error("Mongo error:", err));

// ✅ Routes
app.use('/auth', require('./routes/auth'));
app.use('/wallet', require('./routes/wallet'));
app.use('/game', require('./routes/game'));

// ✅ Admin Route (Quick Panel)
app.get('/admin', (req, res) => {
  const adminSecret = req.headers['x-admin-secret'];

  // ⚠️ Replace this secret with a secure one (store in .env)
  if (adminSecret !== process.env.ADMIN_SECRET) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  // Example data (replace with real DB queries if needed)
  res.json({
    status: "Admin access granted ✅",
    usersCount: 1234,
    gamesPlayed: 567,
    walletBalance: 89000,
    uptime: process.uptime()
  });
});

app.get('/', (req, res) => {
  res.send("Backend is Live ✅");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
