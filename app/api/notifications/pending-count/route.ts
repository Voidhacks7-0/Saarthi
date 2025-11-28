import { type NextRequest, NextResponse } from "next/server"
import { storage } from "@/lib/storage"

export async function GET(_request: NextRequest) {
  try {
    const pendingCount = storage.getPendingNotificationsCount()
    const notifications = storage.getUnreadNotifications()

    return NextResponse.json(
      {
        success: true,
        pendingCount,
        unreadCount: notifications.length,
        notifications,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Get notifications error:", error)
    return NextResponse.json({ error: "Failed to get notifications" }, { status: 500 })
  }
}
