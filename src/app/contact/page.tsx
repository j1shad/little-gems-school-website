"use client"

import { SITE_CONFIG } from "@/lib/constants/site-config"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

import { PageShell } from "@/components/layout/page-shell"

export default function ContactPage() {
  return (
    <PageShell className="container mx-auto px-4 py-24 md:py-32">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
          Contact Us
        </h1>
        <p className="text-xl text-neutral-600">
          Have questions? We'd love to hear from you. Reach out to our admissions team or visit our campus.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">
        {/* Contact Info */}
        <div className="space-y-8">
          <div className="bg-neutral-50 p-8 rounded-3xl border border-neutral-100">
            <h3 className="font-heading text-2xl font-bold text-neutral-900 mb-6">
              Get in Touch
            </h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full text-primary">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-neutral-900">Address</h4>
                  <p className="text-neutral-600">{SITE_CONFIG.contact.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full text-primary">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-neutral-900">Phone</h4>
                  <p className="text-neutral-600">{SITE_CONFIG.contact.phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full text-primary">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-neutral-900">Email</h4>
                  <p className="text-neutral-600">{SITE_CONFIG.contact.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full text-primary">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-neutral-900">Working Hours</h4>
                  <p className="text-neutral-600">{SITE_CONFIG.contact.workingHours}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div>
          <h3 className="font-heading text-2xl font-bold text-neutral-900 mb-6">
            Send us a Message
          </h3>
          <form className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-neutral-700">Name</label>
                <Input id="name" placeholder="Your full name" />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-neutral-700">Email</label>
                <Input id="email" type="email" placeholder="john@example.com" />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="subject" className="text-sm font-medium text-neutral-700">Subject</label>
              <Input id="subject" placeholder="Inquiry about admissions..." />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium text-neutral-700">Message</label>
              <Textarea id="message" placeholder="How can we help you?" className="min-h-[150px]" />
            </div>

            <Button size="lg" className="w-full sm:w-auto">
              Send Message
            </Button>
          </form>
        </div>
      </div>

      {/* Map Section */}
      <div className="mt-24 rounded-3xl overflow-hidden shadow-xl border border-neutral-200 h-[450px] w-full">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3971.1561210874684!2d-0.2613112251764292!3d5.543855594436485!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf97745d0b96dd%3A0x951184875c1577f6!2sLittle%20Gems%20School!5e0!3m2!1sen!2sgh!4v1768911923260!5m2!1sen!2sgh"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-full"
        />
      </div>
    </PageShell>
  )
}
