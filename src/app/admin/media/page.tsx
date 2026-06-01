import { getUser } from "@/lib/auth/get-user";
import { redirect } from "next/navigation";
import { MediaManager } from "./MediaManager";

export default async function MediaPage() {
  const user = await getUser();
  if (!user) redirect("/admin/login");

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="px-12 pt-10 pb-4">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-3xl font-bold text-[#F8FAFC] tracking-tight">Media Library</h1>
            <p className="text-sm text-slate-500 mt-1">Upload and manage images</p>
          </div>
        </div>
      </div>
      <MediaManager />
    </div>
  );
}
