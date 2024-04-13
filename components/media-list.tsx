import { Media } from "@/lib/types"
import MediaCard from "./media-card"

export default function MediaList({ medias }: { medias: Media[] }) {
  return (
    <div className="flex flex-col gap-2">
      {medias.map((media) => (
        <MediaCard key={media.id} media={media} />
      ))}
    </div>
  )
}
