// File-based persistent storage that works in both v0 and VS Code
import * as fs from "fs"
import * as path from "path"

interface StudentProfile {
  id: string
  fullName: string
  email: string
  password: string
  department: string
  year: string
  rollNumber: string
  skills: string[]
  interests: string[]
  preferredProjectType: string
  preferredRole: string
  availability: string[]
  bio: string
  github: string
  linkedin: string
  portfolio: string
  status: "pending" | "approved" | "rejected"
  submittedAt: string
  role: "student"
}

interface FacultyProfile {
  id: string
  fullName: string
  email: string
  password: string
  facultyId: string
  department: string
  designation: string
  courses: string[]
  isLabInCharge: boolean
  isLibrarian: boolean
  officeHours: string
  contactNumber: string
  bio: string
  status: "pending" | "approved" | "rejected"
  submittedAt: string
  role: "faculty"
}

type Profile = StudentProfile | FacultyProfile

interface AdminUser {
  email: string
  password: string
  role: "admin"
}

interface Notification {
  id: string
  type: "new_submission" | "approval_success" | "rejection"
  message: string
  profileId: string
  read: boolean
  createdAt: string
}

const adminUsers: AdminUser[] = [
  {
    email: "amitkumar911344@gmail.com",
    password: "admin123",
    role: "admin",
  },
]

const STORAGE_FILE = path.join(process.cwd(), ".data", "profiles.json")
const FACULTY_STORAGE_FILE = path.join(process.cwd(), ".data", "faculty-profiles.json")
const NOTIFICATIONS_FILE = path.join(process.cwd(), ".data", "notifications.json")

// Ensure .data directory exists
const ensureDataDir = () => {
  const dataDir = path.join(process.cwd(), ".data")
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }
}

// Load profiles from file (server-side)
const loadProfilesFromFile = (): Map<string, StudentProfile> => {
  try {
    ensureDataDir()
    if (fs.existsSync(STORAGE_FILE)) {
      const data = fs.readFileSync(STORAGE_FILE, "utf-8")
      const profiles = JSON.parse(data)
      return new Map(Object.entries(profiles))
    }
  } catch (error) {
    console.error("[v0] Failed to load profiles from file:", error)
  }
  return new Map()
}

// Save profiles to file (server-side)
const saveProfilesToFile = (profiles: Map<string, StudentProfile>) => {
  try {
    ensureDataDir()
    const data = Object.fromEntries(profiles)
    fs.writeFileSync(STORAGE_FILE, JSON.stringify(data, null, 2))
    console.log("[v0] Profiles saved to file")
  } catch (error) {
    console.error("[v0] Failed to save profiles to file:", error)
  }
}

// Load faculty profiles from file (server-side)
const loadFacultyProfilesFromFile = (): Map<string, FacultyProfile> => {
  try {
    ensureDataDir()
    if (fs.existsSync(FACULTY_STORAGE_FILE)) {
      const data = fs.readFileSync(FACULTY_STORAGE_FILE, "utf-8")
      const profiles = JSON.parse(data)
      return new Map(Object.entries(profiles))
    }
  } catch (error) {
    console.error("[v0] Failed to load faculty profiles from file:", error)
  }
  return new Map()
}

// Save faculty profiles to file (server-side)
const saveFacultyProfilesToFile = (profiles: Map<string, FacultyProfile>) => {
  try {
    ensureDataDir()
    const data = Object.fromEntries(profiles)
    fs.writeFileSync(FACULTY_STORAGE_FILE, JSON.stringify(data, null, 2))
    console.log("[v0] Faculty profiles saved to file")
  } catch (error) {
    console.error("[v0] Failed to save faculty profiles to file:", error)
  }
}

// Load notifications from file (server-side)
const loadNotificationsFromFile = (): Map<string, Notification> => {
  try {
    ensureDataDir()
    if (fs.existsSync(NOTIFICATIONS_FILE)) {
      const data = fs.readFileSync(NOTIFICATIONS_FILE, "utf-8")
      const notifications = JSON.parse(data)
      return new Map(Object.entries(notifications))
    }
  } catch (error) {
    console.error("[v0] Failed to load notifications from file:", error)
  }
  return new Map()
}

