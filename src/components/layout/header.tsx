"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils/cn"
import { SITE_CONFIG } from "@/lib/constants/site-config"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/80 backdrop-blur-lg shadow-md border-t-2 border-primary/30"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative h-10 w-10 md:h-12 md:w-12"
            >
              <Image
                src="/images/LGS-logo.avif"
                alt="Little Gems School Logo"
                fill
                sizes="(max-width: 768px) 40px, 48px"
                className="object-contain transition-transform group-hover:scale-110"
                priority
              />
            </motion.div>
            <div className="flex flex-col">
              <span className="font-heading text-lg md:text-xl font-bold text-neutral-900 leading-tight">
                Little Gems
              </span>
              <span className="font-heading text-xs text-neutral-600">
                School
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            <NavigationMenu>
              <NavigationMenuList className="flex gap-2">
                {SITE_CONFIG.navigation.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                  >
                    <NavigationMenuItem>
                    {item.items ? (
                      <>
                        <NavigationMenuTrigger className="text-neutral-700 hover:text-primary font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all hover:after:w-full">
                          {item.title}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <ul className="grid w-[200px] gap-1 p-2">
                            {item.items.map((subItem) => (
                              <li key={subItem.href}>
                                <NavigationMenuLink asChild>
                                  <Link
                                    href={subItem.href}
                                    className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                  >
                                    <div className="text-sm font-medium">
                                      {subItem.title}
                                    </div>
                                  </Link>
                                </NavigationMenuLink>
                              </li>
                            ))}
                          </ul>
                        </NavigationMenuContent>
                      </>
                    ) : (
                      <Link
                        href={item.href || "#"}
                        className="text-neutral-700 hover:text-primary font-medium transition-colors px-4 py-2 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all hover:after:w-full"
                      >
                        {item.title}
                      </Link>
                    )}
                  </NavigationMenuItem>
                  </motion.div>
                ))}
              </NavigationMenuList>
            </NavigationMenu>

            {/* CTA Button */}
            <motion.div
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Button asChild size="lg" className="ml-4">
                <Link href="/apply">Apply Now</Link>
              </Button>
            </motion.div>
          </nav>

          {/* Mobile Menu Button */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle className="text-left font-heading text-2xl">
                  Menu
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-4 mt-8">
                {SITE_CONFIG.navigation.map((item) => (
                  <div key={item.title} className="border-b-2 border-primary/20 pb-4">
                    {item.items ? (
                      <div>
                        <h3 className="font-heading font-semibold text-lg text-neutral-900 mb-3">
                          {item.title}
                        </h3>
                        <ul className="space-y-2 pl-4">
                          {item.items.map((subItem) => (
                            <li key={subItem.href}>
                              <Link
                                href={subItem.href}
                                className="text-neutral-600 hover:text-primary transition-colors block py-1"
                                onClick={() => setIsMobileMenuOpen(false)}
                              >
                                {subItem.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <Link
                        href={item.href || "#"}
                        className="font-heading font-semibold text-lg text-neutral-900 hover:text-primary transition-colors block"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.title}
                      </Link>
                    )}
                  </div>
                ))}
                <Button asChild size="lg" className="w-full mt-4">
                  <Link
                    href="/apply"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Apply Now
                  </Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
