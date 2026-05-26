import { db } from "@/lib/db";
import { ContactForm } from "./ContactForm";

export default async function ContactPage() {
  const contactData = await db.query.contact.findFirst();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#F8FAFC]">Contact</h1>
        <p className="text-[#94A3B8]">Manage your contact details and location information.</p>
      </div>

      <ContactForm initialData={contactData || null} />
    </div>
  );
}
