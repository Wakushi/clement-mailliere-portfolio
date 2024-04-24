import { deleteMedia } from "@/lib/data"
import { Media } from "@/lib/types"
import { useState } from "react"
import LoaderSmall from "./ui/loader/loader-small"
import Image from "next/image"
import MediaUpdateForm from "./update-media-form"
import { Button } from "./ui/button"
import { IoIosClose } from "react-icons/io"

export default function MediaEditModal({
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
      return (
        <div className="flex flex-col items-center justify-center w-full h-full min-h-[100dvh]">
          <div>
            <Image
              src="/images/ok.gif"
              alt="media"
              width={0}
              height={0}
              style={{ width: "100%", height: "100%" }}
              sizes="100vw"
            />
          </div>
          <p className="text-lg font-bold">{successMessage}</p>
        </div>
      )
    }
    return (
      <div className="opacity-0 fade-in-bottom flex flex-col gap-2 w-full max-w-[300px] md:max-w-[450px]">
        <div className="w-[300px] h-[300px] md:w-[450px] md:h-[450px] m-auto">
          {selectedMedia.isVideo ? (
            <video
              controls
              autoPlay
              src={selectedMedia.imageUrl}
              width={0}
              height={0}
              style={{ width: "100%", height: "100%" }}
            ></video>
          ) : (
            <Image
              src={selectedMedia.imageUrl}
              alt="media"
              width={0}
              height={0}
              style={{ width: "100%", height: "100%" }}
              sizes="100vw"
            />
          )}
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
            className="border border-white hover:border-red-700 hover:text-red-700 focus:border-red-700 focus:text-red-700 w-full px-4 py-2 rounded font-bold text-md"
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
