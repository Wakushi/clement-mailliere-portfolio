"use client"
import { Media } from "@/lib/types"
import MediaCard from "./media-card"
import { useState } from "react"
import MediaModal from "./media-modal"
import { IoIosClose } from "react-icons/io"
import Image from "next/image"
import { Button } from "./ui/button"
import MediaUpdateForm from "./update-media-form"
import LoaderSmall from "./ui/loader/loader-small"
import { deleteMedia } from "@/lib/data"

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
      <div className="flex flex-wrap gap-2 justify-center items-center">
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

function MediaEditModal({
  selectedMedia,
  toggleEditModal,
  refreshList,
}: {
  selectedMedia: Media
  toggleEditModal: () => void
  refreshList?: () => void
}) {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [isSuccess, setIsSuccess] = useState<boolean>(false)
  const [successMessage, setSuccessMessage] = useState<string>("")

  async function onDeleteMedia() {
    setIsSubmitting(true)
    try {
      await deleteMedia(selectedMedia)
      setIsSuccess(true)
      setSuccessMessage("Media deleted")
    } catch (error) {
      console.error(error)
    } finally {
      setIsSubmitting(false)
      if (refreshList) refreshList()
    }
  }

  const EditModalContent = () => {
    if (isSubmitting) {
      return <LoaderSmall />
    }
    if (isSuccess) {
      return <p>{successMessage}</p>
    }
    return (
      <div className="opacity-0 fade-in-bottom flex flex-col gap-2">
        <div className="w-[300px]">
          <Image
            src={selectedMedia.imageUrl}
            alt="media"
            width={0}
            height={0}
            style={{ width: "100%", height: "100%" }}
            sizes="100vw"
          />
        </div>
        <div className="flex flex-col gap-2">
          <MediaUpdateForm
            media={selectedMedia}
            setIsSuccess={setIsSuccess}
            setIsSubmitting={setIsSubmitting}
            setSuccessMessage={setSuccessMessage}
            refreshList={refreshList}
          />
          <Button
            onClick={onDeleteMedia}
            className="border border-white hover:border-red-700 hover:text-red-700 w-full px-4 py-2 rounded font-bold text-md"
          >
            Delete
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div
      id="modal-container"
      className="fixed top-0 left-0 z-[5] flex items-center justify-center bg-modal w-full h-full bg-black bg-opacity-80"
    >
      <IoIosClose
        onClick={toggleEditModal}
        className="absolute text-[2.4rem] md:text-[2.9rem] top-[17px] right-[4px] md:top-[30px] md:right-[30px] opacity-50 hover:opacity-100 transition-opacity duration-500 z-40 cursor-pointer"
      />
      <EditModalContent />
    </div>
  )
}
