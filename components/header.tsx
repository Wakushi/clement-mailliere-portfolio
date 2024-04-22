"use client"
import Link from "next/link"
import Hamburger from "./hamburger"
import { FaConnectdevelop, FaInstagram, FaLinkedin } from "react-icons/fa"
import { CiLogout } from "react-icons/ci"
import { MdDashboard } from "react-icons/md"
import { useUserSession } from "@/lib/hooks"
import { logOut } from "@/lib/auth"
import { useRouter } from "next/navigation"
import { User } from "firebase/auth"

export default function Header() {
  const userSession = useUserSession(null)
  const user: User | null = userSession
  const router = useRouter()

  function hamburgerMenuToggle(): void {
    document.getElementById("hamburger-menu")?.classList.toggle("open")
    document.getElementById("modal")?.classList.toggle("show-modal")
  }

  async function onLogout() {
    try {
      await logOut()
    } catch (error) {
      console.error(error)
    } finally {
      router.push("/")
    }
  }

  return (
    <>
      <Link href="/" className="flex flex-col items-center cursor-pointer">
        <h2 className="font-bold text-[1.3rem] uppercase">Clément Mailliere</h2>
        <p>2D/FX Animator / Illustrator</p>
      </Link>
      <nav className="hidden lg:flex">
        <ul className="flex justify-center">
          <ModalNavLink href="/drawings" title="Drawings" />
          <ModalNavLink href="/animations" title="Animations" />
          <ModalNavLink href="/sketches" title="Sketches" />
        </ul>
      </nav>
      <nav className="hidden lg:flex items-center justify-center gap-4">
        <SocialLinks />
        <LogButton user={user} onLogout={onLogout} />
      </nav>
      <Hamburger hamburgerMenuToggle={hamburgerMenuToggle} />
      <NavModal
        user={user}
        hamburgerMenuToggle={hamburgerMenuToggle}
        onLogout={onLogout}
      />
    </>
  )
}

function NavModal({
  user,
  hamburgerMenuToggle,
  onLogout,
}: {
  user: any
  hamburgerMenuToggle: () => void
  onLogout: () => void
}) {
  return (
    <div
      id="modal"
      className="absolute right-0 top-0 z-3 w-screen h-screen opacity-0 pt-[4rem] p-y-16 bg-[#111] shadow-lg translate-x-full transition duration-500 rounded-tr-none rounded-br-none rounded-bl-lg rounded-tl-lg overflow-hidden lg:top-[83px]"
    >
      <div className="modal">
        <nav>
          <ul className="flex flex-col justify-center">
            <ModalNavLink
              href="/drawings"
              title="Drawings"
              hamburgerMenuToggle={hamburgerMenuToggle}
            />
            <ModalNavLink
              href="/animations"
              title="Animations"
              hamburgerMenuToggle={hamburgerMenuToggle}
            />
            <ModalNavLink
              href="/sketches"
              title="Sketches"
              hamburgerMenuToggle={hamburgerMenuToggle}
            />
          </ul>
        </nav>
        <nav className="flex items-center justify-center gap-4">
          <SocialLinks />
          <LogButton
            user={user}
            onLogout={onLogout}
            hamburgerMenuToggle={hamburgerMenuToggle}
          />
        </nav>
      </div>
    </div>
  )
}

function ModalNavLink({
  href,
  title,
  hamburgerMenuToggle,
}: {
  href: string
  title: string
  hamburgerMenuToggle?: () => void
}) {
  return (
    <li
      className="uppercase text-white text-center p-10 cursor-pointer lg:p-4 lg:px-6 lg:gap-2.5"
      onClick={hamburgerMenuToggle}
    >
      <Link href={href} className="relative nav-link-text">
        {title}
      </Link>
    </li>
  )
}

function SocialLinks() {
  return (
    <ul className="flex items-center justify-center gap-4">
      <li className="p-4">
        <Link
          href="https://www.linkedin.com/in/clement-mailliere/"
          target="_blank"
        >
          <FaLinkedin className="text-[1.7rem] opacity-70 transition-all ease-in cursor-pointer hover:opacity-100" />
        </Link>
      </li>
      <li className="p-4">
        <Link href="https://www.instagram.com/ness.mkart/" target="_blank">
          <FaInstagram className="text-[1.7rem] opacity-70 transition-all ease-in cursor-pointer hover:opacity-100" />
        </Link>
      </li>
    </ul>
  )
}

function LogButton({
  user,
  onLogout,
  hamburgerMenuToggle,
}: {
  user: any
  onLogout: () => void
  hamburgerMenuToggle?: () => void
}) {
  return (
    <ul className="flex items-center justify-center gap-4">
      {user ? (
        <>
          <li className="p-4">
            <Link onClick={hamburgerMenuToggle} href="/dashboard/drawings">
              <MdDashboard className="text-[1.7rem] opacity-70 transition-all ease-in cursor-pointer hover:opacity-100" />
            </Link>
          </li>
          <li className="p-4">
            <CiLogout
              className="text-[1.7rem] opacity-70 transition-all ease-in cursor-pointer hover:opacity-100"
              onClick={onLogout}
            />
          </li>
        </>
      ) : (
        <li className="p-4">
          <Link onClick={hamburgerMenuToggle} href="/login">
            <FaConnectdevelop className="text-[1.7rem] opacity-70 transition-all ease-in cursor-pointer hover:opacity-100" />
          </Link>
        </li>
      )}
    </ul>
  )
}
