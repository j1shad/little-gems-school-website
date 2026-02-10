import Image from "next/image"
import { CalendarDays, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { PageShell } from "@/components/layout/page-shell"

const news = [
  {
    title: "Class of 2024 Graduation Ceremony",
    excerpt: "Celebrating the achievements of our graduating class as they embark on their next chapter. A day filled with joy, awards, and proud moments.",
    date: "July 2024",
    image: "/lgpa/imgs/graduation/1.jpg",
    category: "Events"
  },
  {
    title: "School Excursion to Botanical Gardens",
    excerpt: "Students explored nature and learned about various plant species in our recent educational trip.",
    date: "March 2024",
    image: "/lgpa/imgs/excursions/1.jpg",
    category: "Student Life"
  },
  {
    title: "Empowering Future Leaders",
    excerpt: "Our weekly leadership seminar focused on building confidence and public speaking skills.",
    date: "February 2024",
    image: "/lgpa/imgs/educational_talks_programs/2.jpg",
    category: "Academic"
  }
]

export default function NewsEventsPage() {
  return (
    <PageShell className="container mx-auto px-4 py-24 md:py-32">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
          News & Events
        </h1>
        <p className="text-xl text-neutral-600">
          Stay updated with the latest happenings, celebrations, and stories from Little Gems School.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {news.map((item, index) => (
          <div key={index} className="flex flex-col bg-white rounded-2xl overflow-hidden border border-neutral-200 hover:border-primary/50 transition-colors shadow-sm hover:shadow-xl">
            <div className="relative h-56 w-full">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
              />
              <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-md px-3 py-1 rounded-md text-xs font-semibold text-white">
                {item.category}
              </div>
            </div>

            <div className="flex-1 p-6 flex flex-col">
              <div className="flex items-center gap-2 text-sm text-neutral-400 mb-3">
                <CalendarDays className="w-4 h-4" />
                <span>{item.date}</span>
              </div>

              <h3 className="font-heading text-xl font-bold text-neutral-900 mb-3 line-clamp-2">
                {item.title}
              </h3>

              <p className="text-neutral-600 mb-6 flex-1 line-clamp-3">
                {item.excerpt}
              </p>

              <Button asChild variant="link" className="self-start p-0 h-auto font-semibold text-primary hover:text-primary/80">
                <Link href="#">
                  Read More <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </PageShell>
  )
}
