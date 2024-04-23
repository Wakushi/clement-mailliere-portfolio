"use client"
import { useState } from "react"
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog"
import MediaForm from "./media-form"
import { Button } from "./ui/button"
import LoaderHive from "./ui/loader-hive/loader-hive"

export default function AddMediaModal({
  type,
  refreshList,
}: {
  type: "drawing" | "animation" | "sketch"
  refreshList: () => void
}) {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [isSuccess, setIsSuccess] = useState<boolean>(false)

  const DialogContentState = () => {
    if (isSubmitting) {
      return (
        <div className="flex flex-col items-center justify-center w-full h-full min-h-[100vh]">
          <LoaderHive />
        </div>
      )
    }

    if (isSuccess) {
      return (
        <div className="flex flex-col items-center justify-center w-full h-full min-h-[100vh]">
          <h1 className="text-2xl font-bold text-white">Media added !</h1>
        </div>
      )
    }

    return (
      <MediaForm
        type={type}
        setIsSubmitting={setIsSubmitting}
        setIsSuccess={setIsSuccess}
        refreshList={refreshList}
      />
    )
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-indigo-800 w-full hover:text-indigo-800 hover:bg-white px-4 py-2 rounded font-bold text-md">
          New
        </Button>
      </DialogTrigger>
      <DialogContent className="min-h-[100vh] max-h-[100vh] w-full max-w-[100vw] rounded overflow-auto bg-slate-900 flex">
        <DialogContentState />
      </DialogContent>
    </Dialog>
  )
}
