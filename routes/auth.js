const express = require('express');
const router = express.Router();

router.post('/send-otp', (req, res) => {
  const { phone } = req.body;
  if (!phone) return res.status(400).json({ error: 'Phone required' });
  const otp = Math.floor(1000 + Math.random() * 9000);
  console.log(`OTP for ${phone}: ${otp}`);
  res.json({ message: 'OTP sent (simulated)', otp }); // for now returning OTP directly
});

module.exports = router;
