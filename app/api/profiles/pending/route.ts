import { NextResponse } from "next/server"
import { storage } from "@/lib/storage"

export async function GET() {
  try {
    console.log("[v0] GET /api/profiles/pending - Fetching pending profiles")
    const profiles = storage.getPendingProfiles()
    console.log("[v0] Found pending profiles:", profiles.length)

    return NextResponse.json(
      {
        success: true,
        profiles,
        count: profiles.length,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Fetch profiles error:", error)
    return NextResponse.json({ error: "Failed to fetch profiles" }, { status: 500 })
  }
}
