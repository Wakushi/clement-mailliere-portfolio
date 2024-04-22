import BasicMediaList from "@/components/basic-media-list"
import { fetchMedias } from "@/lib/data"

export default async function AnimationsAdminPage() {
  const animations = await fetchMedias("animation")
  return (
    <div className="p-4">
      <BasicMediaList medias={animations} adminView={true} type="animation" />
    </div>
  )
}
