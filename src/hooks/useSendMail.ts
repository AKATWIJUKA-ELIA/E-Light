import { NextResponse } from 'next/server';

export const useSendMail = () => {

  const sendEmail = async (to:string, subject: string, message: string) => {

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

      const res = await response.json()

      if (!res.success) {
        return NextResponse.json({success:false, message: 'Email not sent'}, {status: 400});
      }
      return NextResponse.json({success:true, message: 'Email sent successfully'}, {status: 200});
    } catch {
        return NextResponse.json({success:false, message: 'Internal Server Error'}, {status: 500});
    } 
  };

  return {sendEmail};
};
