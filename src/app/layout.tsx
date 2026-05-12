import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Toaster } from "sonner";
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://inetztech.com"),
  title: {
    default: "Inetz Technologies | Best Internship Training in Chennai with Placement",
    template: "%s | Inetz Technologies",
  },
  description: "Top-rated Internship training in Chennai. Get placement ready with Full stack training, MERN stack, Java, AI, and Data Science internships at Inetz Technologies.",
  keywords: [
    "Internship training in Chennai",
    "Full stack training Chennai",
    "MERN stack internship",
    "Java full stack course Chennai",
    "AI internship Chennai",
    "Data science internship Chennai",
    "Placement training Chennai",
    "Software training institute in Chennai",
    "Inetz Technologies",
    "Best internship with placement Chennai"
  ],
  authors: [{ name: "Inetz Technologies" }],
  creator: "Inetz Technologies",
  publisher: "Inetz Technologies",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://inetztech.com",
    siteName: "Inetz Technologies",
    title: "Inetz Technologies | Best Internship Training in Chennai",
    description: "Accelerate your tech career with expert-led training, real-world internships, and guaranteed placement support at Inetz Technologies.",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Inetz Technologies Chennai",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Inetz Technologies | Best Internship Training in Chennai",
    description: "Accelerate your tech career with expert-led training, real-world internships, and guaranteed placement support.",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://inetztech.com",
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
      <body className="min-h-full flex flex-col bg-white text-zinc-900 font-sans">
        <ThemeProvider forcedTheme="light">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppButton />
          <Toaster position="top-center" richColors />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "EducationalOrganization",
                "name": "Inetz Technologies",
                "url": "https://inetztech.com",
                "logo": "https://inetztech.com/logo.png",
                "description": "Leading software training and internship provider in Chennai, specializing in Full Stack, MERN, Java, and AI.",
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "KP Towers, Vadapalani",
                  "addressLocality": "Chennai",
                  "addressRegion": "TN",
                  "postalCode": "600026",
                  "addressCountry": "IN"
                },
                "geo": {
                  "@type": "GeoCoordinates",
                  "latitude": 13.0494,
                  "longitude": 80.2123
                },
                "contactPoint": {
                  "@type": "ContactPoint",
                  "telephone": "+91-9840234475",
                  "contactType": "admissions",
                  "areaServed": "IN",
                  "availableLanguage": "en"
                },
                "sameAs": [
                  "https://www.linkedin.com/company/inetztech",
                  "https://www.facebook.com/inetztech",
                  "https://www.instagram.com/inetztech",
                  "https://www.youtube.com/@inetztech"
                ],
                "hasOfferCatalog": {
                  "@type": "OfferCatalog",
                  "name": "Software Internship Programs",
                  "itemListElement": [
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Course",
                        "name": "MERN Stack Internship",
                        "description": "Full stack development using MongoDB, Express, React, and Node.js."
                      }
                    },
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Course",
                        "name": "Java Full Stack Internship",
                        "description": "Enterprise development with Java, Spring Boot, and Microservices."
                      }
                    },
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Course",
                        "name": "Python & AI Internship",
                        "description": "Machine Learning, AI, and Backend development with Python."
                      }
                    }
                  ]
                }
              })
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
