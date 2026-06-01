import { db } from "@/lib/db";
import { ContactForm } from "./ContactForm";
import { AdminHeader } from "@/components/admin/AdminHeader";

export default async function ContactPage() {
  const contactData = await db.query.contact.findFirst();

  return (
    <div className="space-y-6">
      <AdminHeader 
        title="Contact" 
        description="Manage your contact details and location information." 
      />
      <div className="px-8">
        <ContactForm initialData={contactData || null} />
      </div>
    </div>
  );
}
