"use client"

import { useState } from "react"
import { Bell, Search, BookmarkIcon } from "lucide-react"
import Sidebar from "@/components/dashboard/sidebar"

interface Announcement {
  id: string
  title: string
  description: string
  category: "Academic" | "Event" | "Exam" | "General"
  postedBy: string
  postedOn: string
  isRead: boolean
  isBookmarked: boolean
  attachment?: string
}

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([
    {
      id: "1",
      title: "AI Workshop Registration Open",
      description: "Register now for the upcoming AI and Machine Learning workshop. Limited seats available.",
      category: "Event",
      postedBy: "Dr. Sharma",
      postedOn: "2024-01-15",
      isRead: false,
      isBookmarked: false,
      attachment: "workshop-details.pdf",
    },
    {
      id: "2",
      title: "Mid-Term Exam Schedule Released",
      description: "Check the exam schedule for all courses. Exams start from January 20th.",
      category: "Exam",
      postedBy: "Academic Office",
      postedOn: "2024-01-14",
      isRead: true,
      isBookmarked: true,
    },
    {
      id: "3",
      title: "Campus WiFi Maintenance",
      description: "WiFi services will be unavailable on January 16th from 2 PM to 6 PM.",
      category: "General",
      postedBy: "IT Department",
      postedOn: "2024-01-13",
      isRead: true,
      isBookmarked: false,
    },
  ])

  const [selectedFilter, setSelectedFilter] = useState<string>("All")
  const [searchQuery, setSearchQuery] = useState("")

  const filters = ["All", "Academic", "Event", "Exam", "General"]

  const filteredAnnouncements = announcements.filter((announcement) => {
    const matchesFilter = selectedFilter === "All" || announcement.category === selectedFilter
    const matchesSearch = announcement.title.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const unreadCount = announcements.filter((a) => !a.isRead).length
  const bookmarkedCount = announcements.filter((a) => a.isBookmarked).length

  const toggleBookmark = (id: string) => {
    setAnnouncements(announcements.map((a) => (a.id === id ? { ...a, isBookmarked: !a.isBookmarked } : a)))
  }

  const markAsRead = (id: string) => {
    setAnnouncements(announcements.map((a) => (a.id === id ? { ...a, isRead: true } : a)))
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="max-w-6xl mx-auto p-4 md:p-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <Bell className="w-8 h-8 text-primary" />
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">Announcements</h1>
            </div>
            <p className="text-muted-foreground">Stay updated with campus notices and important updates</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-card border border-border rounded-lg p-4">
              <p className="text-sm text-muted-foreground mb-1">Total Announcements</p>
              <p className="text-2xl font-bold text-foreground">{announcements.length}</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <p className="text-sm text-muted-foreground mb-1">Unread</p>
              <p className="text-2xl font-bold text-accent">{unreadCount}</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <p className="text-sm text-muted-foreground mb-1">Bookmarked</p>
              <p className="text-2xl font-bold text-primary">{bookmarkedCount}</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <p className="text-sm text-muted-foreground mb-1">This Week</p>
              <p className="text-2xl font-bold text-foreground">3</p>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="mb-6 flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search announcements..."
                className="w-full pl-10 pr-4 py-2 bg-card border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedFilter === filter
                      ? "bg-primary text-white"
                      : "bg-card border border-border text-foreground hover:bg-muted"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Announcements List */}
          <div className="space-y-4">
            {filteredAnnouncements.length > 0 ? (
              filteredAnnouncements.map((announcement) => (
                <div
                  key={announcement.id}
                  className={`bg-card border border-border rounded-lg p-4 md:p-6 transition-all hover:border-primary ${
                    !announcement.isRead ? "border-accent" : ""
                  }`}
                  onClick={() => markAsRead(announcement.id)}
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start gap-3 mb-2">
                        <div className="flex-1">
                          <h3
                            className={`text-lg font-semibold ${!announcement.isRead ? "text-accent" : "text-foreground"}`}
                          >
                            {announcement.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1">{announcement.description}</p>
                        </div>
                        {!announcement.isRead && <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0 mt-2" />}
                      </div>
                      <div className="flex items-center gap-2 mt-3 flex-wrap text-xs text-muted-foreground">
                        <span className="px-2 py-1 bg-muted rounded text-foreground font-medium">
                          {announcement.category}
                        </span>
                        <span>Posted by {announcement.postedBy}</span>
                        <span>•</span>
                        <span>{announcement.postedOn}</span>
                        {announcement.attachment && (
                          <>
                            <span>•</span>
                            <span className="text-primary cursor-pointer hover:underline">
                              {announcement.attachment}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleBookmark(announcement.id)
                      }}
                      className="flex-shrink-0 p-2 hover:bg-muted rounded-lg transition-colors"
                    >
                      <BookmarkIcon
                        className={`w-5 h-5 ${announcement.isBookmarked ? "fill-primary text-primary" : "text-muted-foreground"}`}
                      />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                <p className="text-muted-foreground">No announcements match your search</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
