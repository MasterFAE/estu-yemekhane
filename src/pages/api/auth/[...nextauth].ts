import NextAuth, { type NextAuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";

// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../../../server/db/client";
import { env } from "../../../env/server.mjs";
import Credentials from "next-auth/providers/credentials";
import argon2 from "argon2";

export const authOptions: NextAuthOptions = {
  // Include user.id on session
  callbacks: {
    jwt({ token, user }) {
      if (token && user) {
        token.user = user;
      }
      return token;
    },
    session({ session, token }) {
      if (token && token.user) {
        session.user = token.user;
      }

      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    // DiscordProvider({
    //   clientId: env.DISCORD_CLIENT_ID,
    //   clientSecret: env.DISCORD_CLIENT_SECRET,
    // }),
    Credentials({
      name: "Log In",
      type: "credentials",
      credentials: {
        username: {
          label: "Username",
          type: "username",
          placeholder: "johndoe",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const { username, password } = credentials as {
          username: string;
          password: string;
        };
        // console.log(await argon2.hash(password));
        const user = await prisma.user.findFirst({ where: { name: username } });
        if (!user) return null;
        const result = await argon2.verify(user.password, password);
        if (!result) return null;
        return { id: user.id, username: user.name };
      },
    }),
    // ...add more providers here
  ],
  pages: {
    signIn: "/auth/login",
  },
};

export default NextAuth(authOptions);
