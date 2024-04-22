import React from "react"

import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

const Task = ({ id, title }: { id: string; title: string }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id })
  const style = { transform: CSS.Transform.toString(transform), transition }
  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className="rounded w-full p-2 flex items-center justify-start gap-2 touch-none bg-gray-700"
    >
      {title}
    </div>
  )
}

export default Task
