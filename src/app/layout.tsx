import type { Metadata } from "next";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";

export const metadata: Metadata = {
  title: "PigRepresentative — WriterDecks for OpenClaw",
  description: "A curated directory of distraction-free writing devices that can run OpenClaw",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}
