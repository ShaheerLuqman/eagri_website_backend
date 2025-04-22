# Eagri Website Backend

A Node.js backend for the Eagri website built with Express.

## Features

- Express.js web framework
- CORS enabled
- Security headers with Helmet
- Request logging with Morgan
- Environment variable configuration
- Error handling middleware
- Vercel deployment ready
- Contact form functionality with Gmail SMTP integration

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Gmail account with App Password

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=3000
   NODE_ENV=development
   
   # Gmail SMTP Configuration
   GMAIL_USER=your-gmail@gmail.com
   GMAIL_APP_PASSWORD=your-16-digit-app-password
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Available Scripts

- `npm run dev`: Start the development server with hot-reload
- `npm start`: Start the production server
- `npm test`: Run tests

## Project Structure

```
.
├── src/
│   ├── index.js           # Main application file
│   ├── routes/
│   │   └── emailRoutes.js # Contact form routes
│   └── services/
│       └── emailService.js # Gmail SMTP service implementation
├── .env                   # Environment variables
├── package.json           # Project dependencies and scripts
├── vercel.json            # Vercel deployment configuration
└── .gitignore            # Git ignore file
```

## API Endpoints

### Contact Form API

#### Submit Contact Form
- **URL**: `/ContactUsForm`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "category": "General Inquiry",
    "name": "John Doe",
    "email": "john@example.com",
    "subject": "Question about services",
    "message": "Hello, I would like to know more about your services."
  }
  ```
- **Success Response**:
  ```json
  {
    "success": true,
    "message": "Contact form submitted successfully",
    "messageId": "<message-id>"
  }
  ```
- **Error Response**:
  ```json
  {
    "success": false,
    "error": "Error message"
  }
  ```

## Gmail App Password Setup

1. Go to your Google Account settings
2. Navigate to Security
3. Enable 2-Step Verification if not already enabled
4. Go to App Passwords (under 2-Step Verification)
5. Select "Mail" and your device
6. Generate and copy the 16-digit App Password
7. Use this password in your `.env` file as `GMAIL_APP_PASSWORD`

## Deployment

This project is configured for deployment on Vercel:

1. Install Vercel CLI (optional):
   ```bash
   npm i -g vercel
   ```

2. Deploy to Vercel:
   ```bash
   vercel
   ```

   Or connect your GitHub repository to Vercel for automatic deployments.

3. Configure environment variables in Vercel dashboard:
   - Add Gmail SMTP configuration variables
   - Set NODE_ENV to "production"

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Submit a pull request

## License

This project is licensed under the MIT License. 