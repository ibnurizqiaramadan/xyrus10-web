import { getUser } from "@/lib/auth/get-user";
import { redirect } from "next/navigation";
import { LoginForm } from "./LoginForm";

export default async function LoginPage() {
  const user = await getUser();
  if (user) redirect("/admin");

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0D0F1A]">
      <div className="glass-card p-10 rounded-[2.5rem] border-white/5 w-full max-w-md">
        <h1 className="text-3xl font-bold text-[#F8FAFC] mb-8 text-center">Admin Login</h1>
        <LoginForm />
      </div>
    </div>
  );
}
