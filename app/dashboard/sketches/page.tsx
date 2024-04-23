import AdminMediaList from "@/components/admin-media-list"
import { fetchMedias } from "@/lib/data"

export default async function SketchesAdminPage() {
  const sketches = await fetchMedias("sketch")
  return (
    <div className="p-4">
      <AdminMediaList medias={sketches} mediaType="sketch" />
    </div>
  )
}
