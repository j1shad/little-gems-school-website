/**
 * Framer Motion animation variants for consistent animations across the site
 * All durations are in seconds
 */

import { Variants } from "framer-motion"

/**
 * Fade in from bottom with slight movement up
 * Usage: Cards, text blocks appearing on scroll
 */
export const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
}

/**
 * Simple fade in animation
 * Usage: General purpose fade
 */
export const fadeIn: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
}

/**
 * Scale and fade in animation
 * Usage: Modal dialogs, pop-ups
 */
export const scaleIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
}

/**
 * Container variant for staggered children animations
 * Usage: Lists, grids with multiple items
 */
export const staggerContainer: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
}

/**
 * Slide in from left animation
 * Usage: Mobile menu, side panels
 */
export const slideInLeft: Variants = {
  hidden: {
    x: "-100%",
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
  exit: {
    x: "-100%",
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: "easeIn",
    },
  },
}

/**
 * Slide in from right animation
 * Usage: Mobile menu from right side
 */
export const slideInRight: Variants = {
  hidden: {
    x: "100%",
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
  exit: {
    x: "100%",
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: "easeIn",
    },
  },
}

/**
 * Hero background image animation
 * Usage: Hero section background slideshow
 */
export const heroImageVariant: Variants = {
  hidden: {
    opacity: 0,
    scale: 1.1,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 1,
      ease: "easeIn",
    },
  },
}

/**
 * Hero text animation
 * Usage: Hero section heading and subheading
 */
export const heroTextVariant: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
}

/**
 * Button stagger animation for multiple CTAs
 * Usage: Hero section buttons
 */
export const buttonStagger: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: i * 0.1,
      ease: "easeOut",
    },
  }),
}

/**
 * Rotation animation for icons on hover
 * Usage: Feature card icons
 */
export const iconRotate: Variants = {
  initial: {
    rotate: 0,
  },
  hover: {
    rotate: 360,
    transition: {
      duration: 0.4,
      ease: "easeInOut",
    },
  },
}

/**
 * Lift animation for cards
 * Usage: Feature cards, blog cards
 */
export const cardLift: Variants = {
  initial: {
    y: 0,
  },
  hover: {
    y: -8,
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
}

/**
 * Easing functions for transitions
 */
export const easings = {
  easeInOut: [0.4, 0, 0.2, 1],
  easeOut: [0, 0, 0.2, 1],
  easeIn: [0.4, 0, 1, 1],
  sharp: [0.4, 0, 0.6, 1],
}

/**
 * Transition presets
 */
export const transitions = {
  fast: { duration: 0.2 },
  normal: { duration: 0.3 },
  slow: { duration: 0.5 },
  verySlow: { duration: 0.8 },
}

/**
 * Fade in from left with slide
 * Usage: Alternating content sections
 */
export const fadeInLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -30,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
}

/**
 * Fade in from right with slide
 * Usage: Alternating content sections
 */
export const fadeInRight: Variants = {
  hidden: {
    opacity: 0,
    x: 30,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
}

/**
 * Bounce animation for attention
 * Usage: Important CTAs, notifications
 */
export const bounce: Variants = {
  initial: {
    y: 0,
  },
  animate: {
    y: [-5, 0, -5],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
}

/**
 * Pulse animation for emphasis
 * Usage: New badges, important indicators
 */
export const pulse: Variants = {
  initial: {
    scale: 1,
  },
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
}

/**
 * Draw line animation
 * Usage: Underlines, borders, dividers
 */
export const drawLine: Variants = {
  hidden: {
    width: 0,
  },
  visible: {
    width: "100%",
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
}
