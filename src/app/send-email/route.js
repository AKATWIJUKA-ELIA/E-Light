
import nodemailer from 'nodemailer';
require('dotenv').config();
export async function POST(request) {
  const body = await request.json();
  const { to, subject, html } = body;

  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com', // Replace with your SMTP host
      port: 465, // Replace with your SMTP port
      secure: true, // Use true for port 465, false for others
      auth: {
        user: process.env.SMTP_USER, // Add to your .env file
        pass: process.env.SMTP_PASSWORD, // Add to your .env file
      },
    });

    const mailOptions = {
      from:"eliaakjtrnq@gmail.com",
      to,
      subject,
      html,
    };

    const info = await transporter.sendMail(mailOptions);

    return new Response(JSON.stringify({ message: 'Email sent successfully!', info }), { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return new Response(JSON.stringify({ message: 'Failed to send email', error }), { status: 500 });
  }
}
