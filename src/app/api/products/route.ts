import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Product from "@/models/Product";
import { writeFile } from "fs/promises";
import path from "path";
import fs from "fs";

export async function GET(request: Request) {
  try {
    await connectToDatabase();
    // Default sort by viralScore
    const products = await Product.find({}).sort({ viralScore: -1 });
    return NextResponse.json({ success: true, data: products });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    
    // Parse the multipart form data (for file uploads)
    const formData = await request.formData();
    const file = formData.get("image") as File;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const category = formData.get("category") as string || "Beauty";
    const affiliateLink = formData.get("affiliateLink") as string;

    let imageUrl = "";

    // Handle File Upload to public/uploads
    if (file && file.size > 0) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
      const uploadDir = path.join(process.cwd(), "public", "uploads");
      
      // Create directory if it doesn't exist
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      
      // Create a unique file name
      const fileName = `${Date.now()}-${file.name.replace(/\s+/g, '_')}`;
      const filePath = path.join(uploadDir, fileName);
      
      await writeFile(filePath, buffer);
      
      // Store the public URL path
      imageUrl = `/uploads/${fileName}`;
    }

    const product = await Product.create({
      title,
      description,
      category,
      affiliateLink,
      imageUrl
    });

    return NextResponse.json({ success: true, data: product }, { status: 201 });
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
