"use client"
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  closestCorners,
  useSensor,
  useSensors,
} from "@dnd-kit/core"
import { useState } from "react"
import {
  SortableContext,
  horizontalListSortingStrategy,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable"
import { arrayMove } from "@dnd-kit/sortable"
import { Media } from "@/lib/types"
import MediaCard from "./media-card"

export default function DraggableMediaList({
  medias,
  mediaType,
}: {
  medias: Media[]
  mediaType: "drawing" | "animation" | "sketch"
}) {
  const [items, setItems] = useState(medias)
  const [showModal, setShowModal] = useState<boolean>(false)
  const [selectedMediaUrl, setSelectedMediaUrl] = useState<string>("")

  function toggleModal(): void {
    setShowModal(!showModal)
    if (!showModal) {
      document.body.classList.add("scrolled")
    } else {
      document.body.classList.remove("scrolled")
    }
  }

  const getItemPosition = (id: string) => {
    return items.findIndex((item) => item.id === id)
  }

  const handleDragEnd = (event: any) => {
    const { active, over } = event
    if (active.id !== over.id) {
      setItems((items) => {
        const oldPos = getItemPosition(active.id)
        const newPos = getItemPosition(over.id)
        return arrayMove(items, oldPos, newPos)
      })
    }
  }

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  return (
    <div>
      <DndContext
        onDragEnd={handleDragEnd}
        collisionDetection={closestCorners}
        sensors={sensors}
      >
        <SortableContext items={items} strategy={horizontalListSortingStrategy}>
          <div className="flex gap-2">
            {items.map((media) => (
              <MediaCard
                key={media.id}
                media={media}
                toggleModal={toggleModal}
                setSelectedMediaUrl={setSelectedMediaUrl}
                adminView={true}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  )
}
