"use client"
import Footer from "@/components/footer"
import NavLink from "@/components/nav-link"

export default function LandingPage() {
  return (
    <div className="flex flex-col justify-center items-center relative h-[100dvh] overflow-hidden">
      <section className="hero">
        <nav>
          <ul className="flex flex-col gap-[1rem] relative z-2 md:flex-row">
            {/* DRAWINGS LINK */}
            <NavLink
              href="/drawings"
              src="/images/drawings.webp"
              title="Drawings"
            />
            {/* ANIMATIONS LINK */}
            <NavLink
              href="/animations"
              src="/images/animations.gif"
              title="Animations"
            />
            {/* SKETCHES LINK */}
            <NavLink
              href="/sketches"
              src="/images/sketches.gif"
              title="Sketches"
            />
            {/* DEMO LINK */}
            <NavLink href="/demo" src="/images/demo.gif" title="Demo" />
          </ul>
        </nav>
      </section>
      <Footer />
    </div>
  )
}
