import type { Metadata } from "next";
import Head from "next/head";
import { Providers } from "./providers";
import { Toaster } from "@/components/shadcn-ui/toaster";
import "@/styles/globals.css"

import { primary_font } from "@/lib/fonts";
import { cn } from "@/lib/utils";


export const metadata: Metadata = {
  title: "Quantos",
  description: "Everybody can understand quantum computing - Quantos is your beginner-friendly suite for learning about and programming quantum annealers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" suppressHydrationWarning>
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </Head>
      <body className={cn("flex flex-col min-h-screen bg-background antialiased", primary_font.className)}>
        <Providers
          attribute="class"
          defaultTheme="system"
        >
          <div className="flex flex-col justify-between flex-grow">
            {children}
          </div>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
