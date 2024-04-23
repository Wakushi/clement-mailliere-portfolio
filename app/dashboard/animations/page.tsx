import AdminMediaList from "@/components/admin-media-list"
import { fetchMedias } from "@/lib/data"

export default async function AnimationsAdminPage() {
  const animations = await fetchMedias("animation")
  return (
    <div className="p-4">
      <AdminMediaList medias={animations} mediaType="animation" />
    </div>
  )
}
