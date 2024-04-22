"use client"
import Image from "next/image"
import { useEffect } from "react"
import { IoIosClose } from "react-icons/io"

export default function MediaModal({
  toggleModal,
  selectedMediaUrl,
}: {
  toggleModal: () => void
  selectedMediaUrl: string
}) {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (e.target === document.querySelector("#modal-container")) {
        toggleModal()
      }
    }

    window.addEventListener("click", handleClick)
    return () => {
      window.removeEventListener("click", handleClick)
    }
  }, [])

  return (
    <div
      id="modal-container"
      className="fixed top-0 left-0 z-[5] flex items-center justify-center bg-modal w-full h-full bg-black bg-opacity-80"
    >
      <IoIosClose
        onClick={toggleModal}
        className="absolute text-[2.4rem] md:text-[2.9rem] top-[17px] right-[4px] md:top-[30px] md:right-[30px] opacity-50 hover:opacity-100 transition-opacity duration-500 z-40 cursor-pointer"
      />
      <div className="opacity-0 fade-in-bottom overflow-auto w-full h-full md:max-w-[90vw] lg:max-w-[80vw]">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[max-content]">
          <Image
            src={selectedMediaUrl}
            alt="media"
            width={0}
            height={0}
            style={{ width: "100%", height: "100%" }}
            sizes="100vw"
          />
        </div>
      </div>
    </div>
  )
}
