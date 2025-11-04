# EmailJS Setup Guide for GitHub Pages

Since GitHub Pages only serves static files (no backend), we'll use EmailJS to send emails directly from the browser.

## Step 1: Create EmailJS Account

1. Go to https://www.emailjs.com/
2. Sign up for a free account (500 emails/month free)
3. Verify your email address

## Step 2: Create an Email Service

1. In EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider:
   - **Gmail** (recommended)
   - **Outlook**
   - **Yahoo**
   - Or any other SMTP service
4. Follow the setup instructions for your provider
5. **Important for Gmail:** You'll need to enable "Less secure app access" OR use an App Password

## Step 3: Create an Email Template

1. Go to **Email Templates** in the dashboard
2. Click **Create New Template**
3. Use this template:

**Template Name:** `portfolio_contact`

**Subject:** `[Portfolio] {{subject}}`

**Content (HTML):**
```html
<div style="font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #111; max-width: 600px; margin: 0 auto;">
  <div style="background: linear-gradient(135deg, #ef4444, #7f1d1d); padding: 20px; border-radius: 8px 8px 0 0;">
    <h2 style="margin: 0; color: white;">New Portfolio Message</h2>
  </div>
  <div style="background: #f9fafb; padding: 20px; border-radius: 0 0 8px 8px; border: 1px solid #e5e7eb;">
    <p style="margin: 10px 0;"><strong>Name:</strong> {{from_name}}</p>
    <p style="margin: 10px 0;"><strong>Email:</strong> {{from_email}}</p>
    <p style="margin: 10px 0;"><strong>Subject:</strong> {{subject}}</p>
    <hr style="border: none; border-top: 2px solid #e5e7eb; margin: 20px 0;" />
    <div style="background: white; padding: 15px; border-radius: 4px; border-left: 4px solid #ef4444;">
      <p style="margin: 0; white-space: pre-wrap; color: #374151;">{{message}}</p>
    </div>
  </div>
</div>
```

**To Email:** Your email address (e.g., `kambleadi0205@gmail.com`)

**From Name:** `{{from_name}}`

**Reply To:** `{{from_email}}`

4. Click **Save**

## Step 4: Get Your API Keys

1. Go to **Account** → **General** in EmailJS dashboard
2. Find your **Public Key** (starts with `user_`)
3. Go to **Email Services** and note your **Service ID**
4. Go to **Email Templates** and note your **Template ID**

## Step 5: Update script.js

Open `script.js` and find these lines (around line 325):

```javascript
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';
```

Replace with your actual values:

```javascript
const EMAILJS_SERVICE_ID = 'service_xxxxxxx'; // Your Service ID
const EMAILJS_TEMPLATE_ID = 'template_xxxxxxx'; // Your Template ID
const EMAILJS_PUBLIC_KEY = 'user_xxxxxxx'; // Your Public Key
```

## Step 6: Test

1. Save all files
2. Deploy to GitHub Pages or test locally
3. Fill out the contact form and submit
4. Check your email inbox!

## Security Notes

- The Public Key is safe to expose in frontend code
- EmailJS handles rate limiting (500 emails/month on free plan)
- All emails are sent through EmailJS's secure servers
- Your email credentials are stored securely in EmailJS, not in your code

## Troubleshooting

### "Email service not configured" error
- Make sure you've replaced all three values in script.js
- Check that the keys are correct (no extra spaces)

### Emails not received
- Check your spam folder
- Verify the "To Email" in your template is correct
- Check EmailJS dashboard for error logs

### Rate limit exceeded
- Free plan: 500 emails/month
- Upgrade to paid plan if needed
- Or deploy your Node.js backend separately

## Alternative: Deploy Node.js Backend Separately

If you prefer to use your Node.js backend:

1. Deploy backend to:
   - **Railway** (railway.app) - Free tier available
   - **Render** (render.com) - Free tier available
   - **Heroku** (heroku.com) - Paid plans
   - **Vercel** (vercel.com) - Serverless functions

2. Update `script.js` to use your backend URL instead of EmailJS

3. Set environment variables in your hosting platform

