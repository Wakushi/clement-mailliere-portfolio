import MediaList from "@/components/media-list"
import { fetchMedias } from "@/lib/data"

export default async function DrawingsAdminPage() {
  const drawings = await fetchMedias("drawing")
  return (
    <div className="p-4">
      <MediaList medias={drawings} adminView={true} type="drawing" />
    </div>
  )
}
