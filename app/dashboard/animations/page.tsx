import DraggableMediaList from "@/components/draggable-media-list"
import { fetchMedias } from "@/lib/data"

export default async function AnimationsAdminPage() {
  const animations = await fetchMedias("animation")
  animations.sort((a, b) => a.order - b.order)
  return (
    <div className="p-4">
      <DraggableMediaList medias={animations} mediaType="animation" />
    </div>
  )
}
