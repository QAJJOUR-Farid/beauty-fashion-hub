import mongoose, { Schema, Document, Model } from "mongoose";

export interface IAnalyticsEvent extends Document {
  productId: mongoose.Types.ObjectId;
  eventType: "page_view" | "product_view" | "button_click" | "affiliate_click";
  sessionId: string;
  timestamp: Date;
}

const AnalyticsEventSchema: Schema = new Schema(
  {
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: false },
    eventType: { 
      type: String, 
      enum: ["page_view", "product_view", "button_click", "affiliate_click"],
      required: true 
    },
    sessionId: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
  }
);

// Index for faster queries on dashboards
AnalyticsEventSchema.index({ eventType: 1, timestamp: -1 });
AnalyticsEventSchema.index({ productId: 1, eventType: 1 });

const AnalyticsEvent: Model<IAnalyticsEvent> = mongoose.models.AnalyticsEvent || mongoose.model<IAnalyticsEvent>("AnalyticsEvent", AnalyticsEventSchema);

export default AnalyticsEvent;
