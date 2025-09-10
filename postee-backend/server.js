const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');   // <--- ADD THIS
require('dotenv').config();

const profileRoute = require('./routes/profile');
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // parse JSON body

// Serve profile pics from uploads folder
app.use("/uploads", express.static("uploads"));

// ✅ Serve frontend files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use("/profile", profileRoute);
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

// ✅ Fallback: send index.html for any other route (important for React/SPAs)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
