import DraggableMediaList from "@/components/draggable-list"
import { fetchMedias } from "@/lib/data"

export default async function DrawingsAdminPage() {
  const drawings = await fetchMedias("drawing")
  return (
    <div className="p-4">
      <DraggableMediaList medias={drawings} mediaType="drawing" />
    </div>
  )
}
