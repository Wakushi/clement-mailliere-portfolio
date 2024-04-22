import DraggableMediaList from "@/components/draggable-media-list"
import { fetchMedias } from "@/lib/data"

export default async function DrawingsAdminPage() {
  const drawings = await fetchMedias("drawing")
  drawings.sort((a, b) => a.order - b.order)
  return (
    <div className="p-4">
      <DraggableMediaList medias={drawings} mediaType="drawing" />
    </div>
  )
}
