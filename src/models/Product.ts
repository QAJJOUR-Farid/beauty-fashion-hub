import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProduct extends Document {
  title: string;
  description: string;
  category: string;
  affiliateLink: string;
  imageUrl: string;
  views: number;
  clicks: number;
  viralScore: number;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true, default: "Beauty" },
    affiliateLink: { type: String, required: true },
    imageUrl: { type: String, required: true },
    views: { type: Number, default: 0 },
    clicks: { type: Number, default: 0 },
    viralScore: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Calculate viral score before saving if views/clicks have changed
ProductSchema.pre("save", function () {
  const doc = this as any as IProduct;
  if (doc.isModified("views") || doc.isModified("clicks")) {
    const ctr = doc.views > 0 ? doc.clicks / doc.views : 0;
    doc.viralScore = doc.clicks * ctr * 1.5;
  }
});

const Product: Model<IProduct> = mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);

export default Product;
