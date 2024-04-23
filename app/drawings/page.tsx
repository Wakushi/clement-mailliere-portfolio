"use client"
import MediaList from "@/components/media-list"
import LoaderHive from "@/components/ui/loader-hive/loader-hive"
import { fetchMedias } from "@/lib/data"
import { Media } from "@/lib/types"
import { useQuery } from "@tanstack/react-query"

export default function Drawings() {
  const { data: drawings, isLoading } = useQuery<Media[], Error>({
    queryKey: ["drawing"],
    queryFn: () => fetchMedias("drawing"),
  })

  if (isLoading) {
    return (
      <div>
        <LoaderHive />
      </div>
    )
  }

  if (!drawings) return <div>No drawings found</div>

  return (
    <div className="p-2 pt-[8rem]">
      <MediaList medias={drawings} />
    </div>
  )
}
