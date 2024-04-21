import NextAuth, { NextAuthOptions } from "next-auth";
import Providers from "next-auth/providers";

export const authOptions: NextAuthOptions = {
  providers: [
    {
      id: "040823224614",
      name: "Worldcoin",
      type: "oauth",
      version: "2.0",
      authorizationUrl: "https://id.worldcoin.org/login/oauth/authorize",
      tokenUrl: "https://id.worldcoin.org/login/oauth/access_token",
      profileUrl: "https://api.worldcoin.org/user",
      clientId: process.env.WLD_CLIENT_ID,
      clientSecret: process.env.WLD_CLIENT_SECRET,
      scope: "040823224614", 
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
        };
      },
    },
  ],
  callbacks: {
    async jwt({ token }) {
      if (token) {
        token.userRole = "admin"; // Example: Assigning a user role
      }
      return token;
    },
  },
};

export default NextAuth(authOptions);
