"use client"
import MediaList from "@/components/media-list"
import LoaderHive from "@/components/ui/loader-hive/loader-hive"
import { fetchMedias } from "@/lib/data"
import { Media } from "@/lib/types"
import { useQuery } from "@tanstack/react-query"

export default function SketchesPage() {
  const { data: sketches, isLoading } = useQuery<Media[], Error>({
    queryKey: ["sketch"],
    queryFn: () => fetchMedias("sketch"),
  })

  if (isLoading) {
    return (
      <div className="w-full h-full min-h-[100vh]">
        <LoaderHive />
      </div>
    )
  }
  if (!sketches) return <div>No sketch found</div>
  return (
    <div className="p-2 pt-[8rem]">
      <MediaList medias={sketches} />
    </div>
  )
}
