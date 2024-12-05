"use client"
import LoaderHive from "@/components/ui/loader-hive/loader-hive"
import VideoUpload from "@/components/video-upload"
import { getDemos } from "@/lib/data"
import { Demo } from "@/lib/types"
import { useQuery } from "@tanstack/react-query"

export default function DemoAdminPage() {
  const { data: demos, isLoading } = useQuery<Demo[], Error>({
    queryKey: ["videoUrl"],
    queryFn: () => getDemos(),
  })

  if (isLoading) {
    return (
      <div>
        <LoaderHive />
      </div>
    )
  }

  return (
    <div className="p-8 flex flex-col gap-4">
      <h2 className="w-full text-2xl font-bold text-center ">Demo</h2>
      <VideoUpload initialVideos={demos || []} />
    </div>
  )
}
