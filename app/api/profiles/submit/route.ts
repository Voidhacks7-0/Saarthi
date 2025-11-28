import { type NextRequest, NextResponse } from "next/server"
import { storage } from "@/lib/storage"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    if (!body.email || !body.fullName) {
      console.log("[v0] Missing required fields:", { email: body.email, fullName: body.fullName })
      return NextResponse.json({ error: "Missing required fields: email and fullName are required" }, { status: 400 })
    }

    if (body.role === "faculty") {
      // Faculty validation
      if (!body.department || !body.designation) {
        console.log("[v0] Missing faculty fields:", {
          department: body.department,
          designation: body.designation,
        })
        return NextResponse.json(
          { error: "Missing required fields: department and designation are required for faculty" },
          { status: 400 },
        )
      }

      if (!body.courses || body.courses.length === 0) {
        console.log("[v0] No courses selected for faculty")
        return NextResponse.json({ error: "Please select at least one course" }, { status: 400 })
      }
    } else {
      // Student validation (original checks)
      if (!body.department || !body.year || !body.rollNumber) {
        console.log("[v0] Missing profile fields:", {
          department: body.department,
          year: body.year,
          rollNumber: body.rollNumber,
        })
        return NextResponse.json(
          { error: "Missing required fields: department, year, and rollNumber are required" },
          { status: 400 },
        )
      }

      if (!body.skills || body.skills.length === 0) {
        console.log("[v0] No skills selected")
        return NextResponse.json({ error: "Please select at least one skill" }, { status: 400 })
      }

      if (!body.interests || body.interests.length === 0) {
        console.log("[v0] No interests selected")
        return NextResponse.json({ error: "Please select at least one interest" }, { status: 400 })
      }

      if (!body.preferredProjectType) {
        console.log("[v0] No project type selected")
        return NextResponse.json({ error: "Please select a preferred project type" }, { status: 400 })
      }

      if (!body.preferredRole) {
        console.log("[v0] No role selected")
        return NextResponse.json({ error: "Please select a preferred role" }, { status: 400 })
      }

      if (!body.availability || body.availability.length === 0) {
        console.log("[v0] No availability selected")
        return NextResponse.json({ error: "Please select at least one availability option" }, { status: 400 })
      }
    }

    console.log("[v0] Profile submission valid, submitting:", {
      email: body.email,
      fullName: body.fullName,
      role: body.role,
    })
    const profile = storage.submitProfile(body)

    return NextResponse.json(
      {
        success: true,
        message: "Profile submitted for approval",
        profileId: profile.id,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Profile submission error:", error)
    return NextResponse.json({ error: "Failed to submit profile" }, { status: 500 })
  }
}
