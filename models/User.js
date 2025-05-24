
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  phone: { type: String, unique: true },
  balance: { type: Number, default: 1000 }
});

module.exports = mongoose.model('User', userSchema);
