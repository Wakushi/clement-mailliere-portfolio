"use client"
import { Media } from "@/lib/types"
import clsx from "clsx"
import Image from "next/image"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { useEffect, useRef, useState } from "react"

export default function MediaCard({
  media,
  toggleModal,
  setSelectedMedia,
  adminView = false,
}: {
  media: Media
  toggleModal: () => void
  setSelectedMedia?: (media: Media) => void
  adminView?: boolean
}) {
  const { id, imageUrl, title, isVideo, thumbnailUrl } = media
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id })
  const style = { transform: CSS.Transform.toString(transform), transition }
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isInView, setIsInView] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  const combinedRef = (node: HTMLDivElement) => {
    setNodeRef(node)

    if (isVideo && node) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          setIsInView(entry.isIntersecting)
        },
        {
          threshold: 0.1,
          rootMargin: "50px",
        }
      )

      observer.observe(node)

      return () => observer.disconnect()
    }
  }

  useEffect(() => {
    if (videoRef.current && isInView) {
      videoRef.current.play().catch((error) => {
        console.warn("Video autoplay failed:", error)
      })
    } else if (videoRef.current) {
      videoRef.current.pause()
    }
  }, [isInView])

  return (
    <div
      ref={combinedRef}
      {...attributes}
      {...listeners}
      style={style}
      className={clsx("w-full relative", {
        "w-[100px] h-[100px] max-w-[100px] max-h-[100px] md:w-[200px] md:h-[200px] md:max-w-[200px] md:max-h-[200px] lg:w-[300px] lg:h-[300px] lg:max-w-[300px] lg:max-h-[300px] touch-none":
          adminView,
        "max-w-[400px] md:max-w-[800px]": !adminView,
      })}
      onClick={() => {
        if (setSelectedMedia) {
          setSelectedMedia(media)
          toggleModal()
        }
      }}
    >
      {isVideo ? (
        <>
          {isInView && (
            <video
              ref={videoRef}
              loop
              muted
              src={thumbnailUrl || imageUrl}
              width={0}
              height={0}
              style={{ width: "100%", height: "100%" }}
              preload="metadata"
              onLoadedData={() => setIsLoaded(true)}
              className={clsx(
                "transition-opacity duration-300",
                isLoaded ? "opacity-100" : "opacity-0"
              )}
            />
          )}
        </>
      ) : (
        <Image
          src={imageUrl}
          alt={title}
          width={0}
          height={0}
          style={{ width: "100%", height: "100%" }}
          sizes="100vw"
        />
      )}
    </div>
  )
}
