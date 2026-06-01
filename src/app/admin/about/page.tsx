import { db } from "@/lib/db";
import { about } from "@/lib/db/schema";
import { AboutForm } from "./AboutForm";
import { AdminHeader } from "@/components/admin/AdminHeader";

export default async function AdminAboutPage() {
  const data = await db.select().from(about).limit(1);
  const initialData = data[0] || null;

  return (
    <div className="space-y-6">
      <AdminHeader 
        title="About" 
        description="Update your bio, expertise, and personal information." 
      />
      <div className="px-8">
        <AboutForm initialData={initialData} />
      </div>
    </div>
  );
}
