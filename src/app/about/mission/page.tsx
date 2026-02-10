"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { SITE_CONFIG } from "@/lib/constants/site-config"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { fadeInUp, staggerContainer } from "@/lib/animations/variants"

export default function MissionVisionPage() {
  return (
    <div className="container mx-auto px-4 py-24 md:py-32 max-w-6xl">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="space-y-4 mb-16 text-center"
      >
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-neutral-900">
          Mission & Vision
        </h1>
        <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
          Our guiding principles that drive us to nurture future leaders.
        </p>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="grid grid-cols-1 gap-12 lg:gap-20"
      >
        {/* Mission Section */}
        <motion.div variants={fadeInUp} className="bg-white rounded-3xl p-8 md:p-12 border border-neutral-100 shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32 transition-transform group-hover:scale-110" />

          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-8">
              <Badge variant="outline" className="text-primary border-primary px-4 py-1.5 text-sm font-bold uppercase tracking-wider">
                Our Mission
              </Badge>
            </div>

            <h2 className="font-heading text-3xl md:text-4xl font-bold text-neutral-900 mb-8">
              Innovative & <span className="text-primary">Creative Approach</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <p className="text-lg text-neutral-600 leading-relaxed">
                  We utilize the most innovative and creative approach in our child development training, adhering to these core commitments:
                </p>
                <div className="flex flex-col gap-6">
                  <div className="flex gap-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white font-bold text-lg shrink-0 shadow-lg shadow-primary/30">
                      01
                    </div>
                    <div>
                      <h3 className="font-bold text-neutral-900 mb-1">Nurturing Environment</h3>
                      <p className="text-neutral-600">Providing a home environment for all children in our care and inculcating in them moral values.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white font-bold text-lg shrink-0 shadow-lg shadow-primary/30">
                      02
                    </div>
                    <div>
                      <h3 className="font-bold text-neutral-900 mb-1">Equal Opportunity</h3>
                      <p className="text-neutral-600">Ensuring equal educational opportunities for every child in our care.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex flex-col gap-6">
                  <div className="flex gap-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white font-bold text-lg shrink-0 shadow-lg shadow-primary/30">
                      03
                    </div>
                    <div>
                      <h3 className="font-bold text-neutral-900 mb-1">Excellent Service</h3>
                      <p className="text-neutral-600">Offering an outstanding and excellent service to parents and our guardians.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white font-bold text-lg shrink-0 shadow-lg shadow-primary/30">
                      04
                    </div>
                    <div>
                      <h3 className="font-bold text-neutral-900 mb-1">Academic Excellence</h3>
                      <p className="text-neutral-600">Preparing children to acquire the requisite foundation for future academic success.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Vision Section - Now Text Only */}
        <motion.div variants={fadeInUp} className="bg-secondary/5 rounded-3xl p-8 md:p-12 border border-secondary/10 shadow-lg relative overflow-hidden text-center max-w-4xl mx-auto w-full">
          <div className="mb-8 flex justify-center">
            <Badge variant="default" className="bg-secondary text-white px-6 py-2 text-sm font-bold uppercase tracking-wider shadow-lg shadow-secondary/30">
              Our Vision
            </Badge>
          </div>

          <blockquote className="font-heading text-3xl md:text-5xl font-bold text-secondary leading-tight mb-8">
            "{SITE_CONFIG.vision}"
          </blockquote>

          <div className="w-24 h-1 bg-secondary/20 mx-auto rounded-full mb-8" />

          <p className="text-xl text-neutral-600 font-medium max-w-2xl mx-auto">
            We aim to be the <span className="text-secondary font-bold">ultimate educational institution</span> in the child development sector.
          </p>
        </motion.div>
      </motion.div>

      <Separator className="my-20" />

      {/* Core Values Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="space-y-12"
      >
        <motion.div variants={fadeInUp} className="text-center max-w-3xl mx-auto">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
            Core Values
          </h2>
          <p className="text-lg text-neutral-600">
            Helping to tap the child's God-given potential through purposeful activity and grooming.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SITE_CONFIG.values.map((value, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="bg-white p-6 rounded-xl border border-neutral-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-xl mb-4 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                {index + 1}
              </div>
              <p className="text-neutral-700 font-medium leading-relaxed">
                {value}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
