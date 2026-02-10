import { Baby, School, GraduationCap, BookOpen, Clock } from "lucide-react"
import { PageShell } from "@/components/layout/page-shell"

const grades = [
  {
    title: "Creche & Nursery",
    age: "3 months - 4 years",
    description: "A nurturing environment focused on sensory development, motor skills, and social interaction.",
    icon: Baby,
    color: "bg-pink-100 text-pink-600"
  },
  {
    title: "Kindergarten",
    age: "4 - 6 years",
    description: "Building strong foundations in reading, writing, and numeracy through structured play.",
    icon: School,
    color: "bg-yellow-100 text-yellow-600"
  },
  {
    title: "Primary",
    age: "6 - 12 years",
    description: "Developing critical thinking and core academic skills in a supportive setting.",
    icon: BookOpen,
    color: "bg-blue-100 text-blue-600"
  },
  {
    title: "Junior High",
    age: "12 - 15 years",
    description: "Rigorous academic preparation for Senior High School and future leadership roles.",
    icon: GraduationCap,
    color: "bg-purple-100 text-purple-600"
  }
]

export default function GradeLevelsPage() {
  return (
    <PageShell className="container mx-auto px-4 py-24 md:py-32">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
          Grade Levels
        </h1>
        <p className="text-xl text-neutral-600">
          We provide a seamless educational journey for children from infancy through adolescence.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {grades.map((grade, index) => (
          <div key={index} className="bg-white rounded-3xl p-8 border border-neutral-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${grade.color}`}>
              <grade.icon className="w-8 h-8" />
            </div>

            <h3 className="font-heading text-xl font-bold text-neutral-900 mb-2">
              {grade.title}
            </h3>

            <div className="flex items-center gap-2 text-sm text-neutral-500 mb-4 font-semibold">
              <Clock className="w-4 h-4" />
              {grade.age}
            </div>

            <p className="text-neutral-600 leading-relaxed">
              {grade.description}
            </p>
          </div>
        ))}
      </div>
    </PageShell>
  )
}
