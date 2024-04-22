import { generateImage } from "@/lib/data"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const formData = await req.formData()
    const file = formData.get("image")
    console.log("file", file)
    // const imageUrl = await generateImage(body.image)
    return NextResponse.json("imageUrl", { status: 201 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: error })
  }
}
