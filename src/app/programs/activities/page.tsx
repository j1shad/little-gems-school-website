import Image from "next/image"
import { Calendar, Users, Palette, Briefcase } from "lucide-react"
import { PageShell } from "@/components/layout/page-shell"

const activities = [
  {
    title: "Culture Day",
    description: "Celebrating our diverse heritage with traditional attire, food, and dance.",
    image: "/lgpa/imgs/culture_day/1.jpg",
    icon: Users,
    date: "Annual Event"
  },
  {
    title: "Career Day",
    description: " inspiring students to dream big by exploring various professions.",
    image: "/lgpa/imgs/career_day/1.jpg",
    icon: Briefcase,
    date: "Annual Event"
  },
  {
    title: "Creativity & Art",
    description: "Expressing imagination through painting, crafting, and design.",
    image: "/lgpa/imgs/creativity_day/1.jpg",
    icon: Palette,
    date: "Weekly Sessions"
  },
  {
    title: "Educational Talks",
    description: "Engaging seminars with guest speakers to broaden student horizons.",
    image: "/lgpa/imgs/educational_talks_programs/1.jpg",
    icon: Calendar,
    date: "Monthly"
  },
]

export default function ExtraActivitiesPage() {
  return (
    <PageShell className="container mx-auto px-4 py-24 md:py-32">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
          Extra Activities & Events
        </h1>
        <p className="text-xl text-neutral-600">
          Beyond the classroom, we provide a vibrant environment for social, cultural, and creative development.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        {activities.map((activity, index) => (
          <div key={index} className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-neutral-100">
            <div className="relative h-64 overflow-hidden">
              <Image
                src={activity.image}
                alt={activity.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary shadow-sm border border-neutral-200">
                {activity.date}
              </div>
            </div>
            <div className="p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-secondary/10 rounded-lg text-secondary">
                  <activity.icon className="w-6 h-6" />
                </div>
                <h3 className="font-heading text-2xl font-bold text-neutral-900">
                  {activity.title}
                </h3>
              </div>
              <p className="text-neutral-600 leading-relaxed">
                {activity.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </PageShell>
  )
}
