export type Media = {
  id: string
  title: string
  description: string
  imageUrl: string
  type: "drawing" | "animation" | "sketch"
  order: number
  isVideo?: boolean
}
