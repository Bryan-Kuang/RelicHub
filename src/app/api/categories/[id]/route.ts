import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/db";
import { authOptions } from "@/lib/auth";

// 获取单个类别详情
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const category = await prisma.category.findUnique({
      where: {
        id: params.id,
      },
      include: {
        products: true,
      },
    });

    if (!category) {
      return NextResponse.json({ error: "类别未找到" }, { status: 404 });
    }

    return NextResponse.json(category);
  } catch (error) {
    return NextResponse.json({ error: "获取类别详情失败" }, { status: 500 });
  }
}

// 更新类别
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
    const category = await prisma.category.update({
      where: {
        id: params.id,
      },
      data: {
        name: data.name,
        description: data.description,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    return NextResponse.json({ error: "更新类别失败" }, { status: 500 });
  }
}

// 删除类别
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user.isAdmin) {
      return NextResponse.json({ error: "未授权" }, { status: 401 });
    }

    // 检查是否有产品关联到此类别
    const productsCount = await prisma.product.count({
      where: {
        categoryId: params.id,
      },
    });

    if (productsCount > 0) {
      return NextResponse.json(
        { error: "无法删除此类别，因为它包含产品" },
        { status: 400 }
      );
    }

    await prisma.category.delete({
      where: {
        id: params.id,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "删除类别失败" }, { status: 500 });
  }
}
