"use client"
import { useState } from "react"
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog"
import MediaForm from "./media-form"

export default function AddMediaModal({
  type,
}: {
  type: "drawing" | "animation" | "sketch"
}) {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [isSuccess, setIsSuccess] = useState<boolean>(false)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="w-[100px] h-[100px] max-w-[100px] max-h-[100px] lg:w-[300px] lg:h-[300px] lg:max-w-[300px] lg:max-h-[300px] border border-gray-700 text-gray-700 flex items-center justify-center text-3xl">
          +
        </div>
      </DialogTrigger>
      <DialogContent className="min-h-[100vh] max-h-[100vh] rounded overflow-auto p-4">
        <MediaForm
          type={type}
          setIsSubmitting={setIsSubmitting}
          setIsSuccess={setIsSuccess}
        />
      </DialogContent>
    </Dialog>
  )
}
