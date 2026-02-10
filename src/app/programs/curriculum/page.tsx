import Image from "next/image"
import { BookOpen, Globe2, Brain, CheckCircle2 } from "lucide-react"
import { PageShell } from "@/components/layout/page-shell"

export default function CurriculumPage() {
  return (
    <PageShell className="container mx-auto px-4 py-24 md:py-32">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
          Our Curriculum
        </h1>
        <p className="text-xl text-neutral-600">
          A balanced blend of Montessori methods and the Ghana Education Service (GES) curriculum.
        </p>
      </div>

      {/* Montessori Section */}
      <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center mb-24">
        <div className="order-2 md:order-1 relative h-[400px] rounded-3xl overflow-hidden shadow-2xl">
          <Image
            src="/lgpa/imgs/miscellaneous/19.jpg"
            alt="Montessori Learning"
            fill
            className="object-cover"
          />
        </div>
        <div className="order-1 md:order-2">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-primary/10 p-2 rounded-lg text-primary">
              <Brain className="w-8 h-8" />
            </div>
            <h2 className="font-heading text-3xl font-bold text-neutral-900">
              Montessori Method
            </h2>
          </div>
          <p className="text-lg text-neutral-600 mb-6">
            Our preschool program is grounded in the Montessori philosophy, fostering independence,
            creativity, and a love for learning through hands-on activities.
          </p>
          <ul className="space-y-3">
            <li className="flex items-center gap-3 text-neutral-700">
              <CheckCircle2 className="w-5 h-5 text-primary" /> Self-directed activity
            </li>
            <li className="flex items-center gap-3 text-neutral-700">
              <CheckCircle2 className="w-5 h-5 text-primary" /> Hands-on learning
            </li>
            <li className="flex items-center gap-3 text-neutral-700">
              <CheckCircle2 className="w-5 h-5 text-primary" /> Collaborative play
            </li>
          </ul>
        </div>
      </div>

      {/* GES Section */}
      <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-secondary/10 p-2 rounded-lg text-secondary">
              <Globe2 className="w-8 h-8" />
            </div>
            <h2 className="font-heading text-3xl font-bold text-neutral-900">
              GES Curriculum
            </h2>
          </div>
          <p className="text-lg text-neutral-600 mb-6">
            For our primary and junior high levels, we follow the Ghana Education Service curriculum,
            enhanced with modern teaching aids and a focus on critical thinking.
          </p>
          <ul className="space-y-3">
            <li className="flex items-center gap-3 text-neutral-700">
              <CheckCircle2 className="w-5 h-5 text-secondary" /> Core subjects mastery
            </li>
            <li className="flex items-center gap-3 text-neutral-700">
              <CheckCircle2 className="w-5 h-5 text-secondary" /> ICT integration
            </li>
            <li className="flex items-center gap-3 text-neutral-700">
              <CheckCircle2 className="w-5 h-5 text-secondary" /> Leadership development
            </li>
          </ul>
        </div>
        <div className="relative h-[400px] rounded-3xl overflow-hidden shadow-2xl">
          <Image
            src="/lgpa/imgs/miscellaneous/5.jpg"
            alt="GES Classroom"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </PageShell>
  )
}
