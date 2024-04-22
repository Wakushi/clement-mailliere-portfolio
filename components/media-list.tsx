import { Media } from "@/lib/types"
import MediaCard from "./media-card"

interface MediaListProps {
  medias: Media[]
  toggleModal: () => void
  setSelectedMediaUrl: (url: string) => void
  adminView: boolean
}

export default function MediaList({
  medias,
  toggleModal,
  setSelectedMediaUrl,
  adminView,
}: MediaListProps) {
  return (
    <>
      {medias.map((media) => (
        <MediaCard
          key={media.id}
          media={media}
          toggleModal={toggleModal}
          setSelectedMediaUrl={setSelectedMediaUrl}
          adminView={adminView}
        />
      ))}
    </>
  )
}
