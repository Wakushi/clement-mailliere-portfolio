"use client"
import LoaderHive from "@/components/ui/loader-hive/loader-hive"
import { getDemos } from "@/lib/data"
import { Demo } from "@/lib/types"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { IoIosClose } from "react-icons/io"

export default function DemosPage() {
  const { data: demos, isLoading } = useQuery<Demo[], Error>({
    queryKey: ["videoUrl"],
    queryFn: () => getDemos(),
  })

  const [showModal, setShowModal] = useState<boolean>(false)
  const [selectedDemo, setSelectedDemo] = useState<Demo | null>(null)

  function toggleModal() {
    setShowModal((prev) => !prev)
  }

  if (isLoading) {
    return (
      <div className="w-full h-full min-h-[100vh]">
        <LoaderHive />
      </div>
    )
  }

  if (!demos) return <div>No Demo found</div>

  return (
    <>
      <div className="p-2 flex flex-wrap items-center justify-center pt-[8rem]">
        {demos.map((demo) => (
          <DemoCard
            key={demo.id}
            demo={demo}
            toggleModal={toggleModal}
            setSelectedDemo={setSelectedDemo}
          />
        ))}
      </div>
      {showModal && (
        <DemoModal toggleModal={toggleModal} selectedDemo={selectedDemo} />
      )}
    </>
  )
}

function DemoCard({
  demo,
  setSelectedDemo,
  toggleModal,
}: {
  demo: Demo
  setSelectedDemo: (demo: Demo) => void
  toggleModal: () => void
}) {
  return (
    <div>
      <div
        className="w-full relative max-w-[400px] md:max-w-[800px]"
        onClick={() => {
          if (setSelectedDemo) {
            setSelectedDemo(demo)
            toggleModal()
          }
        }}
      >
        <video
          loop
          muted
          src={demo.url}
          width={0}
          height={0}
          autoPlay
          style={{ width: "100%", height: "100%" }}
        />
      </div>
      <p className="p-2 font-semibold md:text-lg lg:text-xl text-end">
        {demo.title}
      </p>
    </div>
  )
}

function DemoModal({
  toggleModal,
  selectedDemo,
}: {
  toggleModal: () => void
  selectedDemo: Demo | null
}) {
  useEffect(() => {
    const handleClick = (e: any) => {
      if (
        e.target === document.querySelector("#modal-container") ||
        e.target === document.querySelector("#media-container")
      ) {
        toggleModal()
      }
    }

    window.addEventListener("click", handleClick)
    return () => {
      window.removeEventListener("click", handleClick)
    }
  }, [])

  if (!selectedDemo) return

  return (
    <div
      id="modal-container"
      className="fixed top-0 left-0 z-[5] flex items-center justify-center bg-modal w-full h-full bg-black bg-opacity-90"
    >
      <IoIosClose
        onClick={toggleModal}
        className="absolute text-[2.4rem] md:text-[2.9rem] top-[17px] right-[4px] md:top-[30px] md:right-[30px] opacity-50 hover:opacity-100 transition-opacity duration-500 z-40 cursor-pointer"
      />
      <div
        id="media-container"
        className="opacity-0 fade-in-bottom relative w-full h-full flex items-center justify-center max-w-screen-lg mx-auto"
      >
        <div className="w-full h-full max-w-full max-h-full overflow-hidden p-4 flex items-center justify-center">
          <video
            controls
            autoPlay
            loop
            src={selectedDemo.url}
            width={0}
            height={0}
            style={{ width: "100%", height: "100%" }}
            className="object-contain max-w-full max-h-full mx-auto"
          ></video>
        </div>
      </div>
    </div>
  )
}
