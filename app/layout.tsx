import "./globals.css"
import { montserrat } from "@/styles/font"
import { ReactNode } from "react"
import Header from "@/components/header"
import HeaderShell from "@/components/header-shell"
import Head from "next/head"
import { Toaster } from "@/components/ui/toaster"
import Providers from "@/providers"

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="en">
      <Head>
        <title>Portfolio of a 2D/FX Animator & Illustrator</title>
        <meta
          name="description"
          content="Explore the creative portfolio of a professional 2D/FX animator and illustrator. Featuring a diverse range of animations, illustrations, and visual effects."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="author" content="Clément Mailliere" />
        <meta
          name="keywords"
          content="2D Animation, FX Animation, Illustrator, Animation Portfolio, Visual Effects, Creative Artist"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body
        className={`${montserrat.className} relative`}
        suppressHydrationWarning={true}
      >
        <Providers>
          <HeaderShell headerContent={<Header />} />
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}
