export const metadata = { title: "About" };

import { db } from "@/lib/db";
import { about } from "@/lib/db/schema";
import { AboutForm } from "./AboutForm";
import { requireUser } from "@/lib/auth/get-user";

export default async function AdminAboutPage() {
  await requireUser();
  const data = await db.select().from(about).limit(1);
  return <AboutForm initialData={data[0] ?? null} />;
}
