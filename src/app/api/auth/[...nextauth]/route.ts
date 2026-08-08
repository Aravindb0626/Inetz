import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDatabase } from "@/lib/db";
import User from "@/models/user";
import bcrypt from "bcryptjs";

const DUMMY_HASH =
  "$2b$10$e8m4L.3vT8g9kS.eG2u.3e3/uW9x8Z7Y6X5W4V3U2T1S0R9Q8P7O";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please enter both email and password.");
        }

        await connectToDatabase();

        const cleanEmail = credentials.email.trim().toLowerCase();
        const dbUser = await User.findOne({ email: cleanEmail }).select(
          "+password",
        );

        const hashToCompare = dbUser?.password || DUMMY_HASH;
        const isPasswordCorrect = await bcrypt.compare(
          credentials.password,
          hashToCompare,
        );

        if (!dbUser || !isPasswordCorrect) {
          throw new Error("Invalid email or access key.");
        }

        if (dbUser.provider === "google" && !dbUser.password) {
          throw new Error(
            "This account uses Google Login. Please sign in via Google.",
          );
        }

        return {
          id: dbUser._id.toString(),
          name: dbUser.name as string,
          email: dbUser.email as string,
          image: dbUser.image ? String(dbUser.image) : null, // Fixes TS wrapper error
          role: (dbUser.role as string) || "student",
        };
      },
    }),
  ],

  callbacks: {
    // ─── OAUTH SIGN-IN & DATABASE SYNC ────────────────────────────────────────
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          await connectToDatabase();

          if (!user.email) {
            console.error(
              "OAuth Error: No email returned from Google provider.",
            );
            return false;
          }

          const cleanEmail = user.email.toLowerCase();
          let dbUser = await User.findOne({ email: cleanEmail });

          if (!dbUser) {
            dbUser = await User.create({
              name: user.name || "Student",
              email: cleanEmail,
              image: user.image || undefined,
              role: "student",
              provider: "google",
            });
          }

          // Pass MongoDB ID and role down to jwt callback
          user.id = dbUser._id.toString();
          (user as any).role = dbUser.role || "student";

          return true;
        } catch (error) {
          console.error("Error during Google sign-in sync:", error);
          return false;
        }
      }
      return true;
    },

    // ─── JWT TOKEN ENRICHMENT ──────────────────────────────────────────────────
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role || "student";
      }

      if (trigger === "update" && session?.role) {
        token.role = session.role;
      }

      return token;
    },

    // ─── SESSION CONTEXT SYNCHRONIZATION ──────────────────────────────────────
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).role = token.role || "student";
      }
      return session;
    },

    // ─── OPEN REDIRECT SANITIZATION ───────────────────────────────────────────
    async redirect({ url, baseUrl }) {
      // Allow relative internal redirects (/dashboard, /admin)
      if (url.startsWith("/")) {
        return `${baseUrl}${url}`;
      }
      // Allow redirects on the exact same origin
      else if (new URL(url).origin === baseUrl) {
        return url;
      }
      return baseUrl;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
