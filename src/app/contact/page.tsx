import ContactPageClient from "./ContactClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Inetz Technologies Chennai - Internship & Training Support",
  description: "Get in touch with Inetz Technologies for internship inquiries, placement support, or corporate training in Chennai. Visit our Vadapalani office or call us today.",
  keywords: [
    "Contact Inetz Technologies", 
    "Software training Chennai phone number", 
    "Vadapalani training center address", 
    "Internship support Chennai", 
    "IT training inquiry"
  ],
  alternates: {
    canonical: "https://inetztech.com/contact",
  },
};

export default function ContactPage() {
  return <ContactPageClient />;
}
