import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import AnalyticsEvent from "@/models/AnalyticsEvent";
import Product from "@/models/Product";

export async function GET() {
  try {
    // Note: Add Admin authentication check here
    await connectToDatabase();

    // 1. Total Events
    const totalViews = await AnalyticsEvent.countDocuments({ eventType: { $in: ["page_view", "product_view"] } });
    const totalClicks = await AnalyticsEvent.countDocuments({ eventType: { $in: ["button_click", "affiliate_click"] } });
    
    // 2. Unique Visitors (Sessions)
    const uniqueSessions = await AnalyticsEvent.distinct("sessionId");
    const totalVisitors = uniqueSessions.length;

    // 3. Top Trending Products
    const topProducts = await Product.find()
      .sort({ viralScore: -1 })
      .limit(5)
      .select("title views clicks viralScore imageUrl");

    const ctr = totalViews > 0 ? ((totalClicks / totalViews) * 100).toFixed(2) : 0;

    return NextResponse.json({
      success: true,
      data: {
        overview: {
          totalVisitors,
          totalViews,
          totalClicks,
          ctr: `${ctr}%`
        },
        topProducts
      }
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
