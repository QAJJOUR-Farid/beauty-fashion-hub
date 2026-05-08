import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import AnalyticsEvent from "@/models/AnalyticsEvent";
import Product from "@/models/Product";
import mongoose from "mongoose";

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const body = await request.json();
    const { productId, eventType, sessionId } = body;

    if (!eventType || !sessionId) {
      return NextResponse.json({ success: false, error: "Missing required tracking fields" }, { status: 400 });
    }

    // Record the event
    await AnalyticsEvent.create({
      productId: productId ? new mongoose.Types.ObjectId(productId) : undefined,
      eventType,
      sessionId
    });

    // Update Product counters if applicable
    if (productId) {
      if (eventType === "product_view") {
        await Product.findByIdAndUpdate(productId, { $inc: { views: 1 } });
      } else if (eventType === "button_click" || eventType === "affiliate_click") {
        await Product.findByIdAndUpdate(productId, { $inc: { clicks: 1 } });
      }
      
      // The ProductSchema.pre("save") hook won't run on findByIdAndUpdate.
      // To calculate viralScore properly, we should load and save it, or just let it be updated periodically.
      // Let's do load and save for real-time accuracy on viral score.
      const product = await Product.findById(productId);
      if (product) {
        await product.save(); // triggers the pre-save hook to recalculate viralScore
      }
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Tracking error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
