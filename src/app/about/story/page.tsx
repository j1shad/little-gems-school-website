"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { fadeInUp, staggerContainer } from "@/lib/animations/variants"

export default function OurStoryPage() {
  return (
    <div className="container mx-auto px-4 py-24 md:py-32 max-w-6xl">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center"
      >
        {/* Text Content */}
        <div className="order-2 md:order-1 space-y-8">
          <motion.div variants={fadeInUp} className="space-y-4">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-neutral-900">
              Our Story
            </h1>
            <p className="text-xl text-neutral-600 font-medium">
              Welcome to Little Gems Schools
            </p>
          </motion.div>

          <motion.div variants={fadeInUp} className="prose prose-lg prose-neutral max-w-none">
            <p className="lead text-2xl font-heading text-neutral-800 leading-relaxed">
              Where we nurture the minds and hearts of future leaders.
            </p>

            <p>
              Located in Dansoman, we are dedicated to providing a holistic education that combines academic excellence
              with a deep appreciation for cultural diversity and personal growth. Our dynamic curriculum is designed
              to inspire creativity, critical thinking, and a lifelong love of learning.
            </p>

            <p>
              At Little Gems, we pride ourselves on creating a supportive and inclusive community where every student
              feels valued and empowered to reach their full potential. Our experienced and passionate educators are
              committed to guiding each child on their unique journey, fostering their talents and helping them
              navigate the challenges of the modern world.
            </p>
          </motion.div>

          <motion.div variants={fadeInUp} className="p-8 bg-primary/5 rounded-2xl border-l-4 border-primary shadow-sm hover:shadow-md transition-shadow duration-300">
            <p className="text-xl font-medium text-neutral-800 italic m-0">
              "Join us at Little Gems Schools, where we believe that every child is a precious gem with the potential to shine brightly in the world."
            </p>
          </motion.div>

          <motion.p variants={fadeInUp} className="text-lg text-neutral-600">
            We believe in properly grooming and equipping each child with necessary skills needed for good performance,
            and offering excellent training and direction necessary for attaining self-perfection during the formative years.
          </motion.p>
        </div>

        {/* Images */}
        <motion.div variants={fadeInUp} className="order-1 md:order-2 space-y-8">
          <div className="relative h-[400px] w-full rounded-3xl overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-all duration-500">
            <Image
              src="/lgpa/imgs/miscellaneous/19.jpg"
              alt="Students in classroom"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative h-[300px] w-[80%] ml-auto rounded-3xl overflow-hidden shadow-xl -rotate-2 hover:rotate-0 transition-all duration-500 border-4 border-white">
            <Image
              src="/lgpa/imgs/culture_day/2.jpg"
              alt="Cultural day celebration"
              fill
              className="object-cover"
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
