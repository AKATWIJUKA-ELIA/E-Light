import { components,internal  } from "./_generated/api";
import { vEmailId, vEmailEvent, Resend } from "@convex-dev/resend";
import { internalMutation, mutation } from "./_generated/server";
import { v } from "convex/values";


export const resend: Resend = new Resend(components.resend, {
        testMode:false,
        onEmailEvent: internal.sendEmail.handleEmailEvent,
});
export const handleEmailEvent = internalMutation({
  args: {
    id: vEmailId,
    event: vEmailEvent,
  },
  handler: async (ctx, args) => {
    console.log("Got called back!", args.id, args.event);
    // Probably do something with the event if you care about deliverability!
    return null
  },
});

export const sendEmail = mutation({
        args:{
                receiverEmail: v.string(),
                subject: v.string(),
                html: v.string(),
                replyTo: v.optional(v.string()),
                department: v.string(),
        },
  handler: async (ctx,args) => {
        try{
    await resend.sendEmail(ctx, {
      from: `${args.department} <${args.department}@support.lighttech.me>`,
      to: `${args.receiverEmail}`,
      subject: args.subject,
      html: args.html,
    });
        return { success: true, message: "Email sent successfully", status: 200 };
} catch (error) {
    return { success: false, message: "Failed to send email", error: (error instanceof Error ? error.message : String(error)), status: 500 };
}
  },
});
