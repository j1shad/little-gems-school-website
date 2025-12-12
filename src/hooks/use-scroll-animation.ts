"use client"

import { useEffect, useRef, useState } from "react"

interface UseScrollAnimationOptions {
  /**
   * The percentage of the element that must be visible before triggering
   * @default 0.1 (10%)
   */
  threshold?: number
  /**
   * Whether to only trigger the animation once
   * @default true
   */
  triggerOnce?: boolean
  /**
   * Root margin for the Intersection Observer
   * @default "0px"
   */
  rootMargin?: string
}

/**
 * Custom hook for triggering animations when an element enters the viewport
 * Uses Intersection Observer API for performance
 *
 * @example
 * const { ref, inView } = useScrollAnimation({ threshold: 0.2 })
 * return <div ref={ref}>{inView && "Element is visible!"}</div>
 */
export function useScrollAnimation<T extends HTMLElement = HTMLDivElement>(
  options: UseScrollAnimationOptions = {}
) {
  const {
    threshold = 0.1,
    triggerOnce = true,
    rootMargin = "0px",
  } = options

  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)
  const [hasBeenInView, setHasBeenInView] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    // If already been in view and triggerOnce is true, don't observe
    if (hasBeenInView && triggerOnce) {
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isIntersecting = entry.isIntersecting

        if (isIntersecting) {
          setInView(true)
          setHasBeenInView(true)
        } else if (!triggerOnce) {
          // Only set to false if we want to re-trigger
          setInView(false)
        }
      },
      {
        threshold,
        rootMargin,
      }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [threshold, triggerOnce, rootMargin, hasBeenInView])

  return { ref, inView, hasBeenInView }
}
