export const metadata = { title: "Media" };

import { requireUser } from "@/lib/auth/get-user";
import { MediaManager } from "./MediaManager";

export default async function MediaPage() {
  await requireUser();
  return <MediaManager />;
}
