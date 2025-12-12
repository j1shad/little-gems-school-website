"use client"

import { useEffect, useState } from "react"
import { motion, useMotionValue, useTransform, animate } from "framer-motion"
import { Award, Users, TrendingUp, GraduationCap } from "lucide-react"

import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { fadeInUp, staggerContainer } from "@/lib/animations/variants"
import { SITE_CONFIG } from "@/lib/constants/site-config"

const stats = [
  {
    label: "Years of Excellence",
    value: SITE_CONFIG.stats.yearsOfExcellence,
    icon: Award,
    suffix: "+",
  },
  {
    label: "Happy Students",
    value: SITE_CONFIG.stats.totalStudents,
    icon: Users,
    suffix: "+",
  },
  {
    label: "Success Rate",
    value: SITE_CONFIG.stats.successRate,
    icon: TrendingUp,
    suffix: "%",
  },
  {
    label: "Qualified Teachers",
    value: SITE_CONFIG.stats.qualifiedTeachers,
    icon: GraduationCap,
    suffix: "+",
  },
]

interface AnimatedCounterProps {
  value: number
  duration?: number
  inView: boolean
}

function AnimatedCounter({ value, duration = 1.5, inView }: AnimatedCounterProps) {
  const count = useMotionValue(0)
  const rounded = useTransform(count, (latest) => Math.round(latest))
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    if (inView) {
      const controls = animate(count, value, { duration })
      return controls.stop
    }
  }, [count, value, duration, inView])

  useEffect(() => {
    return rounded.on("change", (latest) => setDisplayValue(latest))
  }, [rounded])

  return <span>{displayValue}</span>
}

export function StatsSection() {
  const { ref, inView } = useScrollAnimation({ threshold: 0.3 })

  return (
    <section
      ref={ref}
      className="py-16 md:py-24 bg-gradient-to-br from-primary-50 via-white to-secondary-50"
    >
      <div className="container mx-auto px-4">
        {/* Section Heading */}
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeInUp}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 mb-4">
            Our <span className="text-secondary">Achievements</span>
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Excellence in education, proven by our track record
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.label}
                variants={fadeInUp}
                custom={index}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="text-center"
              >
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border-t-4 border-primary hover:border-secondary duration-300">
                  {/* Icon */}
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={inView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
                    transition={{ delay: 0.3 + (index * 0.1), duration: 0.5, ease: "easeOut" }}
                    className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary mb-4"
                  >
                    <Icon className="h-8 w-8 text-white" />
                  </motion.div>

                  {/* Animated Number */}
                  <div className="font-heading text-4xl md:text-5xl font-bold text-neutral-900 mb-2">
                    <AnimatedCounter value={stat.value} inView={inView} />
                    <span className="text-primary">{stat.suffix}</span>
                  </div>

                  {/* Label */}
                  <p className="text-neutral-600 font-medium">{stat.label}</p>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
