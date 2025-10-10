"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { motion, useReducedMotion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Send } from "lucide-react"
import { useState } from "react"

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

type ContactFormData = z.infer<typeof contactSchema>

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    console.log(data)
    setIsSubmitting(false)
    setIsSubmitted(true)
    reset()
    setTimeout(() => setIsSubmitted(false), 3000)
  }

  return (
    <motion.form
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.5 }}
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      <div className="space-y-2">
        <Label htmlFor="name" className="text-[#F8FAFC]">
          Name
        </Label>
        <Input
          id="name"
          {...register("name")}
          className="glass-card border-white/10 bg-white/5 text-[#F8FAFC] focus:border-[#4F46E5] focus:ring-[#4F46E5]"
          placeholder="John Doe"
        />
        {errors.name && (
          <p className="text-sm text-red-400">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="text-[#F8FAFC]">
          Email
        </Label>
        <Input
          id="email"
          type="email"
          {...register("email")}
          className="glass-card border-white/10 bg-white/5 text-[#F8FAFC] focus:border-[#4F46E5] focus:ring-[#4F46E5]"
          placeholder="john@example.com"
        />
        {errors.email && (
          <p className="text-sm text-red-400">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="message" className="text-[#F8FAFC]">
          Message
        </Label>
        <Textarea
          id="message"
          {...register("message")}
          className="glass-card border-white/10 bg-white/5 text-[#F8FAFC] focus:border-[#4F46E5] focus:ring-[#4F46E5] min-h-[150px]"
          placeholder="Your message here..."
        />
        {errors.message && (
          <p className="text-sm text-red-400">{errors.message.message}</p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isSubmitting || isSubmitted}
        className="w-full bg-gradient-to-r from-[#4F46E5] to-[#22D3EE] hover:opacity-90 transition-all duration-300 glow-primary"
      >
        {isSubmitting ? (
          "Sending..."
        ) : isSubmitted ? (
          "Sent!"
        ) : (
          <>
            <Send className="mr-2 h-4 w-4" />
            Send Message
          </>
        )}
      </Button>
    </motion.form>
  )
}
