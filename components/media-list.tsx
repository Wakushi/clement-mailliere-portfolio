"use client"
import { Media } from "@/lib/types"
import MediaCard from "./media-card"
import { useState } from "react"
import MediaModal from "./media-modal"
import clsx from "clsx"
import AddMediaModal from "./add-media-modal"

export default function MediaList({
  medias,
  type,
  adminView = false,
}: {
  medias: Media[]
  type: "drawing" | "animation" | "sketch"
  adminView?: boolean
}) {
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
      <div
        className={clsx("flex flex-wrap gap-2 justify-around", {
          "justify-center items-center": !adminView,
        })}
      >
        {adminView && <AddMediaModal type={type} />}
        {medias.map((media) => (
          <MediaCard
            key={media.id}
            media={media}
            toggleModal={toggleModal}
            setSelectedMediaUrl={setSelectedMediaUrl}
            adminView={adminView}
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
