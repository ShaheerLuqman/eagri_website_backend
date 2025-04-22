const express = require('express');
const router = express.Router();
const { sendContactFormEmail } = require('../services/emailService');

/**
 * @route POST /ContactUsForm
 * @desc Handle contact form submission
 * @access Public
 */
router.post('/', async (req, res) => {
  try {
    const { category, name, email, subject, message } = req.body;

    // Validate required fields
    if (!category || !name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: category, name, email, subject, and message are required'
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid email format'
      });
    }

    // Send the contact form email
    const result = await sendContactFormEmail({
      category,
      name,
      email,
      subject,
      message
    });

    res.json({
      success: true,
      message: 'Contact form submitted successfully',
      ...result
    });
  } catch (error) {
    console.error('Error in contact form submission:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to process contact form submission'
    });
  }
});

module.exports = router; 