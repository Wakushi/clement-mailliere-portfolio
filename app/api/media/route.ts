import { generateImage } from "@/lib/data"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const body = await req.json()
    console.log("body", body)
    return NextResponse.json({ status: 201 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: error })
  }
}
