import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { verifyPassword } from "../../../lib/auth-util";

const prisma = new PrismaClient();
export default NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
    // auto logout after 30 days
    maxAge: 30 * 24 * 60 * 60,
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const userFound = await prisma.user.findFirst({
          where: { email: credentials.email },
        });
        if (!userFound) {
          prisma.$disconnect();
          throw new Error("Incorrect email or password.");
        }
        const isValidPassword = verifyPassword(
          credentials.password,
          userFound.password
        );
        if (!isValidPassword) {
          prisma.$disconnect();
          throw new Error("Incorrect email or password.");
        }
        return {
          name: userFound.name,
          email: userFound.email,
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
});
