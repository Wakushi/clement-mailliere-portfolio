import MediaList from "@/components/media-list"
import { fetchMedias } from "@/lib/data"

export default async function AnimationsAdminPage() {
  const animations = await fetchMedias("animation")
  return (
    <div className="p-4">
      <MediaList medias={animations} adminView={true} type="animation" />
    </div>
  )
}
