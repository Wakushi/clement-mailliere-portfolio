import AdminMediaList from "@/components/admin-media-list"
import { fetchMedias } from "@/lib/data"

export default async function DrawingsAdminPage() {
  const drawings = await fetchMedias("drawing")
  return (
    <div className="p-4">
      <AdminMediaList medias={drawings} mediaType="drawing" />
    </div>
  )
}
