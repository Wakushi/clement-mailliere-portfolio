"use client"
import { useState } from "react"
import { deleteDemoVideo, uploadVideo } from "@/lib/data"
import { Button } from "./ui/button"
import LoaderSmall from "./ui/loader/loader-small"
import { useToast } from "./ui/use-toast"

export default function VideoUpload({ videoUrl }: { videoUrl: string }) {
  const { toast } = useToast()
  const [url, setUrl] = useState<string | null>(videoUrl)
  const [file, setFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState<boolean>(false)

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null
    setFile(file)
  }

  async function onUpload() {
    if (file) {
      setIsUploading(true)
      try {
        await uploadVideo(file, true)
        successToast("Demo video uploaded successfully")
      } catch (error) {
        console.error(error)
      } finally {
        setIsUploading(false)
      }
    }
  }

  async function onDelete(): Promise<boolean> {
    setIsUploading(true)
    const success = await deleteDemoVideo("videos/demo.mp4")
    if (success) {
      setUrl("")
      successToast("Demo video deleted successfully")
      setIsUploading(false)
    }
    return success
  }

  function successToast(message: string) {
    toast({
      title: "Success",
      description: message,
    })
  }

  return (
    <div className="flex flex-col items-center gap-2 max-w-[1000px] m-auto">
      {!!url && (
        <div>
          <video controls src={url}></video>
        </div>
      )}
      <input type="file" onChange={onFileChange} />
      <div className="flex self-strecth w-full flex-col md:flex-row items-center p-4 gap-4">
        <Button
          onClick={onUpload}
          className="bg-indigo-800 hover:border hover:border-indigo-800 w-full px-4 py-2 rounded font-bold text-md"
        >
          {isUploading ? <LoaderSmall /> : "Upload"}
        </Button>
        {!!videoUrl && (
          <Button
            onClick={onDelete}
            className="border border-white hover:border-red-700 hover:text-red-700 w-full px-4 py-2 rounded font-bold text-md"
          >
            Delete current demo
          </Button>
        )}
      </div>
    </div>
  )
}
