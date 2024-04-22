import { Media } from "@/lib/types"
import clsx from "clsx"
import Image from "next/image"

import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

export default function MediaCard({
  media,
  toggleModal,
  setSelectedMediaUrl,
  adminView = false,
}: {
  media: Media
  toggleModal: () => void
  setSelectedMediaUrl: (mediaUrl: string) => void
  adminView?: boolean
}) {
  const { id, imageUrl, title } = media
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id })
  const style = { transform: CSS.Transform.toString(transform), transition }
  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className={clsx("w-full", {
        "max-w-[100px] max-h-[100px] lg:max-w-[300px] lg:max-h-[300px]":
          adminView,
        "max-w-[400px] md:max-w-[800px]": !adminView,
      })}
      key={id}
      onClick={() => {
        setSelectedMediaUrl(imageUrl)
        toggleModal()
      }}
    >
      <Image
        src={imageUrl}
        alt={title}
        width={0}
        height={0}
        style={{ width: "100%", height: "100%" }}
        sizes="100vw"
      />
    </div>
  )
}
