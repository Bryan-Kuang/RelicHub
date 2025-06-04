import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/db";
import { authOptions } from "@/lib/auth";

// 获取所有产品
export async function GET(req: NextRequest) {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: true,
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: "获取产品失败" }, { status: 500 });
  }
}

// 创建新产品
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user.isAdmin) {
      return NextResponse.json({ error: "未授权" }, { status: 401 });
    }

    const data = await req.json();

    // 验证至少有一个购买链接
    const amazonUrl = data.amazonUrl?.trim() || null;
    const ebayUrl = data.ebayUrl?.trim() || null;

    if (!amazonUrl && !ebayUrl) {
      return NextResponse.json(
        { message: "请至少提供一个购买链接（Amazon或eBay）" },
        { status: 400 }
      );
    }

    const product = await prisma.product.create({
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        imageUrl: data.imageUrl || null,
        amazonUrl: amazonUrl,
        ebayUrl: ebayUrl,
        categoryId: data.categoryId,
        featured: data.featured || false,
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("创建产品失败:", error);
    return NextResponse.json({ error: "创建产品失败" }, { status: 500 });
  }
}
