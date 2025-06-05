import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { userAdapter } from "./demo-adapter";

// 检查是否为演示模式
const isDemoMode = process.env.DEMO_MODE === "true";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.log("❌ 登录失败：缺少邮箱或密码");
          return null;
        }

        try {
          console.log(`🔐 尝试登录用户: ${credentials.email}`);
          console.log(`🎭 演示模式状态: ${isDemoMode}`);

          // 演示模式特殊处理
          if (isDemoMode) {
            console.log("🎭 演示模式登录验证");
            // 在演示模式下，直接检查演示用户数据
            const user = await userAdapter.findUnique(credentials.email, true);
            console.log(`👤 找到用户: ${user ? user.email : "未找到"}`);

            if (user && user.email === credentials.email) {
              // 演示模式下简化密码验证（实际项目中不要这样做）
              if (credentials.password === "password123") {
                console.log("✅ 演示模式登录成功");
                return {
                  id: user.id,
                  email: user.email,
                  name: user.name,
                  isAdmin: Boolean(user.isAdmin),
                };
              } else {
                console.log("❌ 演示模式密码错误");
              }
            }
            return null;
          }

          // 生产模式：正常的数据库验证流程
          console.log("🏭 生产模式登录验证");
          const user = await userAdapter.findUnique(credentials.email, true);
          console.log(`👤 找到用户: ${user ? user.email : "未找到"}`);

          if (!user) {
            console.log("❌ 用户不存在");
            return null;
          }

          console.log("🔐 验证密码中...");
          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isPasswordValid) {
            console.log("❌ 密码错误");
            return null;
          }

          console.log("✅ 生产模式登录成功");
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            isAdmin: Boolean(user.isAdmin),
          };
        } catch (error) {
          console.error("❌ 认证错误详情:", error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.isAdmin = Boolean(user.isAdmin);
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub!;
        session.user.isAdmin = Boolean(token.isAdmin);
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET || "fallback-secret-for-development",
};
