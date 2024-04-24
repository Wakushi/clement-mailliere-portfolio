"use client"
import clsx from "clsx"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { IoIosClose, IoMdArrowDropright } from "react-icons/io"

interface NavLinkProps {
  href: string
  src: string
  title: string
  demo?: boolean
}

export default function NavLink({
  href,
  src,
  title,
  demo = false,
}: NavLinkProps) {
  const [showDemo, setShowDemo] = useState<boolean>(false)

  function triggerFullWidthDemo(e: any) {
    if (demo && !showDemo) {
      setTimeout(() => {
        const videoElement = document.querySelector(
          "#demoVideo"
        ) as HTMLVideoElement
        videoElement.play()
      }, 200)
    }
    if (demo && e.target.id !== "demoVideo") {
      setShowDemo((prevShow) => !prevShow)
    }
  }

  return (
    <li
      id={demo ? "demoLink" : ""}
      onClick={(e) => triggerFullWidthDemo(e)}
      className={clsx(
        "nav-link bg-black custom-box-shadow relative h-[100px] w-[400px] md:h-[700px] md:w-[100px] lg:h-[800px] lg:w-[100px] opacity-0 transition-all duration-500 ease-in-out overflow-hidden filter grayscale hover:h-[300px] hover:opacity-100 hover:grayscale-0  md:hover:h-[700px] md:hover:w-[500px] lg:hover:h-[800px] md:hover:w-[700px]",
        {
          "full-width-demo": showDemo,
          "fade-in-bottom-1": !showDemo,
        }
      )}
    >
      {showDemo && (
        <div
          id="closeDemo"
          onClick={(e) => {
            e.stopPropagation()
            triggerFullWidthDemo(e)
          }}
        >
          <IoIosClose className="absolute pointer-none z-2 text-[2.4rem] md:text-[2.9rem] top-[17px] right-[4px] md:top-[30px] md:right-[30px] opacity-50 hover:opacity-100 transition-opacity duration-500 z-40 cursor-pointer" />
        </div>
      )}
      {showDemo && (
        <video
          id="demoVideo"
          controls={true}
          src={src}
          className="bg-black object-contain md:max-w-[90vw] mx-auto"
        ></video>
      )}
      {!showDemo && (
        <Image
          className="scale-105"
          unoptimized={
            title === "Demo" || title === "Animations" || title === "Sketches"
          }
          src={demo ? "/images/demo.gif" : src}
          alt={title}
          width={0}
          height={0}
          style={{ width: "100%", height: "100%" }}
          sizes="100vw"
        />
      )}
      <div
        className={clsx(
          "flex absolute h-full w-full bottom-0 p-8 items-end bg-gradient-to-b from-transparent to-black",
          {
            hidden: showDemo,
          }
        )}
      >
        <Link href={demo ? "" : href} className="w-full">
          <h3 className="nav-link-text w-full font-bold custom-text-shadow text-4xl opacity-0  uppercase translate-x-[-100%] pointer-events-none cursor-pointer flex items-center">
            {title}{" "}
            <IoMdArrowDropright className="fa-solid fa-caret-right float-right text-[1.7rem]" />
          </h3>
        </Link>
      </div>
    </li>
  )
}
