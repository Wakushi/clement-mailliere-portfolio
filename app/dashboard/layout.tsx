"use client"
import clsx from "clsx"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ReactNode } from "react"
import { MdAnimation, MdDraw } from "react-icons/md"
import { RiSketching } from "react-icons/ri"
import { SlScreenDesktop } from "react-icons/sl"

interface PortalPageLayoutProps {
  children: ReactNode
}

export default function DashboardPageLayout({
  children,
}: PortalPageLayoutProps) {
  return (
    <div className="w-full min-h-[100vh]">
      <div className="flex flex-col pt-[6rem] md:pt-[8rem] h-fit min-h-[inherit]">
        <div className="">
          <nav className="">
            <ul className="flex gap-4 border-t border-b border-t-gray-700 border-b-gray-700 w-full items-center justify-around">
              <AdminNavLink endpoint="drawings" title="Drawings" />
              <AdminNavLink endpoint="animations" title="Animations" />
              <AdminNavLink endpoint="sketches" title="Sketches" />
              <AdminNavLink endpoint="demo" title="Demo" />
            </ul>
          </nav>
        </div>
        <div>{children}</div>
      </div>
    </div>
  )
}

function AdminNavLink({
  endpoint,
  title,
}: {
  endpoint: string
  title: string
}) {
  const pathname = usePathname()

  function isActiveEndpoint(seekedPath: string): boolean {
    const path = pathname.split("/")
    return path.includes(seekedPath)
  }

  const Icon = () => {
    switch (endpoint) {
      case "animations":
        return <MdAnimation />
      case "sketches":
        return <RiSketching />
      case "drawings":
        return <MdDraw />
      case "demo":
        return <SlScreenDesktop />
      default:
        return <MdAnimation />
    }
  }

  return (
    <>
      <li
        className={clsx("px-6 py-2 rounded m-1 md:hidden", {
          "bg-indigo-800": isActiveEndpoint(endpoint),
        })}
      >
        <Link href={`/dashboard/${endpoint}`}>
          <Icon />
        </Link>
      </li>
      <li
        className={clsx("px-6 py-2 rounded m-1 hidden md:block", {
          "bg-indigo-800": isActiveEndpoint(endpoint),
        })}
      >
        <Link href={`/dashboard/${endpoint}`}>{title}</Link>
      </li>
    </>
  )
}
