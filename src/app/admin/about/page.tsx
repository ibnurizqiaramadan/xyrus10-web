import { db } from "@/lib/db";
import { about } from "@/lib/db/schema";
import { AboutForm } from "./AboutForm";

export default async function AdminAboutPage() {
  const data = await db.select().from(about).limit(1);
  const initialData = data[0] || null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#F8FAFC]">About</h1>
        <p className="text-[#94A3B8]">Update your bio, expertise, and personal information.</p>
      </div>
      <AboutForm initialData={initialData} />
    </div>
  );
}
