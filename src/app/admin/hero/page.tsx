import { db } from "@/lib/db";
import { hero } from "@/lib/db/schema";
import { HeroForm } from "./HeroForm";
import { AdminHeader } from "@/components/admin/AdminHeader";

export default async function AdminHeroPage() {
  const data = await db.select().from(hero).limit(1);
  const initialData = data[0] || null;

  return (
    <div className="space-y-6">
      <AdminHeader 
        title="Hero" 
        description="Manage your hero section content and introduction." 
      />
      <div className="px-8">
        <HeroForm initialData={initialData} />
      </div>
    </div>
  );
}
