"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react"

import { Separator } from "@/components/ui/separator"
import { SITE_CONFIG } from "@/lib/constants/site-config"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-neutral-900 text-neutral-300">
      <Separator className="bg-gradient-to-r from-primary via-secondary to-primary h-1" />

      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Column 1: School Info */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4 group">
              <div className="relative h-10 w-10 md:h-12 md:w-12">
                <Image
                  src="/images/LGS-logo.avif"
                  alt="Little Gems School Logo"
                  fill
                  sizes="(max-width: 768px) 40px, 48px"
                  className="object-contain transition-transform group-hover:scale-110"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-heading text-xl font-bold text-white leading-tight">
                  Little Gems
                </span>
                <span className="font-heading text-xs text-neutral-400">
                  School
                </span>
              </div>
            </Link>
            <p className="text-sm text-neutral-400 mb-4">
              {SITE_CONFIG.description}
            </p>
            <div className="flex gap-3">
              <motion.div
                whileHover={{ y: -3, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <Link
                  href={SITE_CONFIG.links.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors inline-block"
                  aria-label="Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ y: -3, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <Link
                  href={SITE_CONFIG.links.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors inline-block"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ y: -3, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <Link
                  href={SITE_CONFIG.links.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors inline-block"
                  aria-label="Twitter"
                >
                  <Twitter className="h-5 w-5" />
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ y: -3, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <Link
                  href={SITE_CONFIG.links.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors inline-block"
                  aria-label="YouTube"
                >
                  <Youtube className="h-5 w-5" />
                </Link>
              </motion.div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-heading font-semibold text-white mb-4 border-l-4 border-primary pl-3">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {SITE_CONFIG.footerLinks.quickLinks.map((link) => (
                <li key={link.href}>
                  <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                    <Link
                      href={link.href}
                      className="text-sm hover:text-primary transition-colors flex items-center gap-2"
                    >
                      <span className="text-primary">›</span>
                      {link.title}
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Programs */}
          <div>
            <h3 className="font-heading font-semibold text-white mb-4 border-l-4 border-primary pl-3">
              Programs
            </h3>
            <ul className="space-y-2">
              {SITE_CONFIG.footerLinks.programs.map((link) => (
                <li key={link.href}>
                  <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                    <Link
                      href={link.href}
                      className="text-sm hover:text-primary transition-colors flex items-center gap-2"
                    >
                      <span className="text-primary">›</span>
                      {link.title}
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h3 className="font-heading font-semibold text-white mb-4 border-l-4 border-primary pl-3">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-1 flex-shrink-0 text-primary" />
                <span className="text-sm">{SITE_CONFIG.contact.address}</span>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="h-4 w-4 mt-1 flex-shrink-0 text-primary" />
                <a
                  href={`tel:${SITE_CONFIG.contact.phone.replace(/\s/g, "")}`}
                  className="text-sm hover:text-primary transition-colors"
                >
                  {SITE_CONFIG.contact.phone}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="h-4 w-4 mt-1 flex-shrink-0 text-primary" />
                <a
                  href={`mailto:${SITE_CONFIG.contact.email}`}
                  className="text-sm hover:text-primary transition-colors"
                >
                  {SITE_CONFIG.contact.email}
                </a>
              </li>
            </ul>
            <p className="text-xs text-neutral-500 mt-4">
              {SITE_CONFIG.contact.workingHours}
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <Separator className="bg-neutral-800 my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-neutral-500 text-center md:text-left">
            © {currentYear} {SITE_CONFIG.name}. All rights reserved.
          </p>
          <div className="flex gap-4 text-sm text-neutral-500">
            {SITE_CONFIG.footerLinks.legal.map((link, index) => (
              <span key={link.href}>
                <Link
                  href={link.href}
                  className="hover:text-primary transition-colors"
                >
                  {link.title}
                </Link>
                {index < SITE_CONFIG.footerLinks.legal.length - 1 && (
                  <span className="ml-4">|</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
