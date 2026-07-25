import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDatabase } from "@/lib/db";
import User from "@/models/user";
import bcrypt from "bcryptjs";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please enter both email and password.");
        }

        await connectToDatabase();

        // 1. Find the user in the database
        const dbUser = await User.findOne({ email: credentials.email.toLowerCase() });
        if (!dbUser) {
          throw new Error("No account found with this email.");
        }

        // 2. Prevent normal logging if they originally signed up via Google
        if (dbUser.provider === "google" && !dbUser.password) {
          throw new Error("This account uses Google Login. Please sign in via Google.");
        }

        // 3. Verify password
        const isPasswordCorrect = await bcrypt.compare(credentials.password, dbUser.password);
        if (!isPasswordCorrect) {
          throw new Error("Incorrect access key.");
        }

        // 4. Return user object structure safely
        return {
          id: dbUser._id.toString(),
          name: dbUser.name,
          email: dbUser.email,
          image: dbUser.image || undefined,
          role: dbUser.role || "student",
        } as any;
      }
    })
  ],
  callbacks: {
    async signIn({ user, account }) {
      // Handle OAuth creation and database sync during Google sign-in
      if (account?.provider === "google") {
        try {
          await connectToDatabase();

          if (!user.email) {
            console.error("No email returned from Google");
            return false;
          }

          let dbUser = await User.findOne({ email: user.email.toLowerCase() });

          if (!dbUser) {
            // Create user if they don't exist
            dbUser = await User.create({
              name: user.name || undefined,
              email: user.email.toLowerCase(),
              image: user.image || undefined,
              role: "student", 
              provider: "google",
            });
          }

          // CRITICAL FIX: Attach MongoDB id and role directly to user object
          // so the jwt callback can inherit them on Google login!
          user.id = dbUser._id.toString();
          (user as any).role = dbUser.role || "student";

          return true;
        } catch (error) {
          console.error("Error during Google sign-in:", error);
          return false;
        }
      }
      return true;
    },

    async jwt({ token, user, trigger, session }) {
      // Initial sign-in: pass database items down into token profile
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
      }

      // Handle interactive profile/session updates dynamically
      if (trigger === "update" && session?.role) {
        token.role = session.role;
      }

      return token;
    },

    async session({ session, token }) {
      // Synchronize backend session properties safely into active context state
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).role = token.role;
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