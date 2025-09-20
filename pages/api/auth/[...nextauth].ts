import bcrypt from "bcrypt";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/libs/prismadb";
import { randomBytes, randomUUID } from "crypto";

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "email",
          type: "text",
        },
        password: {
          label: "password",
          type: "password",
        },
      },
      async authorize(credentials) {
        console.log("Credentials: ", credentials);
        // if (!credentials?.email || !credentials?.password) {
        //   return null;
        // }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials?.email,
          },
        });

        console.log("Fetched User: ", user);

        // if (!user || !user?.hashedPassword) {
        //   return null;
        // }

        const isCorrectPassword = await bcrypt.compare(
          credentials?.password as string,
          user?.hashedPassword as string
        );

        console.log("Correct Password: ", isCorrectPassword);
        if (!isCorrectPassword) {
          return null;
        }

        console.log(user);

        return user;
      },
    }),
  ],

  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
    generateSessionToken: () => {
      return randomUUID() ?? randomBytes(32).toString("hex");
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});
