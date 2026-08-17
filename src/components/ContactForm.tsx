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

// ponytail: mailto: hands the message to the visitor's own mail client — no messages table,
// no mail provider, no API route. Upgrade path: POST to a server action + Resend if you ever
// need delivery receipts or messages from visitors with no configured mail client.
export function ContactForm({ email }: { email: string }) {
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
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = (data: ContactFormData) => {
    const subject = encodeURIComponent(
      language === "id" ? `Pesan dari ${data.name}` : `Message from ${data.name}`
    )
    const body = encodeURIComponent(`${data.message}\n\n—\n${data.name} <${data.email}>`)
    // escape everything but "@" — a CMS email must not be able to inject "&bcc=", but a
    // percent-encoded "@" in the addr-spec trips up some desktop mail clients
    const to = encodeURIComponent(email).replace(/%40/g, "@")
    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`
    setIsSubmitted(true)
    // deliberately no reset(): setting a mailto: href does not navigate away, so if the
    // visitor cancels the "Open Mail?" dialog (or has no handler) their text is still there
    setTimeout(() => setIsSubmitted(false), 8000)
  }

  return (
    <motion.form
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.5 }}
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="space-y-6"
    >
      <div className="space-y-2">
        <Label htmlFor="name" className="text-[#F8FAFC]">
          {language === "id" ? "Nama" : "Name"}
        </Label>
        <Input
          id="name"
          autoComplete="name"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "name-error" : undefined}
          {...register("name")}
          className="glass-card border-white/10 bg-white/5 text-[#F8FAFC] focus:border-[#2b7fff] focus:ring-[#2b7fff]"
          placeholder="John Doe"
        />
        {errors.name && (
          <p id="name-error" role="alert" className="text-sm text-red-400">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="text-[#F8FAFC]">
          Email
        </Label>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
          {...register("email")}
          className="glass-card border-white/10 bg-white/5 text-[#F8FAFC] focus:border-[#2b7fff] focus:ring-[#2b7fff]"
          placeholder="john@example.com"
        />
        {errors.email && (
          <p id="email-error" role="alert" className="text-sm text-red-400">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="message" className="text-[#F8FAFC]">
          {language === "id" ? "Pesan" : "Message"}
        </Label>
        <Textarea
          id="message"
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          {...register("message")}
          className="glass-card border-white/10 bg-white/5 text-[#F8FAFC] focus:border-[#2b7fff] focus:ring-[#2b7fff] min-h-[150px]"
          placeholder={language === "id" ? "Tulis pesan Anda di sini..." : "Your message here..."}
        />
        {errors.message && (
          <p id="message-error" role="alert" className="text-sm text-red-400">{errors.message.message}</p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isSubmitted}
        className="w-full bg-gradient-to-r from-[#2b7fff] to-[#60A5FA] hover:opacity-90 transition-all duration-300 glow-primary"
      >
        {isSubmitted ? (
          language === "id" ? "Membuka aplikasi email..." : "Opening your mail app..."
        ) : (
          <>
            <Send className="mr-2 h-4 w-4" />
            {language === "id" ? "Kirim Pesan" : "Send Message"}
          </>
        )}
      </Button>

      {/* always mounted: a live region inserted together with its text is not announced */}
      <p role="status" className="text-sm text-[#94A3B8] min-h-[2.5rem]">
        {isSubmitted && (language === "id"
          ? `Aplikasi email Anda sedang dibuka dengan pesan ini. Tekan kirim di sana untuk menyelesaikannya. Tidak terbuka? Kirim langsung ke ${email}.`
          : `Your mail app is opening with this message. Press send there to finish. Nothing opened? Email ${email} directly.`)}
      </p>
    </motion.form>
  )
}
