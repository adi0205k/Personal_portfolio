// Simple Express server to handle contact form and send email via Nodemailer
require('dotenv').config();

const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({ origin: true }));
app.options('*', cors());
app.use(express.json());

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

// Email validation helper
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Contact endpoint
app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body || {};

  // Validate required fields
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ 
      ok: false, 
      error: 'Missing required fields. Please fill in all fields.' 
    });
  }

  // Validate email format
  if (!isValidEmail(email)) {
    return res.status(400).json({ 
      ok: false, 
      error: 'Invalid email address format.' 
    });
  }

  // Check if SMTP configuration is set
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.error('SMTP configuration is missing. Please check your .env file.');
    return res.status(500).json({ 
      ok: false, 
      error: 'Server configuration error. Please contact the site administrator.' 
    });
  }

  try {
    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587', 10),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      // Add timeout to prevent hanging
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 10000,
    });

    // Verify connection
    await transporter.verify();

    const toEmail = process.env.TO_EMAIL || process.env.SMTP_USER;
    const sanitizedSubject = subject.replace(/[<>]/g, '');
    const sanitizedMessage = message.replace(/[<>]/g, '');

    // Send email
    const info = await transporter.sendMail({
      from: `Portfolio Contact <${process.env.SMTP_USER}>`,
      to: toEmail,
      replyTo: email,
      subject: `[Portfolio] ${sanitizedSubject}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${sanitizedMessage}`,
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #111; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #ef4444, #7f1d1d); padding: 20px; border-radius: 8px 8px 0 0;">
            <h2 style="margin: 0; color: white;">New Portfolio Message</h2>
          </div>
          <div style="background: #f9fafb; padding: 20px; border-radius: 0 0 8px 8px; border: 1px solid #e5e7eb;">
            <p style="margin: 10px 0;"><strong>Name:</strong> ${name}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #ef4444; text-decoration: none;">${email}</a></p>
            <p style="margin: 10px 0;"><strong>Subject:</strong> ${sanitizedSubject}</p>
            <hr style="border: none; border-top: 2px solid #e5e7eb; margin: 20px 0;" />
            <div style="background: white; padding: 15px; border-radius: 4px; border-left: 4px solid #ef4444;">
              <p style="margin: 0; white-space: pre-wrap; color: #374151;">${sanitizedMessage}</p>
            </div>
          </div>
        </div>
      `,
    });

    console.log('Email sent successfully:', info.messageId);
    return res.json({ ok: true, messageId: info.messageId });
  } catch (err) {
    console.error('Email send error:', err);
    
    // Provide user-friendly error messages
    let errorMessage = 'Failed to send email. Please try again later.';
    
    if (err.code === 'EAUTH') {
      errorMessage = 'Email authentication failed. Please check your email credentials.';
    } else if (err.code === 'ETIMEDOUT' || err.code === 'ECONNECTION') {
      errorMessage = 'Connection timeout. Please check your internet connection and try again.';
    } else if (err.message) {
      errorMessage = err.message;
    }
    
    return res.status(500).json({ ok: false, error: errorMessage });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});


