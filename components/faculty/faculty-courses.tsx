"use client"

interface FacultyCoursesProps {
  courses: string[]
}

export default function FacultyCourses({ courses }: FacultyCoursesProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-foreground">My Courses</h2>

      {courses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {courses.map((course, index) => (
            <div
              key={index}
              className="bg-card border border-border rounded-lg p-4 hover:border-primary/50 transition-colors cursor-pointer group"
            >
              <h3 className="font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                {course}
              </h3>
              <div className="flex gap-2">
                <button className="flex-1 px-3 py-2 bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground rounded-lg text-sm font-medium transition-colors">
                  Open Forum
                </button>
                <button className="flex-1 px-3 py-2 bg-accent/10 text-accent hover:bg-accent hover:text-accent-foreground rounded-lg text-sm font-medium transition-colors">
                  Announce
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground">No courses assigned</p>
      )}
    </div>
  )
}
