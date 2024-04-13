"use client"
import { useEffect, useRef } from "react"

export default function HeaderShell({
  headerContent,
}: {
  headerContent: JSX.Element
}) {
  const lastScrollTop = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY || document.documentElement.scrollTop
      if (currentScroll > lastScrollTop.current) {
        document.querySelector("header")?.classList.add("hide-header")
      } else {
        document.querySelector("header")?.classList.remove("hide-header")
      }
      lastScrollTop.current = currentScroll <= 0 ? 0 : currentScroll
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <header className="fixed flex items-center justify-between top-0 z-[3] w-full p-2 md:py-[2rem] md:px-[4rem] text-white transition duration-500 bg-gradient-to-t from-transparent to-black">
      {headerContent}
    </header>
  )
}
