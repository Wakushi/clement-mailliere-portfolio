import BasicMediaList from "@/components/basic-media-list"
import { fetchMedias } from "@/lib/data"

export default async function SketchesPage() {
  const sketches = await fetchMedias("sketch")
  return (
    <div className="p-2 pt-[8rem]">
      <BasicMediaList medias={sketches} type="sketch" />
    </div>
  )
}
