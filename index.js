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

app.get('/', (req, res) => {
  res.send("Backend is Live ✅");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
