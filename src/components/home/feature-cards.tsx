"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { GraduationCap, BookOpen, Users, ArrowRight } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { fadeInUp, staggerContainer } from "@/lib/animations/variants"
import { SITE_CONFIG } from "@/lib/constants/site-config"

const featureIcons = {
  "Why Choose Us?": GraduationCap,
  "Our Curriculum": BookOpen,
  "Student Life": Users,
}

const featureColors = {
  "Why Choose Us?": {
    bg: "bg-primary-50",
    icon: "text-primary",
    hover: "hover:bg-primary-100",
  },
  "Our Curriculum": {
    bg: "bg-secondary-50",
    icon: "text-secondary",
    hover: "hover:bg-secondary-100",
  },
  "Student Life": {
    bg: "bg-neutral-100",
    icon: "text-neutral-700",
    hover: "hover:bg-neutral-200",
  },
}

export function FeatureCards() {
  const { ref, inView } = useScrollAnimation({ threshold: 0.2 })

  return (
    <section ref={ref} className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Heading */}
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeInUp}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 mb-4">
            <span className="border-b-4 border-primary/30 pb-2">
              Why Little Gems School?
            </span>
          </h2>
          <motion.p
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={fadeInUp}
            transition={{ delay: 0.2 }}
            className="text-lg text-neutral-600 max-w-2xl mx-auto"
          >
            Discover what makes us the perfect choice for your child's educational journey
          </motion.p>
        </motion.div>

        {/* Feature Cards Grid */}
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {SITE_CONFIG.features.map((feature, index) => {
            const Icon = featureIcons[feature.title as keyof typeof featureIcons]
            const colors = featureColors[feature.title as keyof typeof featureColors]

            return (
              <motion.div key={feature.title} variants={fadeInUp}>
                <Link href={feature.href} className="block h-full">
                  <Card className="h-full group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer border-2 border-neutral-100 hover:border-primary/40">
                    <CardContent className={`p-8 ${colors.bg} ${colors.hover} transition-colors h-full flex flex-col`}>
                      {/* Icon with Hover Rotation */}
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.4 }}
                        className="mb-6"
                      >
                        <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10">
                          <Icon className={`h-10 w-10 ${colors.icon}`} />
                        </div>
                      </motion.div>

                      {/* Title */}
                      <motion.h3
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="font-heading text-2xl font-bold text-neutral-900 mb-3"
                      >
                        {feature.title}
                      </motion.h3>

                      {/* Description */}
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-neutral-600 mb-6 flex-grow leading-relaxed"
                      >
                        {feature.description}
                      </motion.p>

                      {/* Learn More Link */}
                      <motion.div
                        className="flex items-center text-primary font-semibold gap-2"
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <span>Learn More</span>
                        <motion.div
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <ArrowRight className="h-5 w-5" />
                        </motion.div>
                      </motion.div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
