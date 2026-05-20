import type { Metadata } from "next";
import "./globals.css";
import { AppShell } from "@/components/app-shell";
import { ToastContainer } from "@/components/ui/toast";
import { NextAuthSessionProvider } from "@/components/session-provider";

export const metadata: Metadata = {
  title: "leadRX10 — AI-Powered B2B Prospecting",
  description: "Find, engage, and close your ideal customers with AI-powered lead intelligence.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body className="h-full antialiased">
        <NextAuthSessionProvider>
          <AppShell>{children}</AppShell>
          <ToastContainer />
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}
