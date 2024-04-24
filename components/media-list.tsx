"use client"
import { Media } from "@/lib/types"
import { useState } from "react"
import MediaCard from "./media-card"
import MediaModal from "./media-modal"
import MediaEditModal from "./edit-media-modal"

export default function MediaList({
  medias,
  refreshList,
  adminView = false,
}: {
  medias: Media[]
  refreshList?: () => void
  adminView?: boolean
}) {
  const [showModal, setShowModal] = useState<boolean>(false)
  const [showEditModal, setShowEditModal] = useState<boolean>(false)
  const [selectedMedia, setSelectedMedia] = useState<Media>(medias[0])

  function toggleModal(): void {
    if (adminView) {
      setShowEditModal(!showEditModal)
    } else {
      setShowModal(!showModal)
    }
  }

  return (
    <>
      <div className="opacity-0 fade-in flex flex-wrap gap-2 justify-center items-center">
        {medias.map((media) => (
          <MediaCard
            key={media.id}
            media={media}
            toggleModal={toggleModal}
            setSelectedMedia={setSelectedMedia}
            adminView={adminView}
          />
        ))}
      </div>
      {showModal && (
        <MediaModal toggleModal={toggleModal} selectedMedia={selectedMedia} />
      )}
      {showEditModal && (
        <MediaEditModal
          selectedMedia={selectedMedia}
          toggleEditModal={toggleModal}
          refreshList={refreshList}
        />
      )}
    </>
  )
}
