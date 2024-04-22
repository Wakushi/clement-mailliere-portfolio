import BasicMediaList from "@/components/basic-media-list"
import { fetchMedias } from "@/lib/data"

export default async function SketchesAdminPage() {
  const sketches = await fetchMedias("sketch")
  return (
    <div className="p-4">
      <BasicMediaList medias={sketches} adminView={true} type="sketch" />
    </div>
  )
}
