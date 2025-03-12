import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const base_url = process.env.NEXT_PUBLIC_BASE_URL;

export const nextAuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        senha: { label: "Senha", type: "password" },
      },

      async authorize(credentials) {
        const response = await fetch(base_url + "/login", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            email: credentials?.email,
            senha: credentials?.senha,
          }),
        });

        const user = await response.json();
        console.log("userFetch: ", user);
        if (user && response.ok && user.acesso !== "bloqueado") {
          return user;
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      user && (token.user = user);
      return token;
    },
    async session({ session, token }) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      session = token.user as any;
      return session;
    },
  },
  session: {
    maxAge: 36000,
  },
};
