import { getUser } from "@/lib/auth/get-user";
import { redirect } from "next/navigation";
import { AdminHeader } from "@/components/admin/AdminHeader";

export default async function AdminDashboard() {
  const user = await getUser();
  if (!user) redirect("/admin/login");

  return (
    <div className="space-y-6">
      <AdminHeader 
        title="Dashboard" 
        description="Manage your portfolio content from here." 
      />
      
      <div className="px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="glass-card p-6 rounded-3xl border-white/5 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#2b7fff] to-transparent opacity-20" />
          <h3 className="text-xl font-bold text-[#F8FAFC] mb-2">Welcome, {user.username}!</h3>
          <p className="text-[#94A3B8]">You can manage all your portfolio content from here.</p>
        </div>
      </div>
    </div>
  );
}
