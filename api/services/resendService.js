import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const sendWaitlistNotification = async (waitlistData) => {
  try {
    const { email, position, timestamp } = waitlistData;
    const date = new Date(timestamp).toLocaleString();

    const { data, error } = await resend.emails.send({
      from: process.env.FROM_EMAIL || 'noreply@foundercoach.xyz',
      to: process.env.TO_EMAIL || 'levarlux@proton.me',
      subject: 'New Beta Tester Signup! 🚀',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .container {
                background-color: #f9f9f9;
                border-radius: 8px;
                padding: 20px;
                border: 1px solid #ddd;
              }
              .header {
                color: #FF4F00;
                font-size: 24px;
                font-weight: bold;
                margin-bottom: 20px;
              }
              .info {
                margin: 10px 0;
                padding: 10px;
                background-color: #fff;
                border-left: 3px solid #FF4F00;
              }
              .label {
                font-weight: bold;
                color: #666;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">=== NEW WAITLIST SIGNUP ===</div>
              
              <div class="info">
                <span class="label">📧 Email:</span> ${email}
              </div>
              
              <div class="info">
                <span class="label">🎯 Position:</span> #${position} in queue
              </div>
              
              <div class="info">
                <span class="label">⏰ Time:</span> ${date}
              </div>
            </div>
          </body>
        </html>
      `
    });

    if (error) {
      console.error('Resend API Error:', error);
      throw error;
    }

    console.log('Email sent successfully:', data);
    return { success: true, data };
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

export { sendWaitlistNotification };
