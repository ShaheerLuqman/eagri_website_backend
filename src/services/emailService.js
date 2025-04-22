const nodemailer = require('nodemailer');

// Configuration for email recipients
const EMAIL_CONFIG = {
  recipients: ['eagri.pk@gmail.com'] // Replace with your fixed recipient email(s)
};

// Create reusable transporter object using Gmail SMTP
let transporter;

try {
  // Validate environment variables
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    throw new Error('Missing Gmail credentials in environment variables');
  }

  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD
    }
  });

  // Verify transporter configuration
  transporter.verify(function (error, success) {
    if (error) {
      console.error('SMTP connection error:', error);
    }
  });
} catch (error) {
  console.error('Error initializing email service:', error.message);
}

function makeContactFormBody(formData) {
  // Create a formatted HTML email body
  const htmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333;">New Contact Form Submission</h2>
      <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px;">
        <p><strong>Category:</strong> ${formData.category}</p>
        <p><strong>Name:</strong> ${formData.name}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Subject:</strong> ${formData.subject}</p>
        <p><strong>Message:</strong></p>
        <div style="white-space: pre-wrap; background-color: white; padding: 10px; border-radius: 3px;">
          ${formData.message}
        </div>
      </div>
    </div>
  `;

  // Create a plain text version for email clients that don't support HTML
  const textBody = `
New Contact Form Submission

Category: ${formData.category}
Name: ${formData.name}
Email: ${formData.email}
Subject: ${formData.subject}

Message:
${formData.message}
  `;

  return {
    html: htmlBody,
    text: textBody
  };
}

/**
 * Send a contact form email using Gmail SMTP
 * @param {Object} formData - Contact form data
 * @param {string} formData.category - Contact category
 * @param {string} formData.name - Sender's name
 * @param {string} formData.email - Sender's email
 * @param {string} formData.subject - Email subject
 * @param {string} formData.message - Email message
 * @returns {Promise} - Resolves with info about the sent email
 */
async function sendContactFormEmail(formData) {
  try {
    // Check if credentials are available
    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
      throw new Error('Gmail credentials not configured. Please check your .env file.');
    }

    const { html, text } = makeContactFormBody(formData);

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: EMAIL_CONFIG.recipients.join(', '),
      replyTo: formData.email,
      subject: `Contact Form: ${formData.category} - ${formData.subject}`,
      text,
      html
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Contact form email sent:', info.messageId);
    
    return {
      success: true,
      messageId: info.messageId
    };
  } catch (error) {
    console.error('Error sending contact form email:', error.message);
    throw error;
  }
}

module.exports = {
  sendContactFormEmail,
  EMAIL_CONFIG
}; 