"use client"
import "./globals.css"
import { montserrat } from "@/styles/font"
import { ReactNode } from "react"
import Header from "@/components/header"
import HeaderShell from "@/components/header-shell"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient()

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} relative`}>
        <QueryClientProvider client={queryClient}>
          <HeaderShell headerContent={<Header />} />
          {children}
        </QueryClientProvider>
      </body>
    </html>
  )
}
