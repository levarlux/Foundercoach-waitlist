const express = require('express');
const { sendWaitlistNotification } = require('../services/resendService.cjs');

const router = express.Router();

// Validation helper
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

router.post('/', async (req, res) => {
  try {
    const { email, position, timestamp } = req.body;

    // Validate required fields
    if (!email || !position) {
      return res.status(400).json({
        error: 'Missing required fields',
        message: 'Email and position are required'
      });
    }

    // Validate email format
    if (!validateEmail(email)) {
      return res.status(400).json({
        error: 'Invalid email format',
        message: 'Please provide a valid email address'
      });
    }

    // Send email notification
    await sendWaitlistNotification({
      email,
      position,
      timestamp: timestamp || Date.now()
    });

    res.status(200).json({
      success: true,
      message: 'Waitlist submission successful',
      data: { email, position }
    });

  } catch (error) {
    console.error('Waitlist submission error:', error);
    
    res.status(500).json({
      error: 'Failed to process waitlist submission',
      message: 'Please try again later'
    });
  }
});

// Health check for waitlist route
router.get('/health', (req, res) => {
  res.status(200).json({
    service: 'waitlist',
    status: 'OK',
    timestamp: new Date().toISOString()
  });
});

module.exports = router;