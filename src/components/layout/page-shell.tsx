"use client"

import { motion } from "framer-motion"
import { fadeInUp } from "@/lib/animations/variants"

export function PageShell({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className={className}
        >
            {children}
        </motion.div>
    )
}
