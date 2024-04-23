"use client"
import { useState } from "react"
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage"
import { deleteVideo, setVideoUrl } from "@/lib/data"
import { Button } from "./ui/button"
import LoaderSmall from "./ui/loader/loader-small"

export default function VideoUpload({ videoUrl }: { videoUrl: string }) {
  const storage = getStorage()
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
      await deleteVideo("videos/demo.mp4")
      const storageRef = ref(storage, "videos/demo.mp4")
      const uploadTask = uploadBytesResumable(storageRef, file)
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          console.log("Upload is " + progress + "% done")
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused")
              break
            case "running":
              console.log("Upload is running")
              break
          }
        },
        (error) => {
          console.error(error)
          setIsUploading(false)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setVideoUrl({ url: downloadURL })
            setUrl(downloadURL)
            setIsUploading(false)
          })
        }
      )
    }
  }

  async function onDelete(): Promise<boolean> {
    setIsUploading(true)
    const success = await deleteVideo("videos/demo.mp4")
    if (success) {
      setUrl("")
      setIsUploading(false)
    }
    return success
  }

  return (
    <div className="flex flex-col gap-2">
      {!!url && (
        <div>
          <video controls src={url}></video>
        </div>
      )}
      <input type="file" onChange={onFileChange} />
      <Button
        onClick={onUpload}
        className="bg-indigo-800 hover:border hover:border-indigo-800 w-full px-4 py-2 rounded font-bold text-md"
      >
        {isUploading ? <LoaderSmall /> : "Upload"}
      </Button>
      <Button
        onClick={onDelete}
        className="border border-white hover:border-red-700 hover:text-red-700 w-full px-4 py-2 rounded font-bold text-md"
      >
        Delete current demo
      </Button>
    </div>
  )
}
