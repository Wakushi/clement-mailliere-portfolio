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
import AddMediaModal from "./add-media-modal"
import { updateMedia } from "@/lib/data"

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

  async function updateMediaOrder(selectedMedia: Media) {
    await updateMedia({ ...selectedMedia })
  }

  const getItemPosition = (id: string) => {
    return items.findIndex((item) => item.id === id)
  }

  async function handleDragEnd(event: any) {
    const { active, over } = event
    if (active.id !== over.id) {
      const oldPos = getItemPosition(active.id)
      const newPos = getItemPosition(over.id)
      const itemA = items[oldPos]
      const itemB = items[newPos]
      itemA.order = newPos
      itemB.order = oldPos
      updateMediaOrder(itemA)
      updateMediaOrder(itemB)
      const sortedArray = arrayMove(items, oldPos, newPos)
      setItems(sortedArray)
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
            {/* <AddMediaModal type={mediaType} /> */}
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
