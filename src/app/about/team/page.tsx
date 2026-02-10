import Image from "next/image"
import { PageShell } from "@/components/layout/page-shell"

const team = [
  {
    name: "Joyce Abiola",
    role: "Principal",
    image: "/lgpa/imgs/teachers/1.jpg",
    bio: "Dedicated to fostering a nurturing environment for academic and personal growth.",
  },
  {
    name: "Sarah Mensah",
    role: "Head of Academics",
    image: "/lgpa/imgs/teachers/2.jpg",
    bio: "Ensuring our curriculum meets international standards while celebrating local culture.",
  },
  {
    name: "David Osei",
    role: "Head of Admin",
    image: "/lgpa/imgs/teachers/3.jpg",
    bio: "Managing school operations to provide a seamless experience for parents and students.",
  },
  {
    name: "Grace Tetteh",
    role: "Preschool Coordinator",
    image: "/lgpa/imgs/teachers/4.jpg",
    bio: "Specializing in early childhood development and foundational learning.",
  },
  {
    name: "Kwame Asante",
    role: "Primary School Head",
    image: "/lgpa/imgs/teachers/5.jpg",
    bio: "Guiding students through their formative years with patience and excellence.",
  },
  {
    name: "Elizabeth Yeboah",
    role: "JHS Coordinator",
    image: "/lgpa/imgs/teachers/6.jpg",
    bio: "Preparing students for high school and future academic success.",
  },
]

export default function LeadershipTeamPage() {
  return (
    <PageShell className="container mx-auto px-4 py-24 md:py-32">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
          Our Leadership Team
        </h1>
        <p className="text-xl text-neutral-600">
          Meet the dedicated educators and administrators guiding Little Gems School.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {team.map((member, index) => (
          <div key={index} className="group bg-white rounded-2xl overflow-hidden border border-neutral-100 shadow-sm hover:shadow-xl transition-all duration-300">
            <div className="relative h-80 w-full overflow-hidden bg-neutral-100">
              <Image
                src={member.image}
                alt={member.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6">
              <h3 className="font-heading text-2xl font-bold text-neutral-900 mb-1">
                {member.name}
              </h3>
              <p className="text-primary font-medium mb-4">{member.role}</p>
              <p className="text-neutral-600 leading-relaxed">
                {member.bio}
              </p>
            </div>
          </div>
        ))}
      </div>
    </PageShell>
  )
}
