import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const add = mutation({
  args: { stars: v.int64() },
  handler: async (ctx, args) => {
    await ctx.db.insert("ratings", { stars: args.stars });
  },
});
