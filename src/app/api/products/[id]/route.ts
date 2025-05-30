import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/db";
import { authOptions } from "@/lib/auth";

// 获取单个产品详情
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id: params.id,
      },
      include: {
        category: true,
      },
    });

    if (!product) {
      return NextResponse.json({ error: "产品未找到" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: "获取产品详情失败" }, { status: 500 });
  }
}

// 更新产品
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user.isAdmin) {
      return NextResponse.json({ error: "未授权" }, { status: 401 });
    }

    const data = await req.json();

    const product = await prisma.product.update({
      where: {
        id: params.id,
      },
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        imageUrl: data.imageUrl,
        amazonUrl: data.amazonUrl,
        categoryId: data.categoryId,
        featured: data.featured,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: "更新产品失败" }, { status: 500 });
  }
}

// 删除产品
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user.isAdmin) {
      return NextResponse.json({ error: "未授权" }, { status: 401 });
    }

    await prisma.product.delete({
      where: {
        id: params.id,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "删除产品失败" }, { status: 500 });
  }
}
