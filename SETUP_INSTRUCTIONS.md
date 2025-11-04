# Portfolio Backend Setup Instructions

## Prerequisites
- Node.js installed on your system (version 14 or higher)
- A Gmail account (or any email service with SMTP support)

## Step 1: Install Dependencies

Open your terminal/command prompt in the project directory and run:

```bash
npm install
```

This will install all required packages:
- express
- nodemailer
- cors
- dotenv

## Step 2: Configure Gmail App Password

### For Gmail Users:

1. Go to your Google Account settings: https://myaccount.google.com/
2. Navigate to **Security** → **2-Step Verification** (enable it if not already enabled)
3. Scroll down and click on **App passwords**
4. Select **Mail** as the app and **Other (Custom name)** as the device
5. Enter "Portfolio Contact Form" as the name
6. Click **Generate**
7. **Copy the 16-character password** (you'll need this for the .env file)

**Important:** You cannot use your regular Gmail password. You MUST use an App Password.

## Step 3: Create .env File

1. Create a new file named `.env` in the project root directory
2. Copy the following content and fill in your details:

```env
# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false

# Your Gmail address
SMTP_USER=your-email@gmail.com

# Your Gmail App Password (the 16-character password from Step 2)
SMTP_PASS=your-16-character-app-password

# Email address where you want to receive messages (usually same as SMTP_USER)
TO_EMAIL=your-email@gmail.com

# Server Configuration
PORT=3001
```

**Replace:**
- `your-email@gmail.com` with your actual Gmail address
- `your-16-character-app-password` with the App Password you generated

## Step 4: Start the Server

Run the following command:

```bash
npm start
```

Or if you want to use nodemon for auto-restart during development:

```bash
npm run dev
```

You should see:
```
Server listening on http://localhost:3001
```

## Step 5: Test the Contact Form

1. Open your portfolio website (index.html)
2. Navigate to the Contact section
3. Fill out the form and submit
4. Check your email inbox for the message

## Troubleshooting

### "EAUTH" Error
- Make sure you're using an **App Password**, not your regular Gmail password
- Verify that 2-Step Verification is enabled on your Google Account
- Double-check that SMTP_USER and SMTP_PASS are correct in your .env file

### "Connection Timeout" Error
- Check your internet connection
- Verify firewall settings aren't blocking port 587
- Try using port 465 with SMTP_SECURE=true

### Server Not Starting
- Make sure port 3001 is not already in use
- Check that all dependencies are installed (`npm install`)
- Verify Node.js is installed (`node --version`)

### Email Not Received
- Check your spam/junk folder
- Verify TO_EMAIL is set correctly
- Check server console for error messages
- Make sure the server is running when you submit the form

## Alternative: Using Other Email Services

### Outlook/Hotmail
```env
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@outlook.com
SMTP_PASS=your-password
```

### Yahoo Mail
```env
SMTP_HOST=smtp.mail.yahoo.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@yahoo.com
SMTP_PASS=your-app-password
```

## Security Notes

- **Never commit your .env file to version control** (it's already in .gitignore)
- Keep your App Password secure
- Consider using environment variables on your hosting platform instead of .env file for production

## Production Deployment

For production deployment (like on Heroku, Vercel, or other platforms), set the environment variables in your hosting platform's dashboard instead of using a .env file.

