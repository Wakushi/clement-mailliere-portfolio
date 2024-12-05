export type Media = {
  id: string
  title: string
  description: string
  imageUrl: string
  type: "drawing" | "animation" | "sketch"
  order: number
  isVideo?: boolean
  fileName?: string
  thumbnailUrl?: string
}

export type Demo = {
  id: string
  url: string
  title: string
}
