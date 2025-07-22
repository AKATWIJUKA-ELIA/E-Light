import { internalMutation, internalQuery, internalAction, mutation } from "./_generated/server";
import { v } from "convex/values";
import { cronJobs } from "convex/server";
import { internal, api } from "./_generated/api";
import { Id } from "./_generated/dataModel";


export const UpdateProduct = mutation({
        args:{_id:v.id("products")},
        handler:async(ctx,args)=>{
                const Initproduct = await ctx.db.get(args._id);
              const product=   await ctx.db.patch(args._id,{
                        product_sponsorship:{
                                status:"expired",
                                duration:Initproduct?.product_sponsorship?.duration,
                                type:Initproduct?.product_sponsorship?.type,
                        }
                })
                  return product;
        },
        
})
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
export const findExpiredSubscriptions = internalQuery({
  args: {},
  handler: async (ctx) => {
    const now = Date.now();
    return await ctx.db
      .query("boosts")
      .withIndex("by_duration_and_notified", (q) =>
        q
      .lte("duration", now)
      )
      .collect().then(results => results.filter(boost => boost.status === "active" && boost.notified === true));
  },
});
// Mutation: Mark subscription as notified
export const markNotified = internalMutation({
  args: { subscriptionId: v.id("boosts") },
  handler: async (ctx, { subscriptionId }) => {
    await ctx.db.patch(subscriptionId, { notified: true });
  },
});
// Mutation: Mark subscription as Expired
export const markExpired = internalMutation({
  args: { subscriptionId: v.id("boosts") },
  handler: async (ctx, { subscriptionId }) => {
    await ctx.db.patch(subscriptionId, { status: "expired" });
  },
});


// Action: Send notification emails for expiring subscriptions
export const notifyExpiringSubscriptions = internalAction({
  args: {},
  handler: async (ctx) => {
    const expiring = await ctx.runQuery(internal.crons.findExpiringSubscriptions, {});
    for (const sub of expiring) {
      // Get user email
      const user = await ctx.runQuery(api.users.GetCustomerById, { id: sub.user_id as Id<"customers"> });
      if (!user?.email) continue;
      // Send email
      await ctx.runMutation(api.sendEmail.sendEmail, {
        receiverEmail: user.email,
        subject: "Your subscription is expiring soon",
        html: `Hi, your subscription will expire on ${new Date(sub.duration)}. Please renew soon!`,
        department:"support",
      });
      // Mark as notified
      await ctx.runMutation(internal.crons.markNotified, { subscriptionId: sub._id });
    }
  },
});

// Action: Send notification emails for Expired subscriptions
export const notifyExpiredSubscriptions = internalAction({
  args: {},
  handler: async (ctx) => {
    const expired = await ctx.runQuery(internal.crons.findExpiredSubscriptions, {});
    for (const sub of expired) {
        //get the Product and update its sponsorship status
        if (!sub.product_id || !sub.user_id) break;
      const product = await ctx.runQuery(api.products.getProduct, { id: sub.product_id as Id<"products"> });
      await ctx.runMutation(api.crons.UpdateProduct,{_id:product?._id as Id<"products">})
      // Get user email
      const user = await ctx.runQuery(api.users.GetCustomerById, { id: sub.user_id as Id<"customers"> });
      if (!user?.email) continue;
      // Send email
      await ctx.runMutation(api.sendEmail.sendEmail, {
        receiverEmail: user.email,
        subject: "Your subscription has expired",
        html: `Hi, your subscription has Expired today ${new Date(Date.now()).toLocaleString()}. Please renew to get your benefits back!`,
        department:"support",
      });
        // Mark as expired
      await ctx.runMutation(internal.crons.markExpired, { subscriptionId: sub._id });
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
crons.interval(
  "Notify expired subscriptions",
  { minutes: 1 },
  internal.crons.notifyExpiredSubscriptions,
  {}
);
export default crons;