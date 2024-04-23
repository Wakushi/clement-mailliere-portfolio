"use client"
import { useState } from "react"
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog"
import MediaForm from "./media-form"
import { Button } from "./ui/button"
import LoaderHive from "./ui/loader-hive/loader-hive"
import Image from "next/image"

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
        <div className="flex flex-col items-center justify-center w-full h-full min-h-[100dvh]">
          <LoaderHive />
        </div>
      )
    }

    if (isSuccess) {
      return (
        <div className="flex flex-col items-center justify-center w-full h-full min-h-[100dvh]">
          <div>
            <Image
              src="/images/ok.gif"
              alt="media"
              width={0}
              height={0}
              style={{ width: "100%", height: "100%" }}
              sizes="100vw"
            />
          </div>
          <p className="text-lg font-bold">Media added !</p>
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
        <Button className="bg-indigo-800 w-full hover:text-indigo-800 hover:bg-white px-4 py-2 rounded font-bold text-lg">
          +
        </Button>
      </DialogTrigger>
      <DialogContent className="min-h-[100vh] max-h-[100vh] w-full max-w-[100vw] rounded overflow-auto bg-slate-900 flex">
        <DialogContentState />
      </DialogContent>
    </Dialog>
  )
}
