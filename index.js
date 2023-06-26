const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
// mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/social-network-api');
const DATABASE_URL = 'mongodb://localhost:27017/social-network-api';

// Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/users', require('./routes/friendRoutes'));

app.use('/api/thoughts', require('./routes/thoughtRoutes'));
app.use('/api/thoughts', require('./routes/reactionRoutes'));

// Default error handler
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ message: 'Internal server error' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
