import { NextResponse } from 'next/server';
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

export const useSendMail = () => {
         const sendWelcomeEmail = useMutation(api.sendEmail.sendEmail);
  const sendEmail = async (to:string, subject: string, message: string,department:string,replyTo?:string) => {

    try {
      const response = await sendWelcomeEmail({
        receiverEmail: to,
        subject: subject,
        html: message,
        replyTo: replyTo,
        department: department,})

      if (!response.success) {
        return {success:false, message: response.message||'Email not sent', status: 400};
      }
      return {success:true, message: response.message||'Email sent successfully',status: 200};
    } catch {
        return {success:false, message: 'Internal Server Error', status: 500};
    } 
  };

  return {sendEmail};
};
