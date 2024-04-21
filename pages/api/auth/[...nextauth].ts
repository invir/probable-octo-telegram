import NextAuth, { NextAuthOptions } from "next-auth"

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export const authOptions: NextAuthOptions = {
  // https://next-auth.js.org/configuration/providers/oauth
  providers: [
    {
      id: "040823224614",
      name: "Worldcoin",
      type: "oauth",
      wellKnown: "https://id.worldcoin.org/login/oauth/authorize",
      authorization: { params: { scope: "" } },
      clientId: process.env.WLD_CLIENT_ID,
      clientSecret: process.env.WLD_CLIENT_SECRET,
      idToken: true,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.sub,
          credentialType: profile["https://id.worldcoin.org/v1"].credential_type,
        }
      },
    },
  ],
  callbacks: {
    async jwt({ token }) {
      token.userRole = "admin"
      return token
    },
  },
}

export default NextAuth(authOptions)
