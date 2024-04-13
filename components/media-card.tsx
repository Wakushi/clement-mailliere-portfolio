import { Media } from "@/lib/types"
import Image from "next/image"

export default function MediaCard({
  media,
  toggleModal,
  setSelectedMediaUrl,
}: {
  media: Media
  toggleModal: () => void
  setSelectedMediaUrl: (mediaUrl: string) => void
}) {
  const { id, imageUrl, title } = media
  return (
    <div
      className="w-full"
      key={id}
      onClick={() => {
        setSelectedMediaUrl(imageUrl)
        toggleModal()
      }}
    >
      <Image
        src={imageUrl}
        alt={title}
        width={0}
        height={0}
        style={{ width: "100%", height: "100%" }}
        sizes="100vw"
      />
    </div>
  )
}
