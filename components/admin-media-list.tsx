"use client"
import { useState } from "react"
import AddMediaModal from "./add-media-modal"
import { fetchMedias, updateMediaListOrder } from "@/lib/data"
import { Button } from "./ui/button"
import LoaderSmall from "./ui/loader/loader-small"
import { Media } from "@/lib/types"
import DraggableMediaList from "./draggable-media-list"
import { FaRegEdit } from "react-icons/fa"
import clsx from "clsx"
import MediaList from "./media-list"
import { IoIosReorder } from "react-icons/io"

interface AdminMediaListProps {
  medias: Media[]
  mediaType: "drawing" | "animation" | "sketch"
}

export default function AdminMediaList({
  medias,
  mediaType,
}: AdminMediaListProps) {
  const [updatedListOrder, setUpdatedListOrder] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [items, setItems] = useState(medias)
  const [mode, setMode] = useState<"edit" | "swap">("swap")

  async function updateList() {
    if (!updatedListOrder) return
    setIsLoading(true)
    items.forEach((media, index) => {
      media.order = index
    })
    try {
      await updateMediaListOrder(items)
      setUpdatedListOrder(false)
    } catch (error) {
      console.error(error)
    } finally {
      const medias = await fetchMedias(mediaType)
      setItems(medias)
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col">
      <div className="flex flex-col p-4 gap-2">
        <CustomSwitch mode={mode} setMode={setMode} />
        <div className="flex items-center gap-2 w-full ">
          <AddMediaModal type={mediaType} />
          {updatedListOrder && (
            <Button
              onClick={updateList}
              className="bg-indigo-800 w-full px-4 py-2 rounded font-bold text-md"
            >
              {isLoading ? <LoaderSmall /> : "Save"}
            </Button>
          )}
        </div>
      </div>
      {mode === "swap" ? (
        <DraggableMediaList
          items={items}
          setItems={setItems}
          setUpdatedListOrder={setUpdatedListOrder}
        />
      ) : (
        <MediaList medias={items} adminView={true} />
      )}
    </div>
  )
}

function CustomSwitch({
  setMode,
  mode = "swap",
}: {
  mode: "edit" | "swap"
  setMode: (mode: "edit" | "swap") => void
}) {
  return (
    <div className="rounded border border-gray-700 p-2 flex items-center h-full w-full gap-2">
      <div
        className={clsx(
          "rounded bg-indigo-800 px-4 py-2 w-full h-[40px] flex items-center justify-center",
          {
            "bg-white text-indigo-800 opacity-100": mode === "swap",
            "opacity-70": mode === "edit",
          }
        )}
        onClick={() => setMode("swap")}
      >
        <IoIosReorder
          fontSize={"1.7rem"}
          fill={mode === "swap" ? "#3730A3" : "#fff"}
        />
      </div>
      <div
        className={clsx(
          "rounded bg-indigo-800 px-4 py-2 w-full h-[40px] flex items-center justify-center",
          {
            "bg-white text-indigo-800 opacity-100": mode === "edit",
            "opacity-70": mode === "swap",
          }
        )}
        onClick={() => setMode("edit")}
      >
        <FaRegEdit
          fontSize={"1.3rem"}
          fill={mode === "edit" ? "#3730A3" : "#fff"}
        />
      </div>
    </div>
  )
}
