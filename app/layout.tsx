import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import "./globals.css";

const ibm = IBM_Plex_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400"],
  style: ["normal"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://chat-with-siri.vercel.app"),
  title: {
    default: "Chat With Siri",
    template: "%s | Chat With Siri",
  },
  description:
    "A simple text-to-speech chatbot (OpenAI's GPT-3 and ElevenLabs' API).",
  twitter: {
    card: "summary_large_image",
    creator: "@iambolajiayo",
  },
  openGraph: {
    locale: "en_US",
    type: "website",
    url: "https://chat-with-siri.vercel.app",
    images: [
      {
        url: "/og.jpg",
        width: 500,
        height: 500,
      },
    ],
  },
  keywords: [
    "chat",
    "siri",
    "openai",
    "gpt-3",
    "elevenlabs",
    "text-to-speech",
    "chatgpt",
    "elevenlabs sdk",
    "elevenlabs api",
    "elevenlabs typescript sdk",
    "next.js",
    "javascript",
    "typescript",
  ],
  authors: [{ name: "Bolaji Ayodeji", url: "https://bolajiayodeji.com" }],
  creator: "Bolaji Ayodeji",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={ibm.className}>{children}</body>
    </html>
  );
}
