import { getUser } from "@/lib/auth/get-user";
import { Sidebar } from "./Sidebar";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await getUser();
  
  return (
    <div className="h-screen bg-[#050505] text-slate-200 flex overflow-hidden">
      {/* Fixed Sidebar */}
      <div className="flex-shrink-0">
        <Sidebar user={user} />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="pb-12">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
