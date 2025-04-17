import { useState } from 'react';

export const useSendMail = () => {
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(false);

  const sendEmail = async ( subject: string, message: string) => {
    setSending(true);
    setError(false);

    try {
      const response = await fetch('/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: 'eliatranquil@gmail.com',
          subject,
          text: `${message}`,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Email sent:", data.message);
      } else {
        setError(true);
        console.error("Email sending failed:", data.message);
      }
    } catch (err) {
      setError(true);
      console.error("An error occurred while sending the email.", err);
    } finally {
      setSending(false);
    }
  };

  return {
    sendEmail,
    sending,
    error,
  };
};
