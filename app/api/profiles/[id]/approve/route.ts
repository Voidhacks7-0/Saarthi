import { type NextRequest, NextResponse } from "next/server"
import { storage } from "@/lib/storage"

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = await Promise.resolve(params)
    const profile = storage.approveProfile(id)

    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 })
    }

    return NextResponse.json(
      {
        success: true,
        message: "Profile approved successfully",
        profile,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Approve profile error:", error)
    return NextResponse.json({ error: "Failed to approve profile" }, { status: 500 })
  }
}
