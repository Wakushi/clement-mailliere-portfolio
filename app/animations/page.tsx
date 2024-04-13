import MediaCard from "@/components/media-card"
import MediaList from "@/components/media-list"
import { fetchMedias } from "@/lib/data"

export default async function AnimationsPage() {
  const animations = await fetchMedias("animation")
  return (
    <div className="pt-[8rem]">
      <MediaList medias={animations} />
    </div>
  )
}
