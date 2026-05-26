import { getUser } from "@/lib/auth/get-user";
import { Sidebar } from "./Sidebar";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await getUser();
  
  // Check if we are on login page
  // Actually, in App Router we can just check user here unless it's the login page
  // But layout wraps everything. I'll handle login redirection in the page level or here.

  return (
    <div className="min-h-screen bg-[#0F172A] flex">
      <Sidebar user={user} />
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
