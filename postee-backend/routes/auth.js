// routes/auth.js
const express = require("express");
const router = express.Router();

// Example only – in production, you'd email a reset link
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email required" });

  // TODO: Generate reset token + email user
  console.log(`Password reset requested for: ${email}`);

  res.json({ message: "Password reset email sent (check console for demo)" });
});

module.exports = router;


