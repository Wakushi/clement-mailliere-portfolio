"use client"
import AdminMediaList from "@/components/admin-media-list"
import LoaderHive from "@/components/ui/loader-hive/loader-hive"
import { fetchMedias } from "@/lib/data"
import { Media } from "@/lib/types"
import { useQuery } from "@tanstack/react-query"

export default function SketchesAdminPage() {
  const { data: sketches, isLoading } = useQuery<Media[], Error>({
    queryKey: ["sketch"],
    queryFn: () => fetchMedias("sketch"),
  })

  if (isLoading) {
    return (
      <div>
        <LoaderHive />
      </div>
    )
  }
  if (!sketches) return <div>No sketch found</div>
  return (
    <div className="p-4">
      <AdminMediaList medias={sketches} mediaType="sketch" />
    </div>
  )
}
