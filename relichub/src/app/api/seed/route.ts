import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { prisma } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    // 检查是否已存在用户
    const userCount = await prisma.user.count();

    if (userCount > 0) {
      return NextResponse.json(
        { message: "数据库已经包含用户，跳过初始化" },
        { status: 200 }
      );
    }

    // 创建管理员用户
    const adminUser = await prisma.user.create({
      data: {
        name: "管理员",
        email: "admin@example.com",
        password: await hash("password123", 12),
        isAdmin: true,
      },
    });

    // 创建示例类别
    const categories = await Promise.all([
      prisma.category.create({
        data: {
          name: "瓷器",
          description: "中国传统瓷器，包括青花瓷、粉彩瓷等",
        },
      }),
      prisma.category.create({
        data: {
          name: "玉器",
          description: "各朝代玉石雕刻艺术品",
        },
      }),
      prisma.category.create({
        data: {
          name: "书画",
          description: "中国传统书法与绘画作品",
        },
      }),
    ]);

    // 创建示例产品
    const products = await Promise.all([
      prisma.product.create({
        data: {
          name: "明代青花瓷花瓶",
          description: "明代青花瓷器，保存完好，纹饰清晰，具有很高的收藏价值。",
          price: 15000,
          imageUrl: "/products/vase.jpg",
          amazonUrl: "https://www.amazon.com/dp/example1",
          categoryId: categories[0].id,
          featured: true,
        },
      }),
      prisma.product.create({
        data: {
          name: "清代和田玉摆件",
          description: "清代和田玉雕刻，玉质温润，雕工精细，保存状态良好。",
          price: 8800,
          imageUrl: "/products/jade.jpg",
          amazonUrl: "https://www.amazon.com/dp/example2",
          categoryId: categories[1].id,
          featured: true,
        },
      }),
    ]);

    return NextResponse.json(
      {
        message: "初始化数据成功",
        admin: { id: adminUser.id, email: adminUser.email },
        categoriesCount: categories.length,
        productsCount: products.length,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("初始化数据失败:", error);
    return NextResponse.json({ error: "初始化数据失败" }, { status: 500 });
  }
}
