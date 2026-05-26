import { db } from "@/lib/db";
import { hero } from "@/lib/db/schema";
import { HeroForm } from "./HeroForm";

export default async function AdminHeroPage() {
  const data = await db.select().from(hero).limit(1);
  const initialData = data[0] || null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#F8FAFC]">Hero</h1>
        <p className="text-[#94A3B8]">Manage your hero section content and introduction.</p>
      </div>
      <HeroForm initialData={initialData} />
    </div>
  );
}
