import React from "react"

import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import Task from "./task"

const Column = ({ tasks }: { tasks: any[] }) => {
  return (
    <div className="bg-gray-900 rounded p-2 w-[80%] max-w-[500px] flex flex-col gap-2">
      <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
        {tasks.map((task) => (
          <Task key={task.id} id={task.id} title={task.content} />
        ))}
      </SortableContext>
    </div>
  )
}

export default Column
