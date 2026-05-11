import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectToDatabase } from "@/lib/db";
import User from "@/models/user";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    // src/app/api/auth/[...nextauth]/route.ts

async signIn({ user, account }) {
  if (account?.provider === "google") {
    try {
      await connectToDatabase();

      // 1. Guard clause (Narrowing the type)
      if (!user.email) {
        console.error("No email returned from Google");
        return false;
      }

      // 2. Use 'as string' to satisfy the Mongoose type checker
      const existingUser = await User.findOne({ email: user.email as string });

      if (!existingUser) {
        await User.create({
          name: user.name || undefined,
          email: user.email, // TypeScript knows this is a string now
          image: user.image || undefined,
          role: "student", 
          provider: "google",
        });
      }
      return true;
    } catch (error) {
      console.error("Error during Google sign-in:", error);
      return false;
    }
  }
  return true;
},

    async jwt({ token, user, trigger, session }) {
      // Fetch role from DB on initial sign-in
      if (user && user.email) {
        await connectToDatabase();
        const dbUser = await User.findOne({ email: user.email });
        if (dbUser) {
          token.role = dbUser.role;
          token.id = dbUser._id.toString();
        }
      }

      // Allow session updates (e.g., if a user's role is changed while logged in)
      if (trigger === "update" && session?.role) {
        token.role = session.role;
      }

      return token;
    },

    async session({ session, token }) {
      // Sync the JWT token data to the client-side session
      if (session.user) {
        (session.user as any).role = token.role;
        (session.user as any).id = token.id;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt", 
  },
  pages: {
    signIn: "/login",
  },
});

export { handler as GET, handler as POST };