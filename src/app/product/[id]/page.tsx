import { Metadata } from "next";
import { notFound } from "next/navigation";
import connectToDatabase from "@/lib/mongodb";
import Product from "@/models/Product";
import ProductClient from "./ProductClient";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  
  try {
    await connectToDatabase();
    const product = await Product.findById(id).lean();
    
    if (!product) return { title: "Product Not Found | Viral Hub" };

    const p = product as any;
    
    return {
      title: `${p.title} | Viral Beauty & Fashion Find`,
      description: p.description,
      openGraph: {
        title: p.title,
        description: p.description,
        images: [{ url: p.imageUrl }],
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: p.title,
        description: p.description,
        images: [p.imageUrl],
      }
    };
  } catch (error) {
    return { title: "Viral Hub Product" };
  }
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  
  try {
    await connectToDatabase();
    const product = await Product.findById(id).lean();

    if (!product) {
      notFound();
    }

    // Prepare serializable product data
    const serializableProduct = {
      ...product,
      _id: product._id?.toString(),
      createdAt: product.createdAt?.toString(),
      updatedAt: product.updatedAt?.toString(),
    };

    return <ProductClient product={serializableProduct} />;
  } catch (error) {
    console.error("Error loading product:", error);
    notFound();
  }
}
