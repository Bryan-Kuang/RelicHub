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
          return null;
        }

        try {
          // 演示模式特殊处理
          if (isDemoMode) {
            console.log("🎭 演示模式登录验证");
            // 在演示模式下，直接检查演示用户数据
            const user = await userAdapter.findUnique(credentials.email, true);

            if (user && user.email === credentials.email) {
              // 演示模式下简化密码验证（实际项目中不要这样做）
              if (credentials.password === "password123") {
                return {
                  id: user.id,
                  email: user.email,
                  name: user.name,
                  isAdmin: user.isAdmin,
                };
              }
            }
            return null;
          }

          // 生产模式：正常的数据库验证流程
          const user = await userAdapter.findUnique(credentials.email, true);

          if (!user) {
            return null;
          }

          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isPasswordValid) {
            return null;
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            isAdmin: user.isAdmin,
          };
        } catch (error) {
          console.error("Authentication error:", error);
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
        token.isAdmin = user.isAdmin;
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
  secret: process.env.NEXTAUTH_SECRET,
};
