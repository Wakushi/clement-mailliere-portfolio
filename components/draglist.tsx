"use client"
import { DndContext, closestCorners } from "@dnd-kit/core"
import { useState } from "react"
import Column from "./column"
import { arrayMove } from "@dnd-kit/sortable"

export default function DragList() {
  const [tasks, setTasks] = useState([
    { id: 1, content: "Task 1" },
    { id: 2, content: "Task 2" },
    { id: 3, content: "Task 3" },
    { id: 4, content: "Task 4" },
  ])

  const getTaskPosition = (id: number) => {
    return tasks.findIndex((task) => task.id === id)
  }

  const handleDragEnd = (event: any) => {
    const { active, over } = event
    if (active.id !== over.id) {
      setTasks((tasks) => {
        const oldPos = getTaskPosition(active.id)
        const newPos = getTaskPosition(over.id)
        return arrayMove(tasks, oldPos, newPos)
        // const newTasks = [...tasks]
        // const switchedTask = newTasks.splice(newPos, 1, newTasks[oldPos])
        // newTasks.splice(oldPos, 1, switchedTask[0])
        // return newTasks
      })
    }
  }

  return (
    <div>
      <h1>Draglist</h1>
      <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
        <Column tasks={tasks} />
      </DndContext>
    </div>
  )
}
