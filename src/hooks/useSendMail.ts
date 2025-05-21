import { useState } from 'react';

export const useSendMail = () => {
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(false);

  const sendEmail = async (to:string, subject: string, message: string) => {
    setSending(true);
    setError(false);

    try {
      const response = await fetch('/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: to,
          subject,
          text: `${message}`,
        }),
      });


      if (response.ok) {
        // console.log("Email sent:", data.message);
      } else {
        setError(true);
      }
    } catch (err) {
        console.error(err)
      setError(true);
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
