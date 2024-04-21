"use client"
import { Media } from "@/lib/types"
import MediaCard from "./media-card"
import { useState } from "react"
import MediaModal from "./media-modal"

export default function MediaList({ medias }: { medias: Media[] }) {
  const [showModal, setShowModal] = useState<boolean>(false)
  const [selectedMediaUrl, setSelectedMediaUrl] = useState<string>("")

  function toggleModal(): void {
    setShowModal(!showModal)
    if (!showModal) {
      document.body.classList.add("scrolled")
    } else {
      document.body.classList.remove("scrolled")
    }
  }

  return (
    <>
      <div className="flex justify-center items-center flex-wrap gap-2">
        {medias.map((media) => (
          <MediaCard
            key={media.id}
            media={media}
            toggleModal={toggleModal}
            setSelectedMediaUrl={setSelectedMediaUrl}
          />
        ))}
      </div>
      {showModal && (
        <MediaModal
          toggleModal={toggleModal}
          selectedMediaUrl={selectedMediaUrl}
        />
      )}
    </>
  )
}
