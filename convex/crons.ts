import { internalMutation, internalQuery, internalAction } from "./_generated/server";
import { v } from "convex/values";
import { cronJobs } from "convex/server";
import { internal, api } from "./_generated/api";



export const findExpiringSubscriptions = internalQuery({
  args: {},
  handler: async (ctx) => {
    const now = Date.now();
    const soon = now + 3 * 24 * 60 * 60 * 1000; // 3 days from now
    return await ctx.db
      .query("boosts")
      .withIndex("by_duration_and_notified", (q) =>
        q
      .gte("duration", now)
      .lte("duration", soon)
      )
      .collect()
      .then(results => results.filter(boost => boost.notified === false));
  },
});

// Mutation: Mark subscription as notified
export const markNotified = internalMutation({
  args: { subscriptionId: v.id("boosts") },
  handler: async (ctx, { subscriptionId }) => {
    await ctx.db.patch(subscriptionId, { notified: true });
  },
});


// Action: Send notification emails for expiring subscriptions
export const notifyExpiringSubscriptions = internalAction({
  args: {},
  handler: async (ctx) => {
    const expiring: Array<any> = await ctx.runQuery(internal.crons.findExpiringSubscriptions, {});
    for (const sub of expiring) {
      // Get user email
      const user = await ctx.runQuery(api.users.GetCustomerById, { id: sub.userId });
      if (!user?.email) continue;
      // Send email
      await ctx.runMutation(api.sendEmail.sendEmail, {
        receiverEmail: user.email,
        subject: "Your subscription is expiring soon",
        html: `Hi, your subscription will expire on ${new Date(sub.expiresAt).toLocaleDateString()}. Please renew soon!`,
        department:"support",
      });
      // Mark as notified
      await ctx.runMutation(internal.crons.markNotified, { subscriptionId: sub._id });
    }
  },
});

// Register cron job to run every hour
const crons = cronJobs();
crons.interval(
  "Notify expiring subscriptions",
  { hours: 1 },
  internal.crons.notifyExpiringSubscriptions,
  {}
);
export default crons;