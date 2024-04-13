import MediaList from "@/components/media-list"
import { fetchMedias } from "@/lib/data"

export default async function SketchesPage() {
  const sketches = await fetchMedias("sketch")
  return (
    <div className="pt-[8rem]">
      <MediaList medias={sketches} />
    </div>
  )
}
