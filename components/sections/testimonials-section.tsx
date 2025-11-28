"use client"

import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Prof. Sarah Chen",
    role: "Computer Science Faculty",
    content:
      "Campus Connect changed the way we manage events in our department. Our coordination has never been smoother.",
    avatar: "👨‍🏫",
  },
  {
    name: "Aditya Kumar",
    role: "3rd Year Student",
    content: "Resource booking became super smooth and stress-free. I love how easy it is to find study rooms now.",
    avatar: "🎓",
  },
  {
    name: "Emma Rodriguez",
    role: "Student Club President",
    content:
      "The group collaboration features are incredible. Our hackathon planning is now 10x faster with Campus Connect.",
    avatar: "👩‍💼",
  },
]

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Loved by Campus Communities</h2>
          <p className="text-lg text-muted-foreground">See what students and faculty are saying about Campus Connect</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>

              <p className="text-foreground mb-6 text-sm leading-relaxed">{testimonial.content}</p>

              <div className="flex items-center gap-3">
                <div className="text-3xl">{testimonial.avatar}</div>
                <div>
                  <p className="font-semibold text-foreground text-sm">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
