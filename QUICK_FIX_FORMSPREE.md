# Quick Fix: Use Formspree (Easiest Solution)

If you want the contact form working immediately without any backend setup, use Formspree:

## Step 1: Get Formspree Endpoint

1. Go to https://formspree.io/
2. Sign up for free (50 submissions/month free)
3. Create a new form
4. Copy your form endpoint (looks like: `https://formspree.io/f/YOUR_FORM_ID`)

## Step 2: Update index.html

Replace the form opening tag in `index.html`:

**Find this line (around line 430):**
```html
<form id="contactForm">
```

**Replace with:**
```html
<form id="contactForm" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

Replace `YOUR_FORM_ID` with your actual Formspree form ID.

## Step 3: Update script.js

Since Formspree handles the submission, you can simplify the form handler OR keep it for validation. The current code will work but you can also let Formspree handle it natively.

**Option A: Keep current validation (Recommended)**
- The current code will work, just make sure the form action is set correctly

**Option B: Use native Formspree submission**
- Remove the `e.preventDefault()` to let Formspree handle it naturally
- But you'll lose the custom loading states

## Step 4: Test

1. Save files
2. Deploy to GitHub Pages
3. Submit the form
4. Check your email (the email you used to sign up for Formspree)

## Pros of Formspree

✅ **No backend required** - Works directly with static sites  
✅ **No API keys needed** - Just a form endpoint  
✅ **Spam protection** - Built-in spam filtering  
✅ **Email notifications** - Automatic emails to you  
✅ **Easy setup** - 2 minutes to configure  

## Cons

- 50 submissions/month on free plan
- Formspree branding on free plan (can be removed with paid plan)
- Less customization than EmailJS

---

**Alternative: Use EmailJS** (see EMAILJS_SETUP.md for detailed instructions)
- More customization
- 500 emails/month free
- Better email templates

