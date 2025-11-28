import { type NextRequest, NextResponse } from "next/server"
import { storage } from "@/lib/storage"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password required" }, { status: 400 })
    }

    const admin = storage.verifyAdmin(email, password)
    if (admin) {
      return NextResponse.json(
        {
          success: true,
          message: "Admin sign in successful",
          user: {
            id: "admin",
            email: admin.email,
            fullName: "Admin",
            status: "admin",
            role: "admin",
          },
        },
        { status: 200 },
      )
    }

    const user = storage.verifyUserCredentials(email, password)

    if (!user) {
      return NextResponse.json({ error: "Invalid credentials or profile not approved" }, { status: 401 })
    }

    return NextResponse.json(
      {
        success: true,
        message: "Sign in successful",
        user: {
          id: user.id,
          email: user.email,
          fullName: user.fullName,
          status: user.status,
          role: user.role,
          ...(user.role === "faculty" && {
            department: user.department,
            designation: user.designation,
            courses: user.courses || [],
            isLabInCharge: user.isLabInCharge || false,
          }),
          ...(user.role === "student" && {
            department: user.department,
            year: user.year,
            rollNumber: user.rollNumber,
          }),
        },
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Sign in error:", error)
    return NextResponse.json({ error: "Sign in failed" }, { status: 500 })
  }
}
