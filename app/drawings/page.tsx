import MediaList from "@/components/media-list"
import { fetchMedias } from "@/lib/data"

export default async function Drawings() {
  const drawings = await fetchMedias("drawing")
  return (
    <div className="pt-[8rem]">
      <MediaList medias={drawings} />
    </div>
  )
}
