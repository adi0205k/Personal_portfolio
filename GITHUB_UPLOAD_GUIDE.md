# GitHub Upload Guide

## ✅ Files Ready to Upload

All your files are ready! Here's what will be uploaded:

### Core Files:
- ✅ `index.html` - Main portfolio page
- ✅ `styles.css` - Styling
- ✅ `script.js` - JavaScript (includes EmailJS config - safe to upload)
- ✅ `README.md` - Project documentation

### Images:
- ✅ `aditya.jpg` - Profile picture
- ✅ `id_1.jpg` - Additional image
- ✅ `Aditya_kamble_7397980205 AI.pdf` - Resume

### Documentation:
- ✅ `EMAILJS_SETUP.md` - Setup instructions
- ✅ `QUICK_EMAILJS_SETUP.md` - Quick setup guide
- ✅ `SETUP_INSTRUCTIONS.md` - Backend setup
- ✅ `QUICK_FIX_FORMSPREE.md` - Formspree alternative

### Configuration:
- ✅ `package.json` - Node.js dependencies
- ✅ `server.js` - Backend server (optional, for local use)
- ✅ `.gitignore` - Protects sensitive files

### ⚠️ Files Automatically Excluded (by .gitignore):
- ❌ `.env` - Environment variables (if you create one)
- ❌ `node_modules/` - Dependencies (will be regenerated)

## 🔒 Security Note

Your EmailJS credentials in `script.js` are **SAFE** to upload:
- ✅ **Public Key** - Meant to be public (it's in the name!)
- ✅ **Service ID** - Safe to expose
- ✅ **Template ID** - Safe to expose

These are designed to work in frontend code. Only your EmailJS account password is private.

## 📤 Upload Steps

### Method 1: Using GitHub Desktop (Easiest)

1. Download GitHub Desktop: https://desktop.github.com/
2. Install and sign in to your GitHub account
3. Click **File** → **Add Local Repository**
4. Choose your portfolio folder: `C:\Users\Admin\OneDrive\Desktop\New Portfolio`
5. Click **Publish repository**
6. Choose repository name (e.g., `portfolio` or `aditya-kamble-portfolio`)
7. Make it **Public** (so GitHub Pages works) or **Private**
8. Click **Publish**

### Method 2: Using Git Command Line

1. Open terminal in your portfolio folder:
   ```bash
   cd "C:\Users\Admin\OneDrive\Desktop\New Portfolio"
   ```

2. Initialize git (if not already done):
   ```bash
   git init
   ```

3. Add all files:
   ```bash
   git add .
   ```

4. Commit:
   ```bash
   git commit -m "Initial commit: Portfolio website"
   ```

5. Create repository on GitHub:
   - Go to https://github.com/new
   - Name it (e.g., `portfolio`)
   - Don't initialize with README
   - Click **Create repository**

6. Connect and push:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git branch -M main
   git push -u origin main
   ```
   (Replace `YOUR_USERNAME` and `YOUR_REPO_NAME` with your actual values)

### Method 3: Using GitHub Web Interface

1. Go to https://github.com/new
2. Create a new repository
3. Use the **upload files** option
4. Drag and drop all files (except `node_modules` if it exists)
5. Commit

## 🌐 Enable GitHub Pages

After uploading, make your site live:

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under **Source**, select **Deploy from a branch**
4. Choose **main** branch and **/ (root)** folder
5. Click **Save**
6. Wait 1-2 minutes
7. Your site will be live at: `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME`

## ✨ Final Checklist

Before uploading, make sure:
- [x] All files are saved
- [x] Contact form works (EmailJS configured)
- [x] Images are included
- [x] No `.env` file with secrets (it's in .gitignore)
- [x] README.md looks good

## 🎉 You're Ready!

Your portfolio is ready to go live on GitHub Pages! The contact form will work automatically since EmailJS is configured.

