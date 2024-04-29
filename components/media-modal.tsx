"use client"
import { Media } from "@/lib/types"
import Image from "next/image"
import { useEffect } from "react"
import { IoIosClose } from "react-icons/io"

export default function MediaModal({
  toggleModal,
  selectedMedia,
}: {
  toggleModal: () => void
  selectedMedia: Media
}) {
  useEffect(() => {
    const handleClick = (e: any) => {
      if (
        e.target === document.querySelector("#modal-container") ||
        e.target === document.querySelector("#media-container")
      ) {
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
      className="fixed top-0 left-0 z-[5] flex items-center justify-center bg-modal w-full h-full bg-black bg-opacity-90"
    >
      <IoIosClose
        onClick={toggleModal}
        className="absolute text-[2.4rem] md:text-[2.9rem] top-[17px] right-[4px] md:top-[30px] md:right-[30px] opacity-50 hover:opacity-100 transition-opacity duration-500 z-40 cursor-pointer"
      />
      <div
        id="media-container"
        className="opacity-0 fade-in-bottom relative w-full h-full flex items-center justify-center max-w-screen-lg mx-auto"
      >
        <div className="w-full h-full max-w-full max-h-full overflow-hidden p-4 flex items-center justify-center">
          {selectedMedia.isVideo ? (
            <video
              controls
              autoPlay
              loop
              src={selectedMedia.imageUrl}
              width={0}
              height={0}
              style={{ width: "100%", height: "100%" }}
              className="object-contain max-w-full max-h-full mx-auto"
            ></video>
          ) : (
            <Image
              src={selectedMedia.imageUrl}
              alt="Media display"
              layout="responsive"
              width={0}
              height={0}
              className="object-contain max-w-full max-h-full mx-auto"
            />
          )}
        </div>
      </div>
    </div>
  )
}
