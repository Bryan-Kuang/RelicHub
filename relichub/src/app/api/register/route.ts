import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { prisma } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();

    // 检查必填字段
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "姓名、电子邮件和密码为必填项" },
        { status: 400 }
      );
    }

    // 检查邮箱是否已被使用
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return NextResponse.json({ error: "该邮箱已被注册" }, { status: 400 });
    }

    // 加密密码
    const hashedPassword = await hash(password, 12);

    // 创建用户
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    // 返回用户信息（不包含密码）
    return NextResponse.json(
      {
        id: user.id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: "注册失败" }, { status: 500 });
  }
}
