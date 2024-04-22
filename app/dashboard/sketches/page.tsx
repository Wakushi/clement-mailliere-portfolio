import DraggableMediaList from "@/components/draggable-media-list"
import { fetchMedias } from "@/lib/data"

export default async function SketchesAdminPage() {
  const sketches = await fetchMedias("sketch")
  sketches.sort((a, b) => a.order - b.order)
  return (
    <div className="p-4">
      <DraggableMediaList medias={sketches} mediaType="sketch" />
    </div>
  )
}
