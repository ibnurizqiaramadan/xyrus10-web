export const metadata = { title: "Contact" };

import { db } from "@/lib/db";
import { ContactForm } from "./ContactForm";
import { requireUser } from "@/lib/auth/get-user";

export default async function ContactPage() {
  await requireUser();
  const contactData = await db.query.contact.findFirst();
  return <ContactForm initialData={contactData ?? null} />;
}
