import type { Metadata } from "next"
import "./globals.css"
import { montserrat } from "@/styles/font"
import { ReactNode } from "react"
import Header from "@/components/header"

export const metadata: Metadata = {
  title: "Clement Mailliere - Portfolio",
  description: "Animator, illustrator and UI designer portfolio",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <Header />
        {children}
      </body>
    </html>
  )
}
