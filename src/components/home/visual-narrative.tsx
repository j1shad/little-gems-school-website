"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils/cn"

const videos = [
    {
        src: "/lgpa/vids/culture_day/1.mp4",
        title: "Cultural Celebration",
        span: "col-span-1 md:col-span-2 row-span-2",
    },
    {
        src: "/lgpa/vids/miscellaneous/5.mp4",
        title: "Daily Life",
        span: "col-span-1 md:col-span-1 row-span-1",
    },
    {
        src: "/lgpa/vids/miscellaneous/2.mp4",
        title: "Learning Moments",
        span: "col-span-1 md:col-span-1 row-span-1",
    },
]

export function VisualNarrative() {
    return (
        <section className="py-24 bg-neutral-900 text-white overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="mb-12 md:mb-16 text-center max-w-3xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="font-heading text-3xl md:text-5xl font-bold mb-6"
                    >
                        A Glimpse Into Our World
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-lg text-neutral-400"
                    >
                        Experience the vibrant life at Little Gems, where every day is a new opportunity for discovery and growth.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 h-auto md:h-[600px]">
                    {videos.map((video, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className={cn(
                                "relative rounded-2xl overflow-hidden group shadow-2xl aspect-[4/3] md:aspect-auto",
                                video.span
                            )}
                        >
                            <div className="absolute inset-0 bg-neutral-900/20 group-hover:bg-neutral-900/0 transition-colors duration-500 z-10" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-90 z-10" />

                            <video
                                src={video.src}
                                autoPlay
                                muted
                                loop
                                playsInline
                                className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                            />

                            <div className="absolute bottom-6 left-6 z-20">
                                <h3 className="text-white font-heading text-xl font-semibold drop-shadow-lg">
                                    {video.title}
                                </h3>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
