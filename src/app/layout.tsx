"use client";
import { Manrope } from "next/font/google";

import "./globals.css";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

import Navbar from "@/components/Navbar";
import Container from "@/components/Container";


const manrope = Manrope({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient()
  return (
    <html lang="en">
      <QueryClientProvider client={queryClient}>
        <body className={manrope.className}>
          <div className="px-5">
            <Navbar />
            <Container>
              {children}
            </Container>
          </div>

        </body>
      </QueryClientProvider>
    </html>
  );
}
