const express = require('express');
const cors = require('../middleware/cors');
const waitlistRoutes = require('./routes/waitlist');

const app = express();

// Middleware
app.use(cors);
app.use(express.json());

// Routes
app.use('/api/waitlist', waitlistRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    message: 'FounderCoach API is running'
  });
});

// Handle 404
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('API Error:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

module.exports = app;
