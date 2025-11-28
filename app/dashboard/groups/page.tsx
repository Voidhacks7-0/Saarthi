"use client"

import { useState } from "react"
import { Users, Plus, Star, MessageSquare, UserPlus } from "lucide-react"
import Sidebar from "@/components/dashboard/sidebar"

interface Group {
  id: string
  name: string
  members: number
  rating: number
  description: string
  interests: string[]
  joined: boolean
}

export default function GroupsPage() {
  const [groups] = useState<Group[]>([
    {
      id: "1",
      name: "AI Club",
      members: 45,
      rating: 4.5,
      description: "Explore AI and machine learning with like-minded students",
      interests: ["AI", "ML", "Python"],
      joined: true,
    },
    {
      id: "2",
      name: "Hackathon Squad",
      members: 18,
      rating: 4.8,
      description: "Build amazing projects for hackathons and competitions",
      interests: ["Hackathon", "Development", "Innovation"],
      joined: false,
    },
    {
      id: "3",
      name: "Web Dev Society",
      members: 34,
      rating: 4.3,
      description: "Learn full-stack web development together",
      interests: ["Web Dev", "React", "Node.js"],
      joined: false,
    },
  ])

  const [showCreateForm, setShowCreateForm] = useState(false)

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="max-w-6xl mx-auto p-4 md:p-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <Users className="w-8 h-8 text-primary" />
                <h1 className="text-3xl md:text-4xl font-bold text-foreground">Groups & Forums</h1>
              </div>
              <button
                onClick={() => setShowCreateForm(!showCreateForm)}
                className="px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Create Group
              </button>
            </div>
            <p className="text-muted-foreground">Connect with students, share ideas, and collaborate</p>
          </div>

          {/* Create Form */}
          {showCreateForm && (
            <div className="bg-card border border-border rounded-lg p-6 mb-8">
              <h3 className="text-lg font-bold text-foreground mb-4">Create New Group</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Group Name</label>
                  <input
                    type="text"
                    placeholder="Enter group name"
                    className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Description</label>
                  <textarea
                    placeholder="What is this group about?"
                    className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    rows={3}
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
                  >
                    Create Group
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowCreateForm(false)}
                    className="flex-1 px-4 py-2 bg-muted text-foreground rounded-lg font-medium hover:bg-muted/80 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Groups Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {groups.map((group) => (
              <div
                key={group.id}
                className="bg-card border border-border rounded-lg p-6 hover:border-primary transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-bold text-foreground flex-1">{group.name}</h3>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium text-foreground">{group.rating}</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{group.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {group.interests.map((interest) => (
                    <span key={interest} className="px-2 py-1 bg-muted rounded text-xs font-medium text-foreground">
                      {interest}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                  <span>{group.members} members</span>
                </div>
                <div className="flex gap-2">
                  {group.joined ? (
                    <>
                      <button className="flex-1 px-3 py-2 bg-muted text-foreground rounded-lg font-medium hover:bg-muted/80 transition-colors text-sm flex items-center justify-center gap-2">
                        <MessageSquare className="w-4 h-4" />
                        Discuss
                      </button>
                      <button className="flex-1 px-3 py-2 bg-muted text-foreground rounded-lg font-medium hover:bg-muted/80 transition-colors text-sm">
                        Leave
                      </button>
                    </>
                  ) : (
                    <button className="w-full px-3 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors text-sm flex items-center justify-center gap-2">
                      <UserPlus className="w-4 h-4" />
                      Join Group
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
