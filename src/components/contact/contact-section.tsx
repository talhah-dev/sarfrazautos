"use client";

import { useState } from "react";
import { FiArrowRight, FiMail, FiPhone } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

export function ContactSection({ className }: { className?: string }) {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <section className={cn("w-full bg-white text-neutral-900 py-16 md:py-24", className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-neutral-950 leading-tight">
            Have questions or need parts? {" "} <span className="text-red-600">
              Let&apos;s talk it through
            </span>
          </h1>
          <p className="text-neutral-500 text-sm sm:text-base mt-4 leading-relaxed">
            Fill out the form with a bit of context and our team will get back to you within a day.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          <div className="lg:col-span-6 flex flex-col justify-between">
            <form onSubmit={handleSubmit} className="flex flex-col justify-between h-full space-y-5">
              <div className="space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium text-neutral-900">
                      Name
                    </Label>
                    <Input
                      id="name"
                      required
                      placeholder="Your name"
                      className="h-11 rounded-lg border-neutral-300 bg-white px-3.5 text-sm placeholder:text-neutral-400 focus-visible:border-red-600 focus-visible:ring-red-600/20"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium text-neutral-900">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      placeholder="you@example.com"
                      className="h-11 rounded-lg border-neutral-300 bg-white px-3.5 text-sm placeholder:text-neutral-400 focus-visible:border-red-600 focus-visible:ring-red-600/20"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-medium text-neutral-900">
                      Phone
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+92 (300) 000-0000"
                      className="h-11 rounded-lg border-neutral-300 bg-white px-3.5 text-sm placeholder:text-neutral-400 focus-visible:border-red-600 focus-visible:ring-red-600/20"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="shopName" className="text-sm font-medium text-neutral-900">
                      Shop name <span className="text-neutral-400 text-xs font-normal">(Optional)</span>
                    </Label>
                    <Input
                      id="shopName"
                      placeholder="Your shop name"
                      className="h-11 rounded-lg border-neutral-300 bg-white px-3.5 text-sm placeholder:text-neutral-400 focus-visible:border-red-600 focus-visible:ring-red-600/20"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-sm font-medium text-neutral-900">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    required
                    rows={5}
                    placeholder="Tell us about your requirements or parts inquiry..."
                    className="min-h-[220px] resize-none rounded-lg border-neutral-300 bg-white p-3.5 text-sm placeholder:text-neutral-400 focus-visible:border-red-600 focus-visible:ring-red-600/20"
                  />
                </div>
              </div>

              <div>
                <Button
                  type="submit"
                  className="w-full h-11 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg text-sm flex items-center justify-center gap-2 cursor-pointer shadow-none transition-colors"
                >
                  <span>{isSubmitted ? "Message Sent!" : "Send message"}</span>
                  <FiArrowRight className="size-4" />
                </Button>
                {isSubmitted && (
                  <p className="text-xs text-green-600 text-center mt-2 font-medium">
                    Thank you! Your message has been sent successfully.
                  </p>
                )}
              </div>
            </form>
          </div>

          <div className="lg:col-span-6">
            <div className="relative w-full h-[400px] sm:h-[450px] lg:h-full md:min-h-[520px] rounded-tr-4xl rounded-bl-4xl rounded-br-lg rounded-tl-lg overflow-hidden bg-neutral-100 flex flex-col justify-end shadow-xs border border-neutral-200/60">
              <img
                src="/contact-manager.jpg"
                alt="Sarfraz Autos Parts Specialist"
                className="absolute inset-0 w-full h-full object-cover object-top"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

              <div className="relative z-10 m-4 rounded-2xl bg-white p-4 border border-neutral-100 shadow-sm">
                <div className="grid md:grid-cols-2 grid-cols-1 gap-4 sm:gap-8">
                  <div>
                    <div className="flex items-center gap-2 text-neutral-500">
                      <FiPhone className="size-4 shrink-0" />
                      <span className="text-xs font-semibold tracking-wider uppercase">
                        Phone
                      </span>
                    </div>
                    <a
                      href="tel:+923001234567"
                      className="mt-1.5 block text-sm font-semibold text-neutral-950 hover:text-red-600 transition-colors truncate"
                    >
                      +92 300 1234567
                    </a>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 text-neutral-500">
                      <FiMail className="size-4 shrink-0" />
                      <span className="text-xs font-semibold tracking-wider uppercase">
                        Email
                      </span>
                    </div>
                    <a
                      href="mailto:info@sarfrazautos.com"
                      className="mt-1.5 block text-sm font-semibold text-neutral-950 hover:text-red-600 transition-colors truncate"
                    >
                      info@sarfrazautos.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
