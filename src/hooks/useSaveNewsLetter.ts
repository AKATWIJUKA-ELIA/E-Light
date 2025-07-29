"use client";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

interface Newsletter {
  subject: string
  content: string
  recipients: string[]
  status: "draft" | "sent" | "scheduled" | "failed" | "bounced"
  DateSent?: Date | number
  scheduledTime?: Date | number
}
const useSaveNewsLetter= ()=>{
        const SaveNewsLetter = useMutation(api.NewsLetter.CreateNewsLetter);
        const save = async (newsletter: Newsletter) => {
                try {
                        // Convert Date fields to numbers (timestamps) if necessary
                        const payload = {
                                ...newsletter,
                                DateSent: 0,
                                scheduledTime: newsletter.scheduledTime instanceof Date ? newsletter.scheduledTime.getTime() : newsletter.scheduledTime,
                        };
                        await SaveNewsLetter(payload);
                        return { success: true, message: "Newsletter saved successfully" };
                } catch (error) {
                                return { success: false, message: error};
                        }
                }
                return {save}
        };
     
        export default useSaveNewsLetter;

