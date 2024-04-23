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
  rectSwappingStrategy,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable"
import { arrayMove } from "@dnd-kit/sortable"
import { Media } from "@/lib/types"
import MediaCard from "./media-card"

interface DraggableMediaListProps {
  items: Media[]
  setItems: (items: Media[]) => void
  setUpdatedListOrder: (updatedListOrder: boolean) => void
}

export default function DraggableMediaList({
  items,
  setItems,
  setUpdatedListOrder,
}: DraggableMediaListProps) {
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

  async function handleDragEnd(event: any) {
    const getItemPosition = (id: string) => {
      return items.findIndex((item) => item.id === id)
    }

    const { active, over } = event
    if (active.id !== over.id) {
      const oldPos = getItemPosition(active.id)
      const newPos = getItemPosition(over.id)
      setItems(arrayMove(items, oldPos, newPos))
      setUpdatedListOrder(true)
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
        <SortableContext items={items} strategy={rectSwappingStrategy}>
          <div className="flex flex-wrap gap-2 justify-center">
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
