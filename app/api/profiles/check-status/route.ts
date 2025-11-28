import { type NextRequest, NextResponse } from "next/server"
import { storage } from "@/lib/storage"

export async function GET(request: NextRequest) {
  try {
    const email = request.nextUrl.searchParams.get("email")

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    // Check if profile exists and get its status
    const profile = storage.getProfileByEmail(email)

    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 })
    }

    return NextResponse.json(
      {
        status: profile.status,
        profile: {
          id: profile.id,
          email: profile.email,
          fullName: profile.fullName,
          status: profile.status,
          role: profile.role,
          ...(profile.role === "faculty" && {
            department: profile.department,
            designation: profile.designation,
            courses: profile.courses,
          }),
          ...(profile.role === "student" && {
            department: profile.department,
            year: profile.year,
          }),
        },
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Check status error:", error)
    return NextResponse.json({ error: "Failed to check status" }, { status: 500 })
  }
}
