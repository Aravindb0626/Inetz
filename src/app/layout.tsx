import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Toaster } from "sonner";
import Providers from "./providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://inetztech.com"),
  title: {
    default: "Inetz Technologies | Best Internships in Chennai",
    template: "%s | Inetz Technologies",
  },
  description: "Accelerate your tech career with the best internships in Chennai. Expert-led training in MERN Stack, Python, and AI with 100% placement support.",
  keywords: [
    "Best Internship in Chennai",
    "Inetz Technologies",
    "Full Stack Development Internship Chennai",
    "Software Engineering Internship",
    "IT Training and Placement Chennai",
    "Python Internship Chennai",
    "Data Science Internship Chennai"
  ],
  authors: [{ name: "Inetz Technologies" }],
  creator: "Inetz Technologies",
  publisher: "Inetz Technologies",
  alternates: {
    canonical: "https://inetztech.com",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://inetztech.com",
    siteName: "Inetz Technologies",
    title: "Best Internships in Chennai | Get Placement Ready",
    description: "Real-world internships and guaranteed placement support at Inetz Technologies Chennai.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Best Internships in Chennai - Inetz Technologies",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Inetz Technologies | Best Internship in Chennai",
    description: "Join the top-rated internship program in Chennai for hands-on tech training.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className={`${inter.className} min-h-full flex flex-col bg-white text-zinc-900`}>
        {/* NextAuth context sits at the absolute top of the body execution stack */}
        <Providers>
          <ThemeProvider forcedTheme="light">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <WhatsAppButton />
            <Toaster position="top-center" richColors />
            
            {/* Combined Organization & Local Business Schema */}
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@graph": [
                    {
                      "@type": "Organization",
                      "@id": "https://inetztech.com/#organization",
                      "name": "Inetz Technologies",
                      "url": "https://inetztech.com",
                      "logo": "https://inetztech.com/logo.png",
                      "sameAs": [
                        "https://www.linkedin.com/company/inetztech",
                        "https://www.facebook.com/inetztech",
                        "https://www.instagram.com/inetztech",
                        "https://www.youtube.com/@inetztech"
                      ]
                    },
                    {
                      "@type": "EducationalOrganization",
                      "name": "Inetz Technologies",
                      "description": "Provider of the best internships in Chennai with a focus on Full Stack Development and Placement.",
                      "address": {
                        "@type": "PostalAddress",
                        "addressLocality": "Chennai",
                        "addressRegion": "TN",
                        "postalCode": "600001",
                        "addressCountry": "IN"
                      },
                      "telephone": "+91-9840234475",
                      "url": "https://inetztech.com",
                      "image": "https://inetztech.com/logo.png"
                    }
                  ]
                })
              }}
            />
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}