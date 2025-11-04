# Quick EmailJS Setup (5 Minutes)

Follow these steps to get your contact form working:

## Step 1: Create EmailJS Account (2 minutes)

1. Go to **https://www.emailjs.com/**
2. Click **Sign Up** (use Google account or email)
3. Verify your email

## Step 2: Add Email Service (1 minute)

1. In dashboard, click **Email Services** → **Add New Service**
2. Choose **Gmail** (or your email provider)
3. Click **Connect Account** and authorize
4. **Copy the Service ID** (looks like `service_xxxxxxx`)

## Step 3: Create Email Template (1 minute)

1. Click **Email Templates** → **Create New Template**
2. **Template Name:** `portfolio_contact`
3. **Subject:** `[Portfolio] {{subject}}`
4. **Content:** Copy and paste this:

```
Name: {{from_name}}
Email: {{from_email}}
Subject: {{subject}}

Message:
{{message}}
```

5. **To Email:** `kambleadi0205@gmail.com`
6. **From Name:** `{{from_name}}`
7. **Reply To:** `{{from_email}}`
8. Click **Save**
9. **Copy the Template ID** (looks like `template_xxxxxxx`)

## Step 4: Get Public Key (30 seconds)

1. Go to **Account** → **General**
2. Find **Public Key** (looks like `user_xxxxxxx`)
3. **Copy it**

## Step 5: Update script.js (30 seconds)

Open `script.js` and find these lines (around line 322):

```javascript
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';
```

Replace with your actual values:

```javascript
const EMAILJS_SERVICE_ID = 'service_abc123';  // Your Service ID from Step 2
const EMAILJS_TEMPLATE_ID = 'template_xyz789'; // Your Template ID from Step 3
const EMAILJS_PUBLIC_KEY = 'user_def456';      // Your Public Key from Step 4
```

## Step 6: Test!

1. Save `script.js`
2. Refresh your page
3. Fill out the contact form
4. Submit it
5. Check your email (kambleadi0205@gmail.com)!

## ✅ Done!

Your form now works both locally and on GitHub Pages!

---

**Need help?** Make sure:
- All three values are replaced (not "YOUR_SERVICE_ID" etc.)
- No extra spaces or quotes
- Service is connected and active
- Template is saved