// Save notifications to file (server-side)
const saveNotificationsToFile = (notifications: Map<string, Notification>) => {
  try {
    ensureDataDir()
    const data = Object.fromEntries(notifications)
    fs.writeFileSync(NOTIFICATIONS_FILE, JSON.stringify(data, null, 2))
  } catch (error) {
    console.error("[v0] Failed to save notifications to file:", error)
  }
}

// Initialize storage from file
let profiles = loadProfilesFromFile()
let facultyProfiles = loadFacultyProfilesFromFile()
let notifications = loadNotificationsFromFile()
const users: Map<string, StudentProfile | FacultyProfile> = new Map()

export const storage = {
  verifyAdmin: (email: string, password: string) => {
    return adminUsers.find((admin) => admin.email === email && admin.password === password) || null
  },

  // Submit profile for approval
  submitProfile: (profileData: any) => {
    const id = Math.random().toString(36).substring(7)

    if (profileData.role === "faculty") {
      const profile: FacultyProfile = {
        ...profileData,
        id,
        status: "pending",
        submittedAt: new Date().toISOString(),
      }
      console.log("[v0] Faculty profile stored:", { id, email: profile.email, fullName: profile.fullName })
      facultyProfiles.set(id, profile)
      saveFacultyProfilesToFile(facultyProfiles)
      console.log("[v0] Total pending faculty profiles:", facultyProfiles.size)

      storage.addNotification({
        type: "new_submission",
        message: `New faculty profile submitted by ${profileData.fullName}`,
        profileId: id,
        read: false,
      })

      return profile
    } else {
      const profile: StudentProfile = {
        ...profileData,
        id,
        status: "pending",
        submittedAt: new Date().toISOString(),
        role: "student",
      }
      console.log("[v0] Student profile stored:", { id, email: profile.email, fullName: profile.fullName })
      profiles.set(id, profile)
      saveProfilesToFile(profiles)
      console.log("[v0] Total pending profiles:", profiles.size)

      storage.addNotification({
        type: "new_submission",
        message: `New student profile submitted by ${profileData.fullName}`,
        profileId: id,
        read: false,
      })

      return profile
    }
  },

  // Get profile by email
  getProfileByEmail: (email: string) => {
    const studentProfile = Array.from(profiles.values()).find((p) => p.email === email)
    if (studentProfile) return studentProfile
    return Array.from(facultyProfiles.values()).find((p) => p.email === email) || null
  },

  // Get all pending profiles
  getPendingProfiles: () => {
    profiles = loadProfilesFromFile()
    facultyProfiles = loadFacultyProfilesFromFile()
    const studentPending = Array.from(profiles.values()).filter((p) => p.status === "pending")
    const facultyPending = Array.from(facultyProfiles.values()).filter((p) => p.status === "pending")
    const allPending = [...studentPending, ...facultyPending]
    console.log("[v0] Fetching pending profiles, count:", allPending.length)
    return allPending
  },

  // Get profile by ID (student or faculty)
  getProfile: (id: string) => {
    profiles = loadProfilesFromFile()
    facultyProfiles = loadFacultyProfilesFromFile()
    const studentProfile = profiles.get(id)
    if (studentProfile) return studentProfile
    return facultyProfiles.get(id)
  },

  // Approve profile
  approveProfile: (id: string) => {
    profiles = loadProfilesFromFile()
    facultyProfiles = loadFacultyProfilesFromFile()

    const studentProfile = profiles.get(id)
    if (studentProfile) {
      studentProfile.status = "approved"
      users.set(studentProfile.email, studentProfile)
      profiles.set(id, studentProfile)
      saveProfilesToFile(profiles)
      console.log("[v0] Student profile approved:", { id, email: studentProfile.email })

      storage.addNotification({
        type: "approval_success",
        message: `Profile of ${studentProfile.fullName} has been approved`,
        profileId: id,
        read: false,
      })

      return studentProfile
    }

    const facultyProfile = facultyProfiles.get(id)
    if (facultyProfile) {
      facultyProfile.status = "approved"
      users.set(facultyProfile.email, facultyProfile)
      facultyProfiles.set(id, facultyProfile)
      saveFacultyProfilesToFile(facultyProfiles)
      console.log("[v0] Faculty profile approved:", { id, email: facultyProfile.email })

      storage.addNotification({
        type: "approval_success",
        message: `Profile of ${facultyProfile.fullName} has been approved`,
        profileId: id,
        read: false,
      })

      return facultyProfile
    }

    return null
  },

  // Reject profile
  rejectProfile: (id: string) => {
    profiles = loadProfilesFromFile()
    facultyProfiles = loadFacultyProfilesFromFile()

    const studentProfile = profiles.get(id)
    if (studentProfile) {
      studentProfile.status = "rejected"
      profiles.set(id, studentProfile)
      saveProfilesToFile(profiles)
      console.log("[v0] Student profile rejected:", { id, email: studentProfile.email })

      storage.addNotification({
        type: "rejection",
        message: `Profile of ${studentProfile.fullName} has been rejected`,
        profileId: id,
        read: false,
      })

      return studentProfile
    }

    const facultyProfile = facultyProfiles.get(id)
    if (facultyProfile) {
      facultyProfile.status = "rejected"
      facultyProfiles.set(id, facultyProfile)
      saveFacultyProfilesToFile(facultyProfiles)
      console.log("[v0] Faculty profile rejected:", { id, email: facultyProfile.email })

      storage.addNotification({
        type: "rejection",
        message: `Profile of ${facultyProfile.fullName} has been rejected`,
        profileId: id,
        read: false,
      })

      return facultyProfile
    }

    return null
  },

  // Get all profiles (admin view)
  getAllProfiles: () => {
    profiles = loadProfilesFromFile()
    facultyProfiles = loadFacultyProfilesFromFile()
    const allProfiles = [...Array.from(profiles.values()), ...Array.from(facultyProfiles.values())]
    return allProfiles
  },

  verifyUserCredentials: (email: string, password: string) => {
    profiles = loadProfilesFromFile()
    facultyProfiles = loadFacultyProfilesFromFile()

    // Check approved students
    const approvedStudent = Array.from(profiles.values()).find(
      (p) => p.email === email && p.password === password && p.status === "approved",
    )
    if (approvedStudent) return approvedStudent

    // Check approved faculty
    const approvedFaculty = Array.from(facultyProfiles.values()).find(
      (p) => p.email === email && p.password === password && p.status === "approved",
    )
    if (approvedFaculty) return approvedFaculty

    return null
  },

  // Keep old verifyUser for backward compatibility
  verifyUser: (email: string, password: string) => {
    return storage.verifyUserCredentials(email, password)
  },

  addNotification: (notification: Omit<Notification, "id" | "createdAt">) => {
    const id = Math.random().toString(36).substring(7)
    const newNotification: Notification = {
      ...notification,
      id,
      createdAt: new Date().toISOString(),
    }
    notifications.set(id, newNotification)
    saveNotificationsToFile(notifications) // Save to file instead of localStorage
    return newNotification
  },

  getNotifications: () => {
    notifications = loadNotificationsFromFile() // Reload from file
    return Array.from(notifications.values()).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
  },

  getUnreadNotifications: () => {
    notifications = loadNotificationsFromFile() // Reload from file
    return Array.from(notifications.values()).filter((n) => !n.read)
  },

  getPendingNotificationsCount: () => {
    profiles = loadProfilesFromFile() // Reload from file
    facultyProfiles = loadFacultyProfilesFromFile() // Reload from file
    const studentPendingCount = Array.from(profiles.values()).filter((p) => p.status === "pending").length
    const facultyPendingCount = Array.from(facultyProfiles.values()).filter((p) => p.status === "pending").length
    return studentPendingCount + facultyPendingCount
  },

  markNotificationAsRead: (id: string) => {
    notifications = loadNotificationsFromFile() // Reload from file
    const notification = notifications.get(id)
    if (notification) {
      notification.read = true
      notifications.set(id, notification)
      saveNotificationsToFile(notifications) // Save to file instead of localStorage
    }
  },

  markAllNotificationsAsRead: () => {
    notifications = loadNotificationsFromFile() // Reload from file
    notifications.forEach((notification) => {
      notification.read = true
    })
    saveNotificationsToFile(notifications) // Save to file instead of localStorage
  },
}
