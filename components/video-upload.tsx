"use client"
import { useState } from "react"
import { deleteDemoVideo, uploadVideo, getDemos } from "@/lib/data"
import { Button } from "./ui/button"
import LoaderSmall from "./ui/loader/loader-small"
import { useToast } from "./ui/use-toast"
import { Demo } from "@/lib/types"

export default function VideoUpload({
  initialVideos = [],
}: {
  initialVideos: Demo[]
}) {
  const { toast } = useToast()
  const [videos, setVideos] = useState<Demo[]>(initialVideos)
  const [files, setFiles] = useState<File[]>([])
  const [isUploading, setIsUploading] = useState<boolean>(false)

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = event.target.files ? Array.from(event.target.files) : []
    setFiles(newFiles)
  }

  async function onUpload() {
    if (files.length === 0) return

    setIsUploading(true)
    try {
      for (const file of files) {
        await uploadVideo(file, true)
      }

      const updatedDemos = await getDemos()
      setVideos(updatedDemos)

      successToast(
        `${files.length} video${
          files.length > 1 ? "s" : ""
        } uploaded successfully`
      )
      setFiles([])
    } catch (error) {
      console.error(error)
      toast({
        title: "Error",
        description: "Failed to upload videos",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
    }
  }

  async function onDelete(videoId: string): Promise<void> {
    setIsUploading(true)
    try {
      const success = await deleteDemoVideo(videoId)
      if (success) {
        setVideos((prev) => prev.filter((video) => video.id !== videoId))
        successToast("Video deleted successfully")
      }
    } catch (error) {
      console.error(error)
      toast({
        title: "Error",
        description: "Failed to delete video",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
    }
  }

  function successToast(message: string) {
    toast({
      title: "Success",
      description: message,
    })
  }

  return (
    <div className="flex flex-col items-center gap-4 max-w-[1000px] m-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        {videos.map((video) => (
          <div key={video.id} className="relative">
            <video controls src={video.url} className="w-full rounded"></video>
            <Button
              onClick={() => onDelete(video.id)}
              className="absolute top-2 right-2 bg-red-600 hover:bg-red-700"
              disabled={isUploading}
            >
              Delete
            </Button>
          </div>
        ))}
      </div>

      <div className="w-full space-y-4 max-w-[500px]">
        <input
          type="file"
          onChange={onFileChange}
          multiple
          accept="video/*"
          className="w-full p-2 border border-gray-300 rounded"
        />

        <div className="flex justify-between items-center gap-4">
          <Button
            onClick={onUpload}
            className="bg-indigo-800 hover:bg-indigo-900 flex-1"
            disabled={isUploading || files.length === 0}
          >
            {isUploading ? (
              <LoaderSmall />
            ) : (
              `Upload ${files.length} video${files.length !== 1 ? "s" : ""}`
            )}
          </Button>
        </div>

        {files.length > 0 && (
          <div className="text-sm text-gray-500">
            Selected files: {files.map((f) => f.name).join(", ")}
          </div>
        )}
      </div>
    </div>
  )
}
