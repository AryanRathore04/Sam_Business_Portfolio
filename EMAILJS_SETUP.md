# 📧 EmailJS Setup Instructions for AryanVerse Contact Form

EmailJS allows you to send emails directly from your frontend without needing a backend server. Follow these steps to set up your contact form.

## 🚀 Quick Setup (5 minutes)

### Step 1: Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click "Sign Up" and create a free account
3. Verify your email address

### Step 2: Connect Your Email Service

1. In your EmailJS dashboard, go to **"Email Services"**
2. Click **"Add New Service"**
3. Choose your email provider:

   - **Gmail** (recommended)
   - **Outlook**
   - **Yahoo**
   - **Custom SMTP**

4. **For Gmail:**
   - Select "Gmail"
   - Click "Connect Account"
   - Sign in with your Gmail account
   - Give permission to EmailJS

### Step 3: Create Email Template

1. Go to **"Email Templates"** in your dashboard
2. Click **"Create New Template"**
3. Use this template content:

**Subject:**

```
New Contact from {{from_name}} - AryanVerse
```

**Body:**

```html
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h2
    style="color: #CFC29F; border-bottom: 2px solid #CFC29F; padding-bottom: 10px;"
  >
    New Contact Form Submission - AryanVerse
  </h2>

  <div
    style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;"
  >
    <h3 style="color: #333; margin-top: 0;">Contact Details:</h3>
    <p><strong>Name:</strong> {{from_name}}</p>
    <p><strong>Email:</strong> {{from_email}}</p>
    <p><strong>To:</strong> {{to_name}}</p>
  </div>

  <div style="background-color: #f0f0f0; padding: 20px; border-radius: 8px;">
    <h3 style="color: #333; margin-top: 0;">Message:</h3>
    <p style="line-height: 1.6; white-space: pre-wrap;">{{message}}</p>
  </div>

  <div
    style="margin-top: 20px; padding: 15px; background-color: #e8f4f8; border-radius: 8px;"
  >
    <p style="margin: 0; font-size: 14px; color: #666;">
      This message was sent from the AryanVerse portfolio contact form.
    </p>
  </div>
</div>
```

4. Click **"Save"** and note down the **Template ID**

### Step 4: Get Your Configuration Keys

1. Go to **"Integration"** in your EmailJS dashboard
2. Note down these three values:
   - **Service ID** (from your email service)
   - **Template ID** (from your template)
   - **Public Key** (from Integration page)

### Step 5: Update Your .env File

Open your `.env` file and replace the placeholder values:

```env
VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx
VITE_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxx
```

### Step 6: Test Your Setup

1. Restart your development server: `npm run dev`
2. Go to your website's contact form
3. Fill out and submit a test message
4. Check your email inbox for the message

## 🎯 EmailJS Dashboard Locations

- **Service ID**: Email Services → Your Service → Service ID
- **Template ID**: Email Templates → Your Template → Template ID
- **Public Key**: Integration → Public Key

## ✅ Benefits of EmailJS

- ✅ **No Backend Required**: Sends emails directly from frontend
- ✅ **Free Tier**: 200 emails/month for free
- ✅ **Easy Setup**: No SMTP configuration needed
- ✅ **Reliable**: Enterprise-grade email delivery
- ✅ **Multiple Providers**: Works with Gmail, Outlook, Yahoo, etc.

## 🔒 Security Notes

- Your Public Key is safe to expose in frontend code
- EmailJS handles all email authentication securely
- Rate limiting prevents spam abuse
- Your actual email credentials stay with EmailJS

## 🆘 Troubleshooting

**"EmailJS configuration is missing" error:**

- Check that all three environment variables are set in `.env`
- Make sure to restart your dev server after updating `.env`

**Emails not being received:**

- Check your spam/junk folder
- Verify your email service is properly connected in EmailJS dashboard
- Test with EmailJS's built-in test feature first

**Form submission fails:**

- Check browser console for detailed error messages
- Verify your Template ID and Service ID are correct
- Ensure your EmailJS account is verified

## 📞 Need Help?

- EmailJS Documentation: https://www.emailjs.com/docs/
- EmailJS Support: Available in your dashboard
- Check your EmailJS dashboard's "Logs" section for delivery status

---

Once set up, your AryanVerse contact form will send you professionally formatted emails whenever visitors submit messages! 🎉
