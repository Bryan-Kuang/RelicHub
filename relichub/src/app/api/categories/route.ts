import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/db";
import { authOptions } from "@/lib/auth";

// 获取所有类别
export async function GET(req: NextRequest) {
  try {
    const categories = await prisma.category.findMany();
    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json({ error: "获取类别失败" }, { status: 500 });
  }
}

// 创建新类别
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user.isAdmin) {
      return NextResponse.json({ error: "未授权" }, { status: 401 });
    }

    const data = await req.json();
    const category = await prisma.category.create({
      data: {
        name: data.name,
        description: data.description,
      },
    });

    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "创建类别失败" }, { status: 500 });
  }
}
