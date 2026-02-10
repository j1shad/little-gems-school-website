"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { heroImageVariant, heroTextVariant, buttonStagger } from "@/lib/animations/variants"
import { SITE_CONFIG } from "@/lib/constants/site-config"
import { FloatingParticles } from "@/components/home/3d/floating-particles"

const heroImages = [
  "/lgpa/imgs/miscellaneous/5.jpg", // Students learning
  "/lgpa/imgs/culture_day/1.jpg",   // Cultural celebration
  "/lgpa/imgs/miscellaneous/2.jpg", // Learning moments
  "/lgpa/imgs/excursions/1.jpg",    // Excursions
]

export function HeroSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Auto-rotate images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image Slideshow */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            variants={heroImageVariant}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute inset-0"
          >
            <Image
              src={heroImages[currentImageIndex]}
              alt={`Little Gems School - ${currentImageIndex + 1}`}
              fill
              priority={currentImageIndex === 0}
              className="object-cover"
              sizes="100vw"
              quality={90}
            />
          </motion.div>
        </AnimatePresence>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/60 via-neutral-900/60 to-neutral-900/80" />

        {/* 3D Particles */}
        <FloatingParticles />
      </div>

      {/* Hero Content */}
      <div className="container mx-auto px-4 z-10 text-center">
        <motion.div
          variants={heroTextVariant}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto"
        >
          {/* Main Heading with Creative Styling */}
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="block text-white drop-shadow-2xl">
              Shaping Future
            </span>
            <span className="block bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent animate-gradient">
              Leaders
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-8 md:mb-12 max-w-2xl mx-auto font-medium drop-shadow-lg">
            {SITE_CONFIG.description}
          </p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.3,
                },
              },
            }}
          >
            <motion.div variants={buttonStagger} custom={0} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Button
                asChild
                size="lg"
                className="text-base md:text-lg px-8 py-6 bg-primary hover:bg-primary/90 text-white border-primary transition-transform shadow-xl hover:shadow-2xl"
              >
                <Link href="/apply">Apply Now</Link>
              </Button>
            </motion.div>
            <motion.div variants={buttonStagger} custom={1} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="text-base md:text-lg px-8 py-6 bg-white text-primary border-white hover:bg-neutral-100 transition-transform shadow-xl hover:shadow-2xl"
              >
                <Link href="/contact">Schedule Tour</Link>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="bg-primary/20 rounded-full p-2 backdrop-blur-sm"
          >
            <ChevronDown className="h-8 w-8 text-white" />
          </motion.div>
        </motion.div>
      </div>

      {/* Slideshow Indicators */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {heroImages.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            className={`h-2 rounded-full transition-all duration-300 ${index === currentImageIndex
              ? "w-8 bg-primary"
              : "w-2 bg-white/50 hover:bg-white/70"
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <style jsx global>{`
        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </section>
  )
}
