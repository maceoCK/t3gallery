import "~/styles/globals.css";
import "@uploadthing/react/styles.css";
import { ClerkProvider } from "@clerk/nextjs";
import TopNav from "./_components/topnav";
import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { ourFileRouter } from "./api/uploadthing/core";
import { extractRouterConfig } from "uploadthing/server";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";

export const metadata: Metadata = {
  title: "T3 Image Gallery",
  description: "Image Gallery made with t3",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${GeistSans.variable}`}>
        <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
        <body className="flex min-h-screen flex-col gap-y-4">
          <TopNav />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
