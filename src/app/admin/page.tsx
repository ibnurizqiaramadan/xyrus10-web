import { getUser } from "@/lib/auth/get-user";
import { redirect } from "next/navigation";

export default async function AdminDashboard() {
  const user = await getUser();
  if (!user) redirect("/admin/login");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold text-[#F8FAFC]">Dashboard</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="glass-card p-6 rounded-3xl border-white/5">
          <h3 className="text-xl font-bold text-[#F8FAFC] mb-2">Welcome, {user.username}!</h3>
          <p className="text-[#94A3B8]">You can manage all your portfolio content from here.</p>
        </div>
      </div>
    </div>
  );
}
