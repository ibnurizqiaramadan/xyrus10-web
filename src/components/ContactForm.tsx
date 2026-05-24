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
import { useLanguage } from "@/lib/LanguageContext"

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const shouldReduceMotion = useReducedMotion()
  const { language } = useLanguage()

  const contactSchema = z.object({
    name: z.string().min(2, language === "id" ? "Nama minimal harus 2 karakter" : "Name must be at least 2 characters"),
    email: z.string().email(language === "id" ? "Alamat email tidak valid" : "Invalid email address"),
    message: z.string().min(10, language === "id" ? "Pesan minimal harus 10 karakter" : "Message must be at least 10 characters"),
  })

  type ContactFormData = z.infer<typeof contactSchema>

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
          {language === "id" ? "Nama" : "Name"}
        </Label>
        <Input
          id="name"
          {...register("name")}
          className="glass-card border-white/10 bg-white/5 text-[#F8FAFC] focus:border-[#2b7fff] focus:ring-[#2b7fff]"
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
          className="glass-card border-white/10 bg-white/5 text-[#F8FAFC] focus:border-[#2b7fff] focus:ring-[#2b7fff]"
          placeholder="john@example.com"
        />
        {errors.email && (
          <p className="text-sm text-red-400">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="message" className="text-[#F8FAFC]">
          {language === "id" ? "Pesan" : "Message"}
        </Label>
        <Textarea
          id="message"
          {...register("message")}
          className="glass-card border-white/10 bg-white/5 text-[#F8FAFC] focus:border-[#2b7fff] focus:ring-[#2b7fff] min-h-[150px]"
          placeholder={language === "id" ? "Tulis pesan Anda di sini..." : "Your message here..."}
        />
        {errors.message && (
          <p className="text-sm text-red-400">{errors.message.message}</p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isSubmitting || isSubmitted}
        className="w-full bg-gradient-to-r from-[#2b7fff] to-[#60A5FA] hover:opacity-90 transition-all duration-300 glow-primary"
      >
        {isSubmitting ? (
          language === "id" ? "Mengirim..." : "Sending..."
        ) : isSubmitted ? (
          language === "id" ? "Terkirim!" : "Sent!"
        ) : (
          <>
            <Send className="mr-2 h-4 w-4" />
            {language === "id" ? "Kirim Pesan" : "Send Message"}
          </>
        )}
      </Button>
    </motion.form>
  )
}
