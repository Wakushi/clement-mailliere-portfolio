"use client"
import AdminMediaList from "@/components/admin-media-list"
import LoaderHive from "@/components/ui/loader-hive/loader-hive"
import { fetchMedias } from "@/lib/data"
import { Media } from "@/lib/types"
import { useQuery } from "@tanstack/react-query"

export default function AnimationsAdminPage() {
  const { data: animations, isLoading } = useQuery<Media[], Error>({
    queryKey: ["animation"],
    queryFn: () => fetchMedias("animation"),
  })

  if (isLoading) {
    return (
      <div>
        <LoaderHive />
      </div>
    )
  }
  if (!animations) return <div>No animation found</div>
  return (
    <div className="p-4">
      <AdminMediaList medias={animations} mediaType="animation" />
    </div>
  )
}
