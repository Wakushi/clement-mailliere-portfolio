"use client"
import LoaderHive from "@/components/ui/loader-hive/loader-hive"
import VideoUpload from "@/components/video-upload"
import { getVideoUrl } from "@/lib/data"
import { useQuery } from "@tanstack/react-query"

export default function DemoAdminPage() {
  const { data: videoUrl, isLoading } = useQuery<string, Error>({
    queryKey: ["videoUrl"],
    queryFn: () => getVideoUrl(),
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
      <VideoUpload videoUrl={videoUrl ?? ""} />
    </div>
  )
}
